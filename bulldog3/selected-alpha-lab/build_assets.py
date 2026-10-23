#!/usr/bin/env python3
"""Build review videos from the decoded final SELECTED alpha WebM."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
ALPHA = HERE / "assets/DOG3_SELECTED_ALPHA_121.webm"
FRONT = DOG3 / "idle-alpha-lab/assets/DOG3_FRONT_STAND_ALPHA.png"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FPS = 24
FRAMES = 121
FRONT_HOLD = 8  # diagnostic only
BGS = (("WHITE", "#ffffff"), ("BLACK", "#000000"),
       ("GREEN", "#00df36"), ("BEIGE", "#ddc9a7"))


def run(*args):
    subprocess.run(args, check=True)


def links(directory, frames):
    directory.mkdir()
    for i, file in enumerate(frames):
        (directory / f"f{i:04d}.png").symlink_to(file.resolve())


def four_backgrounds(sequence, output):
    graph = ("[0:v]scale=960:540,format=rgba,split=4[d0][d1][d2][d3];"
             "color=c=white:s=960x540:r=24[b0];[b0][d0]overlay=shortest=1[v0];"
             "color=c=black:s=960x540:r=24[b1];[b1][d1]overlay=shortest=1[v1];"
             "color=c=0x00df36:s=960x540:r=24[b2];[b2][d2]overlay=shortest=1[v2];"
             "color=c=0xddc9a7:s=960x540:r=24[b3];[b3][d3]overlay=shortest=1[v3];"
             "[v0][v1]hstack=inputs=2[top];[v2][v3]hstack=inputs=2[bottom];"
             "[top][bottom]vstack=inputs=2[out]")
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(FPS),
        "-i", str(sequence / "f%04d.png"), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(FRAMES), "-c:v", "libx264", "-preset", "medium", "-crf", "19",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def canvas(path):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    d = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 39)
    body = ImageFont.truetype(FONT, 24)
    d.text((75, 72), "РОККИ · SELECTED ALPHA · РАЗМЕР ЭКРАНА ВЫБОРА", font=title, fill="#202c2e")
    d.rounded_rectangle((660, 280, 1260, 775), radius=32, fill="#f0ebdf", outline="#9c917d", width=3)
    d.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    d.text((75, 940), "Исходный кадр 1276×720 показан как 207×116 px. Это диагностический масштаб, не production-разметка.",
           font=body, fill="#374446")
    im.save(path)


def selection_video(sequence, background, output):
    graph = "[0:v]scale=207:116,format=rgba[dog];[1:v][dog]overlay=856:527[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(FPS),
        "-i", str(sequence / "f%04d.png"), "-loop", "1", "-framerate", str(FPS),
        "-i", str(background), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(FRAMES), "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def seam_video(sequence, output):
    graph = "[0:v]format=rgba[dog];color=c=0xddc9a7:s=1276x720:r=24[bg];[bg][dog]overlay=shortest=1[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(FPS),
        "-i", str(sequence / "f%04d.png"), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(FRAMES + FRONT_HOLD), "-c:v", "libx264", "-preset", "medium",
        "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def comparison(decoded):
    inputs = [FRONT, decoded / "d0000.png", decoded / "d0120.png"]
    labels = ["FRONT_STAND approved", "SELECTED alpha #0", "SELECTED alpha #120"]
    out = Image.new("RGB", (1920, 460), "#eee9de")
    d = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 22)
    for i, (file, label) in enumerate(zip(inputs, labels)):
        im = Image.open(file).convert("RGBA")
        bg = Image.new("RGBA", im.size, "#ddc9a7")
        bg.alpha_composite(im)
        x = 10 + 635 * i
        out.paste(bg.convert("RGB").resize((620, 350), Image.Resampling.LANCZOS), (x, 60))
        d.text((x + 3, 22), label, font=font, fill="#232729")
    out.save(HERE / "FRONT_SELECTED_ALPHA_COMPARISON.png")


def main():
    with tempfile.TemporaryDirectory(prefix="rocky-selected-alpha-") as scratch:
        tmp = Path(scratch)
        decoded = tmp / "decoded"
        decoded.mkdir()
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-c:v", "libvpx-vp9",
            "-i", str(ALPHA), "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0",
            str(decoded / "d%04d.png"))
        files = [decoded / f"d{i:04d}.png" for i in range(FRAMES)]
        if not all(f.is_file() for f in files) or len(list(decoded.glob("d*.png"))) != FRAMES:
            raise ValueError("Final alpha WebM must decode to exactly 121 RGBA frames")
        sequence = tmp / "selected"
        links(sequence, files)
        four_backgrounds(sequence, HERE / "DOG3_SELECTED_ALPHA_FOUR_BACKGROUNDS.mp4")
        bg = tmp / "game-canvas.png"
        canvas(bg)
        selection_video(sequence, bg, HERE / "DOG3_SELECTED_ALPHA_SELECTION_SCALE.mp4")
        seam = tmp / "seam"
        links(seam, [FRONT] * FRONT_HOLD + files)
        seam_video(seam, HERE / "DOG3_FRONT_STAND_TO_SELECTED_ALPHA.mp4")
        comparison(decoded)
    (HERE / "manifest.json").write_text(json.dumps({
        "source": "../assets/incoming/bulldog_3_selected.mp4",
        "approvedMap": "../selected-review/frame_map.json",
        "sourceFrames": FRAMES,
        "fps": FPS,
        "diagnosticFrontHoldFrames": FRONT_HOLD,
        "selectionScaleAssumption": [207, 116],
        "alphaAcceptedByUser": False,
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
