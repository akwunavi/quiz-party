#!/usr/bin/env python3
"""Rocky RETURN_TO_IDLE diagnostics from already approved alpha video frames."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
FPS = 24
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SELECTED = DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
IDLE = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_SOURCE_ALPHA_121.webm"
IDLE_B = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm"

# Each tuple is source, first, last, step. All endpoints are inclusive.
VARIANTS = {
    # One source for the whole active return; join to IDLE at matching stance.
    "D_SELECTED_ONLY": (("selected", 120, 24, -1),),
    # Short return: cut in the wide planted stance, then IDLE's own motion.
    "E_SHORT_WIDE": (("selected", 120, 106, -1), ("idle", 98, 0, -1)),
    # Internal SELECTED bridge avoids the previous SELECTED/IDLE crouch cut.
    "F_INTERNAL_BRIDGE": (("selected", 120, 83, -1),
                          ("selected", 38, 24, -1)),
}


def run(*args):
    subprocess.run(args, check=True)


def decode(src, dest, count):
    dest.mkdir()
    run("ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", str(src),
        "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0",
        str(dest / "f%03d.png"))
    paths = [dest / f"f{i:03d}.png" for i in range(count)]
    assert all(p.is_file() for p in paths)
    return paths


def sequence(dest, frames):
    dest.mkdir()
    for i, src in enumerate(frames):
        (dest / f"f{i:04d}.png").symlink_to(src.resolve())


def canvas(path, name):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    d = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 38)
    body = ImageFont.truetype(FONT, 24)
    d.text((75, 72), f"РОККИ · RETURN_TO_IDLE · {name}", font=title, fill="#202c2e")
    d.text((75, 146), "SELECTED → RETURN_TO_IDLE → IDLE B", font=body, fill="#374446")
    d.rounded_rectangle((660, 280, 1260, 775), radius=32,
                        fill="#f0ebdf", outline="#9c917d", width=3)
    d.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    d.text((75, 940), "Проверочный размер 207×116 px; не production-экран.",
           font=body, fill="#374446")
    im.save(path)


def render(seq, count, output, game=False, bg=None):
    cmd = ["ffmpeg", "-v", "error", "-y", "-framerate", "24", "-i",
           str(seq / "f%04d.png")]
    if game:
        cmd += ["-loop", "1", "-framerate", "24", "-i", str(bg),
                "-filter_complex", "[0:v]scale=207:116,format=rgba[dog];"
                "[1:v][dog]overlay=856:527[out]"]
    else:
        cmd += ["-filter_complex", "[0:v]format=rgba[dog];"
                "color=c=0xddc9a7:s=1276x720:r=24[bg];"
                "[bg][dog]overlay=shortest=1[out]"]
    cmd += ["-map", "[out]", "-frames:v", str(count), "-c:v", "libx264",
            "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", str(output)]
    run(*cmd)


def compare(source, maps):
    pairs = (("D: SELECTED #24 → IDLE #0", ("selected", 24), ("idle", 0)),
             ("E: SELECTED #106 → IDLE #98", ("selected", 106), ("idle", 98)),
             ("F: SELECTED #83 → #38", ("selected", 83), ("selected", 38)))
    out = Image.new("RGB", (1280, len(pairs) * 430), "#eee6d8")
    draw = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 25)
    for row, (label, left, right) in enumerate(pairs):
        draw.text((12, row*430+5), label, font=font, fill="#222")
        for col, (kind, num) in enumerate((left, right)):
            rgba = Image.open(source[kind][num]).convert("RGBA")
            bg = Image.new("RGBA", rgba.size, "#ddc9a7")
            bg.alpha_composite(rgba)
            out.paste(bg.convert("RGB").resize((630, 355)), (col*640, row*430+52))
    out.save(HERE / "JOIN_COMPARISON.png")


def main():
    manifest = {"fps": FPS, "sourceAssetsUnchanged": True, "variants": {}}
    with tempfile.TemporaryDirectory(prefix="rocky-return-v2-") as scratch:
        tmp = Path(scratch)
        sources = {"selected": decode(SELECTED, tmp/"selected", 121),
                   "idle": decode(IDLE, tmp/"idle", 121),
                   "idle_b": decode(IDLE_B, tmp/"idle_b", 240)}
        compare(sources, manifest)
        for name, segments in VARIANTS.items():
            frames = []
            frame_map = []
            for kind, first, last, step in segments:
                part = [sources[kind][n] for n in range(first, last+step, step)]
                offset = len(frames)
                frames.extend(part)
                frame_map.append({"source": kind, "first": first, "last": last,
                                  "step": step, "output": [offset, len(frames)-1]})
            ret_seq, full_seq = tmp / f"ret_{name}", tmp / f"full_{name}"
            sequence(ret_seq, frames)
            full = sources["selected"] + frames + sources["idle_b"]
            sequence(full_seq, full)
            bg = tmp/f"bg_{name}.png"
            canvas(bg, name)
            render(ret_seq, len(frames), HERE/f"DOG3_RETURN_{name}_CLOSE.mp4")
            render(full_seq, len(full),
                   HERE/f"DOG3_SELECTED_RETURN_{name}_IDLE_GAME.mp4", True, bg)
            manifest["variants"][name] = {
                "returnFrames": len(frames), "returnSeconds": len(frames)/FPS,
                "returnSegments": frame_map,
                "returnLast": "SELECTED #24" if name != "E_SHORT_WIDE" else "IDLE #0",
                "full": {"selected": [0,120], "return": [121,120+len(frames)],
                         "idleB": [121+len(frames),120+len(frames)+240],
                         "totalFrames": len(full)},
            }
    (HERE/"FRAME_MAP.json").write_text(json.dumps(manifest, indent=2)+"\n")


if __name__ == "__main__":
    main()
