#!/usr/bin/env python3
"""Make two reversible IDLE diagnostics from the untouched source MP4."""
from pathlib import Path
import json
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent / "assets/incoming/bulldog_3_idle.mp4"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FPS = 24
DRAW_SIZE = (207, 116)
VARIANTS = {
    "A": list(range(78)) + list(range(76, 0, -1)),
    "B": list(range(121)) + list(range(119, 0, -1)),
}


def call(*cmd):
    subprocess.run(cmd, check=True)


def make_canvas(path, variant):
    image = Image.new("RGB", (1920, 1080), (235, 229, 216))
    draw = ImageDraw.Draw(image)
    title = "A: МОРГАНИЕ + ГОЛОВА/УШИ" if variant == "A" else "B: МОРГАНИЕ + ГОЛОВА/УШИ + ЛАПА"
    lines = (
        "Слева: исходный кадр крупно. Справа: размер 207 × 116 px, как в игровом тесте.",
        "Только существующие кадры. Обратный ход показан открыто; исходный фон сохранён.",
    )
    draw.text((55, 43), f"РОККИ · IDLE · ВАРИАНТ {title}",
              font=ImageFont.truetype(FONT, 32), fill=(33, 38, 41))
    for i, line in enumerate(lines):
        draw.text((55, 954 + 32 * i), line,
                  font=ImageFont.truetype(FONT, 21), fill=(51, 56, 60))
    image.save(path)


def main():
    with tempfile.TemporaryDirectory(prefix="rocky-idle-full-") as temp:
        tmp = Path(temp)
        frames = tmp / "frames"
        frames.mkdir()
        call("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SOURCE),
             "-start_number", "0", str(frames / "%03d.png"))
        for variant, cycle in VARIANTS.items():
            background = tmp / f"bg-{variant}.png"
            make_canvas(background, variant)
            seq_dir = tmp / f"seq-{variant}"
            seq_dir.mkdir()
            sequence = cycle * 3
            for i, n in enumerate(sequence):
                (seq_dir / f"f{i:04d}.png").symlink_to(frames / f"{n:03d}.png")
            graph = ("[0:v]split=2[big0][small0];[big0]scale=1100:621[big];"
                     "[small0]scale=207:116[small];"
                     "[1:v][big]overlay=60:195[t];[t][small]overlay=1430:445[out]")
            output = HERE / f"DOG3_IDLE_FULL_SOURCE_VARIANT_{variant}_3X.mp4"
            call("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                 "-framerate", str(FPS), "-i", str(seq_dir / "f%04d.png"),
                 "-loop", "1", "-framerate", str(FPS), "-i", str(background),
                 "-filter_complex", graph, "-map", "[out]", "-frames:v", str(len(sequence)),
                 "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
                 "-movflags", "+faststart", str(output))
    (HERE / "frame_map.json").write_text(json.dumps({
        "fps": FPS,
        "drawSize": DRAW_SIZE,
        "sourceBackgroundRetained": True,
        "A": {"sourceFramesPerCycle": VARIANTS["A"], "repeats": 3},
        "B": {"sourceFramesPerCycle": VARIANTS["B"], "repeats": 3},
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
