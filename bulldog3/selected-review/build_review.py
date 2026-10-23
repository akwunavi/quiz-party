#!/usr/bin/env python3
"""Build frame-faithful SELECTED review media; no alpha or production changes."""
from pathlib import Path
import json
import shutil
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
DOG3 = ROOT.parent
SOURCE = DOG3 / "assets/incoming/bulldog_3_selected.mp4"
FRONT = DOG3 / "idle-alpha-lab/assets/DOG3_FRONT_STAND_ALPHA.png"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FRAME_RATE = 24
FRAMES = 121
FRONT_HOLD = 8  # Diagnostic hold only; selected movement stays #0..120.


def run(*args):
    subprocess.run(args, check=True)


def cover_image(selected_first, output):
    # Preserve the source studio behind approved FRONT_STAND, including its ground.
    bg = Image.open(selected_first).convert("RGBA")
    front = Image.open(FRONT).convert("RGBA")
    if bg.size != (1276, 720) or front.size != bg.size:
        raise ValueError("Expected matching original frame sizes")
    bg.alpha_composite(front)
    bg.convert("RGB").save(output)


def game_canvas(output):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    d = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 40)
    text = ImageFont.truetype(FONT, 24)
    d.text((75, 72), "РОККИ · SELECTED · РАЗМЕР ЭКРАНА ВЫБОРА", font=title, fill="#202c2e")
    d.rounded_rectangle((660, 280, 1260, 775), radius=32, fill="#f0ebdf", outline="#9c917d", width=3)
    d.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    d.text((75, 940), "Кадр 1276×720 показан как 207×116 px. Исходный фон SELECTED пока виден: alpha не делали.",
           font=text, fill="#374446")
    im.save(output)


def comparison(first, end, output):
    front = Image.open(FRONT).convert("RGBA")
    beige = Image.new("RGBA", front.size, "#ddc9a7")
    beige.alpha_composite(front)
    imgs = [beige.convert("RGB"), Image.open(first).convert("RGB"), Image.open(end).convert("RGB")]
    out = Image.new("RGB", (1920, 460), "#eee9de")
    d = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 22)
    names = ["FRONT_STAND alpha #0", "SELECTED source #0", "SELECTED source #120"]
    for i, (img, label) in enumerate(zip(imgs, names)):
        x = 10 + 635 * i
        out.paste(img.resize((620, 350), Image.Resampling.LANCZOS), (x, 60))
        d.text((x + 3, 22), label, font=font, fill="#232729")
    d.text((20, 428), "Конец SELECTED — улыбка и более широкая стойка; это не исходная FRONT_STAND.",
           font=ImageFont.truetype(FONT, 19), fill="#3b4345")
    out.save(output)


def storyboard(frames_dir, indices, output, title):
    w, h, cols = 470, 265, 4
    rows = (len(indices) + cols - 1) // cols
    out = Image.new("RGB", (cols * w, rows * (h + 32) + 50), "#eee9de")
    d = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 22)
    d.text((20, 10), title, font=font, fill="#252b2d")
    for i, n in enumerate(indices):
        x = (i % cols) * w
        y = 50 + (i // cols) * (h + 32)
        im = Image.open(frames_dir / f"s{n:03d}.png").convert("RGB")
        out.paste(im.resize((w, h), Image.Resampling.LANCZOS), (x, y))
        d.text((x + 8, y + h + 3), f"source #{n} · {n/FRAME_RATE:.3f} s", font=font, fill="#202729")
    out.save(output)


def main():
    ROOT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="rocky-selected-") as scratch:
        tmp = Path(scratch)
        frames = tmp / "frames"
        frames.mkdir()
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SOURCE),
            "-vsync", "0", "-start_number", "0", str(frames / "s%03d.png"))
        if len(list(frames.glob("s*.png"))) != FRAMES:
            raise ValueError("Selected source is no longer 121 frames")
        first = frames / "s000.png"
        last = frames / "s120.png"
        shutil.copyfile(last, ROOT / "DOG3_RETURN_FIRST_SELECTED_120.png")
        cover_image(first, ROOT / "DOG3_RETURN_LAST_FRONT_STAND_000.png")
        comparison(first, last, ROOT / "FRONT_SELECTED_START_END_COMPARISON.png")
        storyboard(frames, [0, 16, 30, 34, 40, 46, 60, 74, 80, 88, 96, 120],
                   ROOT / "SELECTED_ACTION_CONTACT.png", "SELECTED — полный ход реакции, исходные кадры")
        storyboard(frames, [120, 108, 96, 88, 80, 72, 60, 42, 30, 16, 0],
                   ROOT / "RETURN_REVERSE_DIAGNOSTIC_CONTACT.png", "Только диагностика: кадры SELECTED в обратном порядке")

        # Preserve every source packet and only move MP4 metadata for ordinary playback.
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SOURCE),
            "-map", "0:v:0", "-c:v", "copy", "-movflags", "+faststart",
            str(ROOT / "DOG3_SELECTED_0-120_SOURCE_REVIEW.mp4"))

        canvas = tmp / "game-canvas.png"
        game_canvas(canvas)
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SOURCE),
            "-loop", "1", "-framerate", str(FRAME_RATE), "-i", str(canvas),
            "-filter_complex", "[0:v]scale=207:116,format=rgba[dog];[1:v][dog]overlay=856:527:shortest=1[out]",
            "-map", "[out]", "-frames:v", str(FRAMES), "-r", str(FRAME_RATE),
            "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", str(ROOT / "DOG3_SELECTED_0-120_SELECTION_SCALE.mp4"))

        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-loop", "1", "-framerate", str(FRAME_RATE), "-i", str(ROOT / "DOG3_RETURN_LAST_FRONT_STAND_000.png"),
            "-i", str(SOURCE),
            "-filter_complex", f"[0:v]trim=end_frame={FRONT_HOLD},setpts=PTS-STARTPTS[stand];"
            "[1:v]setpts=PTS-STARTPTS[selected];[stand][selected]concat=n=2:v=1:a=0[out]",
            "-map", "[out]", "-frames:v", str(FRONT_HOLD + FRAMES), "-r", str(FRAME_RATE),
            "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart", str(ROOT / "DOG3_FRONT_STAND_TO_SELECTED_REVIEW.mp4"))

    (ROOT / "frame_map.json").write_text(json.dumps({
        "source": "../assets/incoming/bulldog_3_selected.mp4",
        "fps": FRAME_RATE,
        "sourceFrames": list(range(FRAMES)),
        "selectedMontageFrames": list(range(FRAMES)),
        "selectedMontageDurationSeconds": FRAMES / FRAME_RATE,
        "diagnosticFrontStandHoldFrames": FRONT_HOLD,
        "diagnosticTransitionFrames": FRONT_HOLD + FRAMES,
        "gameFrameSizePx": [207, 116],
        "alphaSelectedGenerated": False,
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
