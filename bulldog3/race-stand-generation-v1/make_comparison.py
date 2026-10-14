#!/usr/bin/env python3
"""Arrange the single generated RACE_STAND beside unmodified source references."""

from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageFont


HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
REFERENCES = [
    (ROOT / "reviews/asset-intake/DOG3_FRONT_STAND_SOURCE_000.png", "FRONT_STAND · IDLE #0"),
    (ROOT / "reviews/race-stand/DOG3_RUN_SOURCE_063.png", "RUN source #63 · body reference"),
    (HERE / "REF_RUN_069.png", "RUN source #69 · paw phase"),
]


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 make_comparison.py GENERATED_IMAGE_PATH")
    generated = Path(sys.argv[1]).resolve()
    if not generated.is_file():
        raise SystemExit(f"Image missing: {generated}")
    inputs = REFERENCES + [(generated, "GENERATED RACE_STAND · candidate")]
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
    small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
    sheet = Image.new("RGB", (1920, 1260), "#292d32")
    draw = ImageDraw.Draw(sheet)
    for index, (path, title) in enumerate(inputs):
        original = Image.open(path).convert("RGBA")
        white = Image.new("RGBA", original.size, "#d9d8d3")
        white.alpha_composite(original)
        image = white.convert("RGB")
        image.thumbnail((930, 525), Image.Resampling.LANCZOS)
        x = (index % 2) * 960 + (960 - image.width) // 2
        y = (index // 2) * 630 + 58
        sheet.paste(image, (x, y))
        draw.text(((index % 2) * 960 + 18, (index // 2) * 630 + 11), title, font=font, fill="white")
        draw.text(((index % 2) * 960 + 18, y + image.height + 8), f"{Path(path).name} · {original.width}×{original.height}", font=small, fill="#e4e6e8")
    output = HERE / "DOG3_RACE_STAND_V1_COMPARISON.png"
    sheet.save(output)
    print(output)


if __name__ == "__main__":
    main()
