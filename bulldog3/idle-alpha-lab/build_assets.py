#!/usr/bin/env python3
"""Build Rocky IDLE B from the approved 240-frame map and existing matte frames."""
import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
APPROVED = HERE.parent / "idle-full-review/frame_map.json"
SOURCE = HERE.parent / "assets/incoming/bulldog_3_idle.mp4"
SELECTED = HERE.parent / "assets/incoming/bulldog_3_selected.mp4"
ASSETS = HERE / "assets"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BGS = (("WHITE", "#ffffff"), ("BLACK", "#000000"),
       ("GREEN", "#00df36"), ("BEIGE", "#ddc9a7"))


def run(*args):
    subprocess.run(args, check=True)


def maps():
    approved = json.loads(APPROVED.read_text())
    assert approved["fps"] == 24
    m = approved["B"]["sourceFramesPerCycle"]
    assert m == list(range(121)) + list(range(119, 0, -1)) and len(m) == 240
    return m


def encode_webm(sequence, output, frames):
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
        "-i", str(sequence / "f%04d.png"), "-frames:v", str(frames), "-c:v", "libvpx-vp9",
        "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "14", "-auto-alt-ref", "0",
        "-row-mt", "1", "-cpu-used", "1", "-deadline", "good",
        "-metadata:s:v:0", "alpha_mode=1", str(output))


def sequence_links(directory, rgba, source_frames, pattern="r%04d.png"):
    directory.mkdir()
    for i, n in enumerate(source_frames):
        source = (rgba / (pattern % n)).resolve()
        if not source.is_file():
            raise FileNotFoundError(source)
        (directory / f"f{i:04d}.png").symlink_to(source)


def qa_video(sequence, output, frames):
    graph = ("[0:v]scale=960:540,format=rgba,split=4[d0][d1][d2][d3];"
             "color=c=white:s=960x540:r=24[b0];[b0][d0]overlay=shortest=1[v0];"
             "color=c=black:s=960x540:r=24[b1];[b1][d1]overlay=shortest=1[v1];"
             "color=c=0x00df36:s=960x540:r=24[b2];[b2][d2]overlay=shortest=1[v2];"
             "color=c=0xddc9a7:s=960x540:r=24[b3];[b3][d3]overlay=shortest=1[v3];"
             "[v0][v1]hstack=inputs=2[top];[v2][v3]hstack=inputs=2[bottom];"
             "[top][bottom]vstack=inputs=2[out]")
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
        "-i", str(sequence / "f%04d.png"), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(frames), "-c:v", "libx264", "-preset", "medium", "-crf", "19",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output))


def game_canvas(path):
    image = Image.new("RGB", (1920, 1080), (223, 215, 196))
    draw = ImageDraw.Draw(image)
    title = ImageFont.truetype(FONT, 38)
    small = ImageFont.truetype(FONT, 23)
    draw.text((80, 60), "РОККИ · IDLE B · ЭКРАН ВЫБОРА — МАСШТАБ ДЛЯ ПРОВЕРКИ",
              fill=(38, 45, 47), font=title)
    draw.rounded_rectangle((665, 285, 1255, 770), radius=32,
                           fill=(239, 234, 221), outline=(142, 132, 113), width=3)
    draw.text((790, 320), "РОККИ", fill=(44, 49, 51), font=title)
    draw.text((87, 940), "Исходный кадр 1276×720 показан в рамке 207×116 px. Это проверочный масштаб, не production-разметка.",
              fill=(69, 73, 71), font=small)
    image.save(path)


def gameplay_video(sequence, output, canvas, frames):
    graph = "[0:v]scale=207:116,format=rgba[dog];[1:v][dog]overlay=856:527[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
        "-i", str(sequence / "f%04d.png"), "-loop", "1", "-framerate", "24", "-i", str(canvas),
        "-filter_complex", graph, "-map", "[out]", "-frames:v", str(frames),
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(output))


def comparison(front_alpha, selected_rgb):
    front = Image.open(front_alpha).convert("RGBA")
    selected = Image.open(selected_rgb).convert("RGB")
    if front.size != (1276, 720) or selected.size != front.size:
        raise ValueError("Expected original frame size 1276x720")
    labels = ("FRONT_STAND alpha #0", "IDLE alpha #0", "SELECTED original #0")
    thumbs = []
    for im in (front, front, selected):
        bg = Image.new("RGB", front.size, "#ddc9a7")
        if im.mode == "RGBA":
            bg.paste(im, (0, 0), im)
        else:
            bg.paste(im)
        thumbs.append(bg.resize((620, 350), Image.Resampling.LANCZOS))
    out = Image.new("RGB", (1920, 465), (238, 234, 222))
    draw = ImageDraw.Draw(out)
    font = ImageFont.truetype(FONT, 23)
    for i, (im, label) in enumerate(zip(thumbs, labels)):
        x = 10 + 635 * i
        out.paste(im, (x, 65))
        draw.text((x + 4, 23), label, fill=(35, 39, 42), font=font)
    draw.text((20, 430), "SELECTED показан с исходным фоном; этот ролик здесь не обрабатывается.",
              fill=(56, 60, 63), font=ImageFont.truetype(FONT, 20))
    out.save(HERE / "FRONT_STAND_IDLE_SELECTED_COMPARISON.png")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--rgba", required=True, type=Path)
    args = parser.parse_args()
    source_map = maps()
    ASSETS.mkdir(exist_ok=True)
    front = ASSETS / "DOG3_FRONT_STAND_ALPHA.png"
    shutil.copyfile(args.rgba / "r0000.png", front)
    with tempfile.TemporaryDirectory(prefix="rocky-idle-build-") as tmp_name:
        tmp = Path(tmp_name)
        cycle = tmp / "cycle"
        sequence_links(cycle, args.rgba, source_map)
        encode_webm(cycle, ASSETS / "DOG3_IDLE_B_ALPHA_240.webm", 240)
        decoded = tmp / "decoded"
        decoded.mkdir()
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-c:v", "libvpx-vp9",
            "-i", str(ASSETS / "DOG3_IDLE_B_ALPHA_240.webm"), "-pix_fmt", "rgba",
            "-vsync", "0", "-start_number", "0", str(decoded / "d%04d.png"))
        repeated = tmp / "repeated"
        sequence_links(repeated, decoded, list(range(240)) * 3, "d%04d.png")
        qa_video(repeated, HERE / "DOG3_IDLE_B_THREE_CYCLES_FOUR_BACKGROUNDS.mp4", 720)
        canvas = tmp / "game-canvas.png"
        game_canvas(canvas)
        gameplay_video(repeated, HERE / "DOG3_IDLE_B_THREE_CYCLES_SELECTION_SCALE.mp4", canvas, 720)
        selected = tmp / "selected-first.png"
        run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(SELECTED),
            "-frames:v", "1", str(selected))
        comparison(front, selected)
    (HERE / "manifest.json").write_text(json.dumps({
        "source": str(SOURCE.relative_to(HERE.parent)),
        "sourceFrameCount": 121,
        "fps": 24,
        "approvedMap": "../idle-full-review/frame_map.json#B.sourceFramesPerCycle",
        "cycleFrames": 240,
        "previewRepeats": 3,
        "previewFrameCount": 720,
        "selectionScaleAssumption": [207, 116],
        "sourceVideoChanged": False,
        "selectedVideoChanged": False,
    }, indent=2) + "\n")


if __name__ == "__main__":
    main()
