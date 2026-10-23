#!/usr/bin/env python3
"""Create face and paw detail sheets from verified final WebM frames."""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FPS = 24
FRAMES = (0, 31, 34, 39, 42, 46, 76, 80, 88, 92, 96, 120)
BACKGROUNDS = (("WHITE", "#ffffff"), ("BLACK", "#000000"),
               ("GREEN", "#00df36"), ("BEIGE", "#ddc9a7"))
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
HERE = Path(__file__).resolve().parent


def sheet(decoded, output, box, indices):
    w = box[2] - box[0]
    h = box[3] - box[1]
    label_h = 26
    result = Image.new("RGB", (w * len(indices), (h + label_h) * len(BACKGROUNDS)), "white")
    pen = ImageDraw.Draw(result)
    font = ImageFont.truetype(FONT, 18)
    for row, (name, color) in enumerate(BACKGROUNDS):
        for col, i in enumerate(indices):
            rgba = Image.open(decoded / f"d{i + 1:04d}.png").convert("RGBA")
            composite = Image.new("RGBA", rgba.size, color)
            composite.alpha_composite(rgba)
            x, y = col * w, row * (h + label_h)
            result.paste(composite.convert("RGB").crop(box), (x, y + label_h))
            pen.text((x + 5, y + 3), f"{name} #{i}", font=font, fill="#1a1a1a")
    result.save(output)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("decoded", type=Path, help="d0001.png..d0121.png from verify_alpha.py")
    args = parser.parse_args()
    decoded = args.decoded
    assert all((decoded / f"d{i + 1:04d}.png").is_file() for i in FRAMES)
    sheet(decoded, HERE / "SELECTED_FACE_DETAILS_FOUR_BACKGROUNDS.png",
          (395, 25, 900, 405), (0, 31, 34, 39, 42, 46, 88, 92, 96, 120))
    sheet(decoded, HERE / "SELECTED_PAWS_DETAILS_FOUR_BACKGROUNDS.png",
          (395, 450, 960, 715), (0, 34, 39, 46, 76, 80, 88, 92, 96, 120))


if __name__ == "__main__":
    main()
