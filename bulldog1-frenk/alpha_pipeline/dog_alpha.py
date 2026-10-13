#!/usr/bin/env python3
"""
dog_alpha.py — Kling MP4 (opaque studio background) -> VP9 WebM with real alpha.

Pipeline (per video):
  1. extract   ffmpeg -> lossless PNG frames, original geometry and FPS kept
  2. masks     BiRefNet-general-lite (ONNX, CPU) at 1024x1024 -> soft mask per frame (cached as .npy)
  3. stabilise masks of neighbouring frames are warped with Farneback optical flow and mixed in,
               weighted by photometric agreement (fast real motion gets weight ~0 and is not smeared)
  4. matte     trimap from the stabilised mask -> closed-form matting (PyMatting) on the dog's crop
  5. colour    foreground colour estimation (PyMatting ML) on the semi-transparent edge only;
               fully opaque pixels keep the original RGB byte-for-byte
  6. encode    libvpx-vp9, yuva420p, alpha_mode=1 (what Chromium needs for transparency)

Every stage caches its result in <work>/ and can be resumed; nothing in the source video is ever modified.
"""
import argparse, json, os, subprocess, sys, time
import numpy as np
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_MODEL = os.path.join(HERE, "models", "BiRefNet-general-bb_swin_v1_tiny-epoch_232.onnx")


def sh(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError("command failed: %s\n%s" % (" ".join(cmd), r.stderr[-2000:]))
    return r.stdout


def probe(mp4):
    out = sh(["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_frames",
              "-show_entries", "stream=width,height,r_frame_rate,nb_read_frames", "-of", "json", mp4])
    s = json.loads(out)["streams"][0]
    num, den = s["r_frame_rate"].split("/")
    return dict(width=int(s["width"]), height=int(s["height"]), fps=float(num) / float(den),
                fps_str=s["r_frame_rate"], frames=int(s["nb_read_frames"]))


def p(work, *a):
    """p(work,'frames') -> <work>/frames (created); p(work,'prob','m0001.npy') -> <work>/prob/m0001.npy (dir created)."""
    if len(a) == 1:
        d = os.path.join(work, a[0]); os.makedirs(d, exist_ok=True); return d
    d = os.path.join(work, *a[:-1]); os.makedirs(d, exist_ok=True)
    return os.path.join(d, a[-1])


# ---------------------------------------------------------------- stage 1
def extract(mp4, work, start, end):
    fr = p(work, "frames")
    have = [n for n in range(start, end + 1) if os.path.exists(os.path.join(fr, "f%04d.png" % n))]
    if len(have) == end - start + 1:
        return
    sel = "select=between(n\\,%d\\,%d)" % (start, end)
    sh(["ffmpeg", "-v", "error", "-y", "-i", mp4, "-vf", sel, "-vsync", "0", "-start_number", str(start),
        os.path.join(fr, "f%04d.png")])


# ---------------------------------------------------------------- stage 2
_MEAN = np.array([0.485, 0.456, 0.406], np.float32)
_STD = np.array([0.229, 0.224, 0.225], np.float32)


def load_session(model, threads):
    import onnxruntime as ort
    so = ort.SessionOptions()
    so.intra_op_num_threads = threads
    so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
    return ort.InferenceSession(model, so, providers=["CPUExecutionProvider"])


def infer_mask(sess, bgr):
    h, w = bgr.shape[:2]
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    x = cv2.resize(rgb, (1024, 1024), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
    x = ((x - _MEAN) / _STD).transpose(2, 0, 1)[None].astype(np.float32)
    y = sess.run(None, {sess.get_inputs()[0].name: x})[0][0, 0]
    y = 1.0 / (1.0 + np.exp(-y))
    return cv2.resize(y, (w, h), interpolation=cv2.INTER_CUBIC).clip(0, 1).astype(np.float32)


def masks(work, start, end, model, threads):
    fr = p(work, "frames")
    todo = [n for n in range(start, end + 1) if not os.path.exists(p(work, "prob", "m%04d.npy" % n))]
    if not todo:
        return
    sess = load_session(model, threads)
    t0 = time.time()
    for i, n in enumerate(todo):
        img = cv2.imread(os.path.join(fr, "f%04d.png" % n))
        np.save(p(work, "prob", "m%04d.npy" % n), infer_mask(sess, img).astype(np.float16))
        print("  mask %d/%d  frame %d  %.1fs/frame" % (i + 1, len(todo), n, (time.time() - t0) / (i + 1)), flush=True)


# ---------------------------------------------------------------- stage 3
def _warp(src, flow):
    h, w = flow.shape[:2]
    gx, gy = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(src, gx + flow[..., 0], gy + flow[..., 1], cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)


def keep_main_components(m, min_area, exclude_rect):
    """Drop tiny islands (watermark, specks). exclude_rect=(x0,y0,x1,y1) is zeroed first (Kling logo)."""
    m = m.copy()
    if exclude_rect:
        x0, y0, x1, y1 = exclude_rect
        m[y0:y1, x0:x1] = 0
    b = (m > 0.5).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(b, connectivity=8)
    if n <= 1:
        return m
    keep = np.zeros(n, bool)
    big = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    for i in range(1, n):
        if i == big or stats[i, cv2.CC_STAT_AREA] >= min_area:
            keep[i] = True
    # remove soft halo around dropped islands as well
    drop = (~keep[lab]) & (lab > 0)
    drop = cv2.dilate(drop.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
    m[drop & (m < 0.999)] = 0
    return m


def stabilise(work, start, end, strength, tau, min_area, exclude_rect):
    fr = p(work, "frames")
    ns = list(range(start, end + 1))
    gray = {n: cv2.cvtColor(cv2.imread(os.path.join(fr, "f%04d.png" % n)), cv2.COLOR_BGR2GRAY) for n in ns}
    prob = {n: np.load(p(work, "prob", "m%04d.npy" % n)).astype(np.float32) for n in ns}
    for n in ns:
        acc = prob[n].copy(); wsum = 1.0
        for s in (n - 1, n + 1):
            if s < start or s > end or strength <= 0:
                continue
            flow = cv2.calcOpticalFlowFarneback(gray[n], gray[s], None, 0.5, 4, 25, 3, 7, 1.5, 0)
            wp = _warp(prob[s], flow)
            wg = _warp(gray[s].astype(np.float32), flow)
            err = cv2.GaussianBlur(np.abs(wg - gray[n].astype(np.float32)), (0, 0), 3)
            wgt = np.exp(-(err / tau) ** 2) * 0.5 * strength
            acc += wgt * wp; wsum = wsum + wgt
        m = (acc / wsum).astype(np.float32)
        m = keep_main_components(m, min_area, exclude_rect)
        np.save(p(work, "stab", "s%04d.npy" % n), m.astype(np.float16))


# ---------------------------------------------------------------- stage 4+5
def trimap_from(m, r_in, r_out):
    b = (m > 0.5).astype(np.uint8)
    ki = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r_in + 1, 2 * r_in + 1))
    ko = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r_out + 1, 2 * r_out + 1))
    fg = cv2.erode(b, ki) > 0
    bg = cv2.dilate(b, ko) == 0
    tri = np.full(m.shape, 0.5, np.float64)
    tri[fg] = 1.0; tri[bg] = 0.0
    return tri


def floor_shadow_cleanup(alpha, h_open=21, band=45, min_area=150, ratio=3.0):
    """Optional (--floor-shadow): remove a *thin horizontal ribbon* of contact shadow that the mask/matting kept
    between the paws. Geometry only, no colour test (fur colour never influences the decision):
    a pixel is a candidate if it does not belong to any 3 x h_open vertical rectangle inside the mask (legs, paws and
    toes are taller than that, a flat ribbon is not), lies within `band` px of the lowest mask point, and the candidate
    region is a wide, flat component (area >= min_area, width >= ratio * height).
    Returns (alpha, number_of_removed_pixels)."""
    b = (alpha > 0.5).astype(np.uint8)
    if b.sum() == 0:
        return alpha, 0
    y_floor = int(np.nonzero(b.any(axis=1))[0].max())
    opened = cv2.morphologyEx(b, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (3, h_open)))
    thin = (b == 1) & (opened == 0)
    thin[: max(y_floor - band, 0)] = False
    n, lab, st, _ = cv2.connectedComponentsWithStats(thin.astype(np.uint8), connectivity=8)
    rm = np.zeros(b.shape, bool)
    for i in range(1, n):
        x, y, w, hh, a = st[i, :5]
        if a >= min_area and w >= ratio * hh:
            rm |= lab == i
    if not rm.any():
        return alpha, 0
    grow = cv2.dilate(rm.astype(np.uint8), np.ones((5, 5), np.uint8)) > 0
    soft = cv2.GaussianBlur(grow.astype(np.float32), (0, 0), 1.0)
    out = alpha * (1.0 - np.where(grow, 1.0, soft))   # whole grown region -> transparent, soft edge outside it
    return out.astype(np.float32), int(rm.sum())


def matte_one(img_bgr, m, r_in, r_out, margin, ss=2, fs=None):
    from pymatting import estimate_alpha_cf, estimate_foreground_ml
    h, w = m.shape
    tri = trimap_from(m, r_in, r_out)
    ys, xs = np.nonzero(tri > 0)
    if len(ys) == 0:
        return np.zeros((h, w), np.float32), img_bgr[..., ::-1].astype(np.float32) / 255
    y0, y1 = max(ys.min() - margin, 0), min(ys.max() + margin + 1, h)
    x0, x1 = max(xs.min() - margin, 0), min(xs.max() + margin + 1, w)
    rgb = img_bgr[y0:y1, x0:x1, ::-1].astype(np.float64) / 255.0
    t = tri[y0:y1, x0:x1]
    # super-sampled matting: solving on an ss-times larger crop and area-downscaling the alpha removes the
    # stair-stepping of the compressed (H.264) source edge; ss=2 matched the approved Dog1 alpha best.
    if ss > 1:
        rgb_s = cv2.resize(rgb, None, fx=ss, fy=ss, interpolation=cv2.INTER_CUBIC).clip(0, 1)
        t_s = cv2.resize(t, None, fx=ss, fy=ss, interpolation=cv2.INTER_NEAREST)
        a = np.clip(estimate_alpha_cf(rgb_s, t_s), 0, 1)
        a[t_s == 1.0] = 1.0; a[t_s == 0.0] = 0.0
        a = cv2.resize(a, (x1 - x0, y1 - y0), interpolation=cv2.INTER_AREA)
    else:
        a = np.clip(estimate_alpha_cf(rgb, t), 0, 1)
    a[t == 1.0] = 1.0; a[t == 0.0] = 0.0
    fg = estimate_foreground_ml(rgb, a)
    alpha = np.zeros((h, w), np.float32); alpha[y0:y1, x0:x1] = a
    if fs:
        alpha, removed = floor_shadow_cleanup(alpha, **fs)
        if removed:
            print("    floor-shadow: removed %d px" % removed, flush=True)
        a = alpha[y0:y1, x0:x1].astype(np.float64)
        fg = estimate_foreground_ml(rgb, a)
    col = np.repeat(np.repeat(img_bgr[..., ::-1].astype(np.float32) / 255.0, 1, 0), 1, 1)  # original RGB
    # extend crop colours outwards (replicate) so alpha=0 pixels have plausible neighbours for chroma subsampling
    ext = np.pad(fg, ((y0, h - y1), (x0, w - x1), (0, 0)), mode="edge").astype(np.float32)
    # opaque pixels: original bytes; edge / transparent: colour-decontaminated estimate
    out = np.where((alpha >= 0.995)[..., None], col, ext)
    return alpha, out


def matte(work, start, end, r_in, r_out, margin, ss=2, fs=None):
    fr = p(work, "frames")
    for n in range(start, end + 1):
        out = p(work, "rgba", "r%04d.png" % n)
        if os.path.exists(out):
            continue
        t0 = time.time()
        img = cv2.imread(os.path.join(fr, "f%04d.png" % n))
        m = np.load(p(work, "stab", "s%04d.npy" % n)).astype(np.float32)
        alpha, rgb = matte_one(img, m, r_in, r_out, margin, ss, fs)
        rgba = np.dstack([np.clip(rgb * 255 + 0.5, 0, 255).astype(np.uint8),
                          np.clip(alpha * 255 + 0.5, 0, 255).astype(np.uint8)])
        cv2.imwrite(out, cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
        print("  matte frame %d  %.1fs" % (n, time.time() - t0), flush=True)


# ---------------------------------------------------------------- stage 6
def encode(work, start, end, fps_str, out_webm, crf):
    seq = p(work, "enc")
    for i, n in enumerate(range(start, end + 1)):
        dst = os.path.join(seq, "e%04d.png" % i)
        src = p(work, "rgba", "r%04d.png" % n)
        if os.path.lexists(dst):
            os.remove(dst)
        os.symlink(os.path.abspath(src), dst)
    sh(["ffmpeg", "-v", "error", "-y", "-framerate", fps_str, "-i", os.path.join(seq, "e%04d.png"),
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", str(crf), "-auto-alt-ref", "0",
        "-row-mt", "1", "-cpu-used", "1", "-deadline", "good", "-r", fps_str,
        "-metadata:s:v:0", "alpha_mode=1", out_webm])


def main():
    ap = argparse.ArgumentParser(description="Kling MP4 -> VP9 WebM with alpha (BiRefNet-lite + matting)")
    ap.add_argument("input")
    ap.add_argument("--work", required=True, help="working directory (frames, masks, rgba); resumable")
    ap.add_argument("--out", required=True, help="output .webm")
    ap.add_argument("--start", type=int, default=0, help="first source frame (0-based)")
    ap.add_argument("--end", type=int, default=-1, help="last source frame inclusive (default: last)")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--threads", type=int, default=4)
    ap.add_argument("--strength", type=float, default=1.0, help="temporal stabilisation 0..1 (0=off)")
    ap.add_argument("--tau", type=float, default=12.0, help="photometric tolerance of the temporal mixer")
    ap.add_argument("--r-in", type=int, default=5, help="trimap: certain-foreground erosion, px")
    ap.add_argument("--r-out", type=int, default=9, help="trimap: certain-background dilation, px")
    ap.add_argument("--margin", type=int, default=24, help="matting crop margin, px")
    ap.add_argument("--supersample", type=int, default=2, help="matting super-sampling factor (1 = off, 2 = default; 3 is slow, no gain)")
    ap.add_argument("--min-area", type=int, default=600, help="drop mask islands smaller than this (px)")
    ap.add_argument("--exclude-rect", default="1090,640,1276,720",
                    help="x0,y0,x1,y1 zeroed before anything else (Kling watermark); 'none' to disable")
    ap.add_argument("--floor-shadow", action="store_true",
                    help="remove a thin flat contact-shadow ribbon between the paws (geometry rule, default OFF)")
    ap.add_argument("--fs-height", type=int, default=21, help="floor-shadow: vertical opening height, px")
    ap.add_argument("--fs-band", type=int, default=45, help="floor-shadow: only within this many px of the lowest mask point")
    ap.add_argument("--fs-min-area", type=int, default=150)
    ap.add_argument("--fs-ratio", type=float, default=3.0, help="floor-shadow: min width/height of the ribbon")
    ap.add_argument("--crf", type=int, default=14)
    ap.add_argument("--stages", default="all", help="comma list: extract,masks,stabilise,matte,encode or all")
    a = ap.parse_args()

    info = probe(a.input)
    end = info["frames"] - 1 if a.end < 0 else a.end
    ex = None if a.exclude_rect == "none" else tuple(int(v) for v in a.exclude_rect.split(","))
    stages = ["extract", "masks", "stabilise", "matte", "encode"] if a.stages == "all" else a.stages.split(",")
    print("input %dx%d %s fps, %d frames; processing %d..%d" % (info["width"], info["height"], info["fps_str"], info["frames"], a.start, end))
    t0 = time.time()
    if "extract" in stages: extract(a.input, a.work, a.start, end)
    if "masks" in stages: masks(a.work, a.start, end, a.model, a.threads)
    if "stabilise" in stages: stabilise(a.work, a.start, end, a.strength, a.tau, a.min_area, ex)
    if "matte" in stages:
        fs = dict(h_open=a.fs_height, band=a.fs_band, min_area=a.fs_min_area, ratio=a.fs_ratio) if a.floor_shadow else None
        matte(a.work, a.start, end, a.r_in, a.r_out, a.margin, a.supersample, fs)
    if "encode" in stages: encode(a.work, a.start, end, info["fps_str"], a.out, a.crf)
    print("done in %.0fs -> %s" % (time.time() - t0, a.out))


if __name__ == "__main__":
    main()
