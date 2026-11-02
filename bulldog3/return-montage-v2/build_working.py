#!/usr/bin/env python3
"""Export working D frame map as transparent VP9 without rematting."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
MAP = HERE / "FRAME_MAP.json"
ASSETS = HERE / "assets"
OUTPUT = ASSETS / "DOG3_RETURN_D_ALPHA_97.webm"
SHEET = HERE / "DOG3_RETURN_D_ALPHA_FOUR_BACKGROUNDS.png"
COLORS = (("WHITE", "#ffffff"), ("BLACK", "#000000"),
          ("GREEN", "#00df36"), ("BEIGE", "#ddc9a7"))


def run(*args):
    subprocess.run(args, check=True)


def decode(src, dest, prefix):
    dest.mkdir()
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-c:v", "libvpx-vp9",
        "-i", str(src), "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0",
        str(dest / f"{prefix}%04d.png"))


def main():
    data = json.loads(MAP.read_text())
    spec = data["variants"]["D_SELECTED_ONLY"]
    assert data["fps"] == 24 and spec["returnFrames"] == 97
    assert spec["returnSegments"] == [{"source": "selected", "first": 120,
                                         "last": 24, "step": -1, "output": [0, 96]}]
    ASSETS.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="dog3-return-approved-") as scratch:
        tmp = Path(scratch)
        decoded = tmp / "decoded"
        decode(SOURCE, decoded, "s")
        assert len(list(decoded.glob("s*.png"))) == 121
        seq = tmp / "sequence"
        seq.mkdir()
        for out, source in enumerate(range(120, 23, -1)):
            (seq / f"f{out:04d}.png").symlink_to((decoded / f"s{source:04d}.png").resolve())
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
            "-i", str(seq / "f%04d.png"), "-frames:v", "97", "-c:v", "libvpx-vp9",
            "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "14", "-auto-alt-ref", "0",
            "-row-mt", "1", "-cpu-used", "1", "-deadline", "good",
            "-metadata:s:v:0", "alpha_mode=1", str(OUTPUT))

        result = tmp / "result"
        decode(OUTPUT, result, "r")
        assert len(list(result.glob("r*.png"))) == 97
        checked = []
        for n in range(97):
            frame = Image.open(result / f"r{n:04d}.png").convert("RGBA")
            alpha = frame.getchannel("A")
            corners = [alpha.getpixel(p) for p in ((0, 0), (1275, 0),
                                                    (0, 719), (1275, 719))]
            assert corners == [0, 0, 0, 0], (n, corners)
            assert alpha.getbbox() is not None
            checked.append(corners)

        picks = (0, 24, 48, 72, 96)
        width, height = 320, 180
        canvas = Image.new("RGB", (width*4, (height+24)*len(picks)), "#222629")
        draw = ImageDraw.Draw(canvas)
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
        for row, n in enumerate(picks):
            dog = Image.open(result / f"r{n:04d}.png").convert("RGBA")
            dog = dog.resize((width, height), Image.Resampling.LANCZOS)
            for col, (label, color) in enumerate(COLORS):
                bg = Image.new("RGBA", dog.size, color)
                bg.alpha_composite(dog)
                x, y = col*width, row*(height+24)
                canvas.paste(bg.convert("RGB"), (x, y))
                draw.text((x+4, y+height+3), f"RETURN #{n:02d} · {label}",
                          font=font, fill="white")
        canvas.save(SHEET)
    (HERE / "return_d_alpha_check.json").write_text(json.dumps({
        "sourceAlpha": str(SOURCE.relative_to(HERE.parent)),
        "frameMap": "SELECTED #120..24 inclusive, reverse order",
        "frames": 97, "fps": 24, "resolution": [1276, 720],
        "allFrameCornersTransparent": True, "checkedFrames": len(checked),
        "qaFrames": list(picks),
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
