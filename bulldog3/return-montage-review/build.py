#!/usr/bin/env python3
"""Build diagnostic RETURN_TO_IDLE cuts from approved Rocky alpha frames."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
SELECTED = DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
IDLE = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_SOURCE_ALPHA_121.webm"
IDLE_B = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FPS = 24
VARIANTS = {
    "A": (("selected", 120, 80, -1), ("idle", 89, 0, -1)),
    # Compress only the settled smile and the nearly still IDLE tail.
    "B": (("selected", 120, 100, -2), ("selected", 99, 80, -1),
          ("idle", 89, 60, -1), ("idle", 59, 31, -2), ("idle", 30, 0, -1)),
    "C": (("selected", 120, 76, -1), ("idle", 80, 0, -1)),
}


def run(*args):
    subprocess.run(args, check=True)


def decode(src, dst, count):
    dst.mkdir()
    run("ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", str(src),
        "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0", str(dst / "f%03d.png"))
    files = [dst / f"f{i:03d}.png" for i in range(count)]
    if not all(p.is_file() for p in files) or len(list(dst.glob("f*.png"))) != count:
        raise RuntimeError(f"Wrong frame count for {src}")
    return files


def links(dst, frames):
    dst.mkdir()
    for i, path in enumerate(frames):
        (dst / f"f{i:04d}.png").symlink_to(path.resolve())


def render_close(sequence, count, output):
    graph = "[0:v]format=rgba[dog];color=c=0xddc9a7:s=1276x720:r=24[bg];[bg][dog]overlay=shortest=1[out]"
    run("ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
        "-i", str(sequence / "f%04d.png"), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(count), "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def make_game_canvas(path, variant):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    d = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 39)
    body = ImageFont.truetype(FONT, 25)
    d.text((75, 72), f"РОККИ · RETURN_TO_IDLE · ВАРИАНТ {variant}", font=title, fill="#202c2e")
    d.text((75, 146), "SELECTED → RETURN_TO_IDLE → IDLE B", font=body, fill="#374446")
    d.rounded_rectangle((660, 280, 1260, 775), radius=32, fill="#f0ebdf", outline="#9c917d", width=3)
    d.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    d.text((75, 940), "Проверочный размер 207×116 px. Сцена не является production-экраном.", font=body, fill="#374446")
    im.save(path)


def render_game(sequence, canvas, count, output):
    graph = "[0:v]scale=207:116,format=rgba[dog];[1:v][dog]overlay=856:527[out]"
    run("ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
        "-i", str(sequence / "f%04d.png"), "-loop", "1", "-framerate", str(FPS),
        "-i", str(canvas), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(count), "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def make_comparison(sel, idle):
    cuts = (("A", 80, 89), ("B", 80, 89), ("C", 76, 80))
    out = Image.new("RGB", (1900, 1275), "#ede8dd")
    d = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 27)
    for row, (name, s, i) in enumerate(cuts):
        for col, (label, file) in enumerate(((f"SELECTED #{s+1}", sel[s+1]),
                                             (f"SELECTED #{s}", sel[s]),
                                             (f"IDLE #{i}", idle[i]))):
            rgba = Image.open(file).convert("RGBA")
            bg = Image.new("RGBA", rgba.size, "#ddc9a7")
            bg.alpha_composite(rgba)
            x, y = 10 + 630 * col, 15 + 425 * row
            out.paste(bg.convert("RGB").resize((620, 350), Image.Resampling.LANCZOS), (x, y + 45))
            d.text((x + 4, y + 4), f"{name}: {label}", font=font, fill="#24282a")
    out.save(HERE / "JOIN_COMPARISON.png")


def main():
    HERE.mkdir(exist_ok=True)
    manifest = {"fps": FPS, "sourceAssetsUnchanged": True, "variants": {}}
    with tempfile.TemporaryDirectory(prefix="rocky-return-montage-") as scratch:
        tmp = Path(scratch)
        sel = decode(SELECTED, tmp / "selected", 121)
        idle = decode(IDLE, tmp / "idle", 121)
        idle_b = decode(IDLE_B, tmp / "idle_b", 240)
        make_comparison(sel, idle)
        for name, segments in VARIANTS.items():
            ret = []
            segment_map = []
            for kind, start, end, step in segments:
                part = [sel[j] if kind == "selected" else idle[j]
                        for j in range(start, end + step, step)]
                offset = len(ret)
                ret.extend(part)
                segment_map.append({"source": kind, "sourceStart": start, "sourceEnd": end,
                                    "step": step, "returnOutputStart": offset,
                                    "returnOutputEnd": len(ret) - 1})
            s = next(v["sourceEnd"] for v in reversed(segment_map) if v["source"] == "selected")
            i = next(v["sourceStart"] for v in segment_map if v["source"] == "idle")
            full = sel + ret + idle_b
            ret_seq, full_seq = tmp / f"return_{name}", tmp / f"full_{name}"
            links(ret_seq, ret)
            links(full_seq, full)
            canvas = tmp / f"canvas_{name}.png"
            make_game_canvas(canvas, name)
            render_close(ret_seq, len(ret), HERE / f"DOG3_RETURN_{name}_CLOSE.mp4")
            render_game(full_seq, canvas, len(full), HERE / f"DOG3_SELECTED_RETURN_{name}_IDLE_GAME.mp4")
            manifest["variants"][name] = {
                "returnFrames": len(ret), "returnSeconds": len(ret) / FPS,
                "returnSegments": segment_map,
                "join": [f"SELECTED #{s}", f"IDLE #{i}"],
                "full": {"selected": [0, 120], "return": [121, 120+len(ret)],
                         "idleB": [121+len(ret), 120+len(ret)+240], "totalFrames": len(full)},
                "sourceFramesFirstLastVerified": ["SELECTED #120", "IDLE #0"],
            }
    (HERE / "FRAME_MAP.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
