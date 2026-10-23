#!/usr/bin/env python3
"""Visual QA sheets from decoded final WebM frames, not intermediate RGBA."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
COLORS = (("WHITE", "#ffffff"), ("BLACK", "#000000"),
          ("GREEN", "#00df36"), ("BEIGE", "#ddc9a7"))
KEY = [0, 10, 12, 14, 60, 62, 64, 76, 78, 80, 91, 93, 95, 120, 121, 180, 239]
EYES = [9, 10, 12, 14, 15, 59, 60, 62, 64, 65, 90, 92, 94]
CONTOUR = [0, 65, 77, 79, 80, 92, 94, 120]


def get(decoded, n):
    return Image.open(decoded / f"d{n+1:04d}.png").convert("RGBA")


def composite(im, color):
    bg = Image.new("RGB", im.size, color)
    bg.paste(im, (0, 0), im)
    return bg


def sheet(decoded, frames, crop, size, path, label):
    w, h = size
    out = Image.new("RGB", (4 * w, len(frames) * (h + 27)), "#222629")
    draw = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 17)
    for row, n in enumerate(frames):
        frame = get(decoded, n)
        if crop:
            frame = frame.crop(crop)
        frame = frame.resize((w, h), Image.Resampling.LANCZOS)
        for col, (name, color) in enumerate(COLORS):
            out.paste(composite(frame, color), (col * w, row * (h + 27)))
            draw.text((col * w + 5, row * (h + 27) + h + 4),
                      f"{label} #{n:03d} · {name}", font=font, fill="white")
    out.save(path)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--decoded", type=Path, required=True)
    a = p.parse_args()
    for n in KEY:
        if not (a.decoded / f"d{n+1:04d}.png").exists():
            raise FileNotFoundError(f"decoded cycle frame #{n}")
    sheet(a.decoded, KEY, None, (320, 180), HERE / "ALPHA_KEYFRAMES_FOUR_BACKGROUNDS.png", "CYCLE")
    sheet(a.decoded, EYES, (410, 135, 790, 390), (360, 242),
          HERE / "ALPHA_EYES_FOUR_BACKGROUNDS.png", "EYES")
    sheet(a.decoded, CONTOUR, (240, 0, 1000, 700), (430, 396),
          HERE / "ALPHA_CONTOUR_FOUR_BACKGROUNDS.png", "DOG")
    data = []
    for n in range(240):
        alpha = get(a.decoded, n).getchannel("A")
        bbox = alpha.point(lambda x: 255 if x > 30 else 0).getbbox()
        corners = [alpha.getpixel(p) for p in ((0, 0), (1275, 0), (0, 719), (1275, 719))]
        data.append({"cycleFrame": n, "bbox": bbox, "cornerAlpha": corners})
    (HERE / "alpha_frame_check.json").write_text(json.dumps(data, indent=2) + "\n")


if __name__ == "__main__":
    main()
