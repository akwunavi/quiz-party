#!/usr/bin/env python3
"""Build visual indices of actual RETURN frame sequences."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def decode(src, dest):
    dest.mkdir()
    subprocess.run(("ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9",
                    "-i", str(src), "-pix_fmt", "rgba", "-vsync", "0",
                    "-start_number", "0", str(dest/"f%03d.png")), check=True)


def main():
    maps = json.loads((HERE/"FRAME_MAP.json").read_text())["variants"]
    with tempfile.TemporaryDirectory(prefix="rocky-return-v2-contact-") as scratch:
        tmp = Path(scratch)
        src = {"selected": DOG3/"selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm",
               "idle": DOG3/"idle-alpha-lab/assets/DOG3_IDLE_SOURCE_ALPHA_121.webm"}
        for name, file in src.items():
            decode(file, tmp/name)
        font = ImageFont.truetype(FONT, 19)
        for name, data in maps.items():
            sequence = []
            seam = []
            for part in data["returnSegments"]:
                if sequence:
                    seam.extend((len(sequence)-2, len(sequence)-1,
                                 len(sequence), len(sequence)+1))
                sequence.extend((part["source"], n) for n in range(
                    part["first"], part["last"]+part["step"], part["step"]))
            assert len(sequence) == data["returnFrames"]
            pts = sorted(set(range(0, len(sequence), 7)) |
                         set(seam) | {len(sequence)-1})
            w, h, cols = 360, 225, 7
            out = Image.new("RGB", (w*cols, h*((len(pts)+cols-1)//cols)), "#eee6d8")
            draw = ImageDraw.Draw(out)
            for k, pos in enumerate(pts):
                kind, idx = sequence[pos]
                im = Image.open(tmp/kind/f"f{idx:03}.png").convert("RGBA")
                bg = Image.new("RGBA", im.size, "#ddc9a7")
                bg.alpha_composite(im)
                x, y = (k%cols)*w, (k//cols)*h
                out.paste(bg.convert("RGB").resize((w,h-28)), (x,y+28))
                draw.text((x+4,y+3), f"{pos:03} {kind} #{idx}", fill="#222", font=font)
            out.save(HERE/f"{name}_CONTACT.jpg", quality=90)


if __name__ == "__main__":
    main()
