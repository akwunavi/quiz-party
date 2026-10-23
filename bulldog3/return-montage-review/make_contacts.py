#!/usr/bin/env python3
"""Visual index of final RETURN_TO_IDLE frame maps."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def decode(src, dst):
    dst.mkdir()
    subprocess.run(("ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", str(src),
                    "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0", str(dst / "f%03d.png")),
                   check=True)


def main():
    maps = json.loads((HERE / "FRAME_MAP.json").read_text())["variants"]
    with tempfile.TemporaryDirectory(prefix="rocky-return-contacts-") as scratch:
        tmp = Path(scratch)
        source = {
            "selected": DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm",
            "idle": DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_SOURCE_ALPHA_121.webm",
        }
        for name, path in source.items():
            decode(path, tmp / name)
        font = ImageFont.truetype(FONT, 21)
        for variant, data in maps.items():
            frames = []
            for item in data["returnSegments"]:
                frames.extend((item["source"], n) for n in range(
                    item["sourceStart"], item["sourceEnd"] + item["step"], item["step"]))
            assert len(frames) == data["returnFrames"]
            seam = next(item["returnOutputStart"] for item in data["returnSegments"] if item["source"] == "idle")
            points = sorted(set(list(range(0, len(frames), 10)) +
                                [max(0, seam-2), seam-1, seam, min(len(frames)-1, seam+1), len(frames)-1]))
            cols, w, h = 7, 440, 280
            out = Image.new("RGB", (cols*w, ((len(points)+cols-1)//cols)*h), "#eee6d8")
            draw = ImageDraw.Draw(out)
            for n, idx in enumerate(points):
                kind, j = frames[idx]
                rgba = Image.open(tmp / kind / f"f{j:03d}.png").convert("RGBA")
                bg = Image.new("RGBA", rgba.size, "#ddc9a7")
                bg.alpha_composite(rgba)
                x, y = n % cols * w, n // cols * h
                out.paste(bg.convert("RGB").resize((w, h-30)), (x, y+30))
                draw.text((x+4, y+2), f"{idx:03d} {kind} #{j}", font=font, fill="#222")
            out.save(HERE / f"RETURN_{variant}_CONTACT.jpg", quality=92)


if __name__ == "__main__":
    main()
