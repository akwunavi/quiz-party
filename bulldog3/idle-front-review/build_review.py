#!/usr/bin/env python3
"""Build source-only IDLE review videos; no alpha or gameplay integration."""
from pathlib import Path
import json
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
IDLE = ROOT / "assets/incoming/bulldog_3_idle.mp4"
SELECTED = ROOT / "assets/incoming/bulldog_3_selected.mp4"
FRONT = ROOT / "reviews/asset-intake/DOG3_FRONT_STAND_SOURCE_000.png"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FPS = 24
ENTRY = list(range(59))
LOOP = list(range(34, 59))


def run(*args):
    subprocess.run(args, check=True)


def canvas(path, size, title, lines):
    im = Image.new("RGB", size, (235, 229, 216))
    d = ImageDraw.Draw(im)
    d.text((55, 45), title, font=ImageFont.truetype(FONT, 34), fill=(34, 39, 41))
    for j, line in enumerate(lines):
        d.text((55, size[1] - 128 + 32 * j), line, font=ImageFont.truetype(FONT, 21), fill=(55, 60, 62))
    im.save(path)


def link_sequence(frames, frame_dir, out_dir):
    out_dir.mkdir()
    for i, source in enumerate(frames):
        (out_dir / f"f{i:04d}.png").symlink_to(frame_dir / f"{source:03d}.png")


def encode(sequence, background, output, overlays):
    split = "[0:v]split=2[big0][small0];[big0]scale=1100:621[big];[small0]scale=207:116[small];"
    if overlays == "both":
        graph = split + "[1:v][big]overlay=60:195[t];[t][small]overlay=1430:445[out]"
    else:
        graph = "[0:v]scale=207:116[small];[1:v][small]overlay=376:205[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-framerate", str(FPS), "-i", str(sequence / "f%04d.png"),
        "-loop", "1", "-framerate", str(FPS), "-i", str(background),
        "-filter_complex", graph, "-map", "[out]", "-frames:v", str(len(list(sequence.iterdir()))),
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(output))


def contact_sheet(front, idle0, selected0):
    imgs = [Image.open(p).convert("RGB") for p in (front, idle0, selected0)]
    thumb = (620, 350)
    out = Image.new("RGB", (1920, 485), (235, 229, 216))
    d = ImageDraw.Draw(out)
    labels = ("FRONT_STAND source #0", "IDLE original #0", "SELECTED original #0")
    for i, (im, label) in enumerate(zip(imgs, labels)):
        x = 10 + 635 * i
        out.paste(im.resize(thumb, Image.Resampling.LANCZOS), (x, 68))
        d.text((x + 4, 22), label, font=ImageFont.truetype(FONT, 23), fill=(30, 36, 40))
    d.text((22, 437), "Original background retained. Diagnostic comparison only.",
           font=ImageFont.truetype(FONT, 21), fill=(48, 53, 56))
    out.save(HERE / "DOG3_FRONT_IDLE_SELECTED_FIRST_FRAME.png")


def main():
    with tempfile.TemporaryDirectory(prefix="dog3-idle-review-") as tmp:
        tmp = Path(tmp)
        frames = tmp / "frames"
        frames.mkdir()
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(IDLE),
            "-frames:v", "59", "-start_number", "0", str(frames / "%03d.png"))
        selected = tmp / "selected.png"
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SELECTED),
            "-frames:v", "1", str(selected))
        contact_sheet(FRONT, frames / "000.png", selected)
        a = tmp / "entry"
        b = tmp / "loop"
        link_sequence(ENTRY + LOOP * 4, frames, a)
        link_sequence(LOOP * 12, frames, b)
        ca, cb = tmp / "entry-canvas.png", tmp / "loop-canvas.png"
        canvas(ca, (1920, 1080), "РОККИ · IDLE · ВХОД + 4 ЦИКЛА",
               ("Слева: оригинальный кадр · справа: 207 × 116 px, предполагаемый игровой размер.",
                "Исходный фон сохранён; alpha и игровая интеграция не выполнялись."))
        canvas(cb, (960, 540), "РОККИ · IDLE · 12 ПОВТОРОВ",
               ("Цикл: исходные #34–58 · 25 кадров · 24 FPS.",
                "Масштаб изображения: 207 × 116 px; исходный фон сохранён."))
        encode(a, ca, HERE / "DOG3_IDLE_ENTRY_0-58_LOOP_34-58_4X.mp4", "both")
        encode(b, cb, HERE / "DOG3_IDLE_GAME_SCALE_LOOP_34-58_12X.mp4", "small")
    (HERE / "frame_map.json").write_text(json.dumps({
        "fps": FPS,
        "entryPreview": {"file": "DOG3_IDLE_ENTRY_0-58_LOOP_34-58_4X.mp4",
                         "sourceFrames": ENTRY + LOOP * 4},
        "loopPreview": {"file": "DOG3_IDLE_GAME_SCALE_LOOP_34-58_12X.mp4",
                        "sourceFrames": LOOP * 12},
        "gamePreviewDrawSize": [207, 116],
        "sourceBackgroundRetained": True,
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
