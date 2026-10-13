#!/usr/bin/env python3
"""
verify_alpha.py — independent checks of an alpha WebM. Having an alpha channel proves nothing about
the quality of the cut, so this script looks at what is actually in the pixels.

  python verify_alpha.py clip.webm --out report_dir [--ref other.webm --ref-offset N] [--frames 0,10,20]

Checks
  * container: VP9, alpha_mode tag, size, fps, frame count (ffprobe)
  * decoded alpha (libvpx-vp9 decoder; ffmpeg's native vp9 drops alpha): corners transparent,
    coverage per frame, isolated islands (floor / watermark fragments), frame-to-frame mask IoU
  * edge cleanliness: composite on white / black / beige / dark-gray sheets for eyes
  * optional comparison with a reference alpha WebM (IoU, alpha error, colour error)
  * Chromium: the clip is played over a magenta background; corners must show magenta (no black box)
"""
import argparse, json, os, subprocess, sys, threading, http.server, socketserver, functools
import numpy as np
import cv2

BGS = {"white": (255, 255, 255), "black": (0, 0, 0), "beige": (209, 197, 170), "darkgray": (60, 62, 66)}


def sh(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(" ".join(cmd) + "\n" + r.stderr[-1500:])
    return r.stdout


def probe(webm):
    out = json.loads(sh(["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_frames", "-show_entries",
                         "stream=codec_name,width,height,r_frame_rate,nb_read_frames,pix_fmt:stream_tags=alpha_mode",
                         "-of", "json", webm]))["streams"][0]
    return out


def decode(webm, outdir):
    os.makedirs(outdir, exist_ok=True)
    sh(["ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", webm, "-pix_fmt", "rgba", "-vsync", "0",
        os.path.join(outdir, "d%04d.png")])
    n = len([f for f in os.listdir(outdir) if f.startswith("d") and f.endswith(".png")])
    return [os.path.join(outdir, "d%04d.png" % (i + 1)) for i in range(n)]


def rd(path):
    return cv2.cvtColor(cv2.imread(path, cv2.IMREAD_UNCHANGED), cv2.COLOR_BGRA2RGBA)


def islands(mask, min_px=20):
    n, lab, st, _ = cv2.connectedComponentsWithStats(mask.astype(np.uint8), connectivity=8)
    return sorted([int(s) for s in st[1:, cv2.CC_STAT_AREA] if s >= min_px], reverse=True)


def composite(rgba, bg):
    a = rgba[..., 3:4].astype(np.float32) / 255
    return (rgba[..., :3] * a + np.array(bg, np.float32) * (1 - a)).astype(np.uint8)


def sheet(files, idx, out):
    tiles = []
    for name, bg in BGS.items():
        row = []
        for i in idx:
            c = composite(rd(files[i]), bg)
            c = cv2.resize(c, (c.shape[1] // 3, c.shape[0] // 3), interpolation=cv2.INTER_AREA)
            cv2.putText(c, "%s #%d" % (name, i), (4, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 0, 255), 1)
            row.append(c)
        tiles.append(np.hstack(row))
    cv2.imwrite(out, cv2.cvtColor(np.vstack(tiles), cv2.COLOR_RGB2BGR))


def chromium_test(webm, out_png):
    from playwright.sync_api import sync_playwright
    d = os.path.dirname(os.path.abspath(webm)); name = os.path.basename(webm)
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=d)
    handler.log_message = lambda *a, **k: None
    srv = socketserver.TCPServer(("127.0.0.1", 0), handler); port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    exe = os.environ.get("CHROMIUM", "/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    res = {}
    try:
        with sync_playwright() as pw:
            b = pw.chromium.launch(executable_path=exe, headless=True, args=["--no-sandbox", "--autoplay-policy=no-user-gesture-required"])
            pg = b.new_page(viewport={"width": 1300, "height": 740})
            pg.set_content('<body style="margin:0;background:#ff00ff"><video id=v src="http://127.0.0.1:%d/%s" muted loop autoplay playsinline style="display:block;width:1276px;height:720px"></video></body>' % (port, name))
            pg.wait_for_function("document.getElementById('v').readyState>=3", timeout=20000)
            pg.evaluate("document.getElementById('v').pause(); document.getElementById('v').currentTime=0.5")
            pg.wait_for_timeout(600)
            res["videoWidth"] = pg.evaluate("document.getElementById('v').videoWidth")
            res["error"] = pg.evaluate("document.getElementById('v').error ? document.getElementById('v').error.message : null")
            pg.screenshot(path=out_png, clip={"x": 0, "y": 0, "width": 1276, "height": 720})
            b.close()
    finally:
        srv.shutdown()
    im = cv2.cvtColor(cv2.imread(out_png), cv2.COLOR_BGR2RGB)
    corners = [im[2, 2], im[2, -3], im[-3, 2], im[-3, -3]]
    res["corner_pixels"] = [list(map(int, c)) for c in corners]
    res["corners_are_magenta"] = all(abs(int(c[0]) - 255) < 4 and int(c[1]) < 4 and abs(int(c[2]) - 255) < 4 for c in corners)
    non_bg = (np.abs(im.astype(int) - np.array([255, 0, 255])).sum(axis=2) > 30).mean()
    res["non_background_fraction"] = round(float(non_bg), 4)
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("webm"); ap.add_argument("--out", required=True)
    ap.add_argument("--ref"); ap.add_argument("--ref-offset", type=int, default=0, help="frame index in ref matching frame 0 of webm")
    ap.add_argument("--frames", default="", help="comma list of frame indices for the sheets (default: 8 evenly spaced)")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    rep = {}
    pr = probe(a.webm); rep["container"] = pr
    rep["container_ok"] = (pr["codec_name"] == "vp9" and str({k.lower(): x for k, x in pr.get("tags", {}).items()}.get("alpha_mode")) == "1")
    files = decode(a.webm, os.path.join(a.out, "dec"))
    n = len(files); rep["frames_decoded"] = n
    al = [rd(f)[..., 3] for f in files]
    rep["corner_alpha_max"] = int(max(max(x[0, 0], x[0, -1], x[-1, 0], x[-1, -1]) for x in al))
    rep["alpha_range"] = [int(min(x.min() for x in al)), int(max(x.max() for x in al))]
    cov = [float((x > 127).mean()) for x in al]; rep["coverage_min_max"] = [round(min(cov), 4), round(max(cov), 4)]
    isl = [islands(x > 127) for x in al]
    rep["frames_with_extra_islands_over_20px"] = [i for i, s in enumerate(isl) if len(s) > 1]
    rep["largest_extra_island_px"] = max([s[1] for s in isl if len(s) > 1] or [0])
    ious = [float(((al[i] > 127) & (al[i + 1] > 127)).sum() / max(((al[i] > 127) | (al[i + 1] > 127)).sum(), 1)) for i in range(n - 1)]
    rep["neighbour_mask_iou_min_mean"] = [round(min(ious), 3), round(float(np.mean(ious)), 3)] if ious else None
    semi = [float(((x > 8) & (x < 247)).sum()) for x in al]; rep["semi_transparent_px_mean"] = round(float(np.mean(semi)))
    idx = [int(v) for v in a.frames.split(",")] if a.frames else [int(round(v)) for v in np.linspace(0, n - 1, 8)]
    sheet(files, idx, os.path.join(a.out, "sheet_backgrounds.png"))
    if a.ref:
        rf = decode(a.ref, os.path.join(a.out, "ref"))
        rows = []
        for i in range(n):
            j = i + a.ref_offset
            if j < 0 or j >= len(rf): continue
            A, B = rd(files[i]), rd(rf[j])
            ma, mb = A[..., 3] > 127, B[..., 3] > 127
            iou = float((ma & mb).sum() / max((ma | mb).sum(), 1))
            aerr = float(np.abs(A[..., 3].astype(np.float32) - B[..., 3].astype(np.float32)).mean())
            both = (A[..., 3] > 250) & (B[..., 3] > 250)
            cerr = float(np.abs(A[..., :3].astype(np.float32) - B[..., :3].astype(np.float32)).mean(axis=2)[both].mean()) if both.any() else None
            rows.append((i, iou, aerr, cerr, int(ma.sum()), int(mb.sum())))
        rep["vs_reference_per_frame(idx,iou,mean|dAlpha|,rgb_err_opaque,area_new,area_ref)"] = rows
        rep["vs_reference_mean_iou"] = round(float(np.mean([r[1] for r in rows])), 4) if rows else None
    try:
        rep["chromium"] = chromium_test(a.webm, os.path.join(a.out, "chromium_on_magenta.png"))
    except Exception as e:
        rep["chromium"] = {"error": str(e)[:400]}
    json.dump(rep, open(os.path.join(a.out, "report.json"), "w"), indent=1, default=str)
    print(json.dumps(rep, indent=1, default=str))


if __name__ == "__main__":
    main()
