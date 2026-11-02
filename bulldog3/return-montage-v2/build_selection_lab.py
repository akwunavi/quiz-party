#!/usr/bin/env python3
"""Isolated selection lab: IDLE B -> SELECTED -> RETURN D -> IDLE B."""
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
ASSETS = HERE / "assets"
IDLE = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm"
SELECTED = DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
RETURN = ASSETS / "DOG3_RETURN_D_ALPHA_97.webm"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
PHASES = (0, 1, 60, 120, 180, 239)
FPS = 24


def run(*args):
    subprocess.run(args, check=True)


def decode(src, dest, count):
    dest.mkdir()
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-c:v", "libvpx-vp9",
        "-i", str(src), "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0",
        str(dest / "f%04d.png"))
    files = [dest / f"f{i:04d}.png" for i in range(count)]
    assert all(p.exists() for p in files), src
    assert len(list(dest.glob("f*.png"))) == count
    return files


def canvas(path, phase, wait):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    draw = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 39)
    body = ImageFont.truetype(FONT, 25)
    draw.text((75, 72), f"РОККИ · ЦЕПОЧКА ВЫБОРА · ФАЗА IDLE #{phase}",
              font=title, fill="#202c2e")
    draw.text((75, 145), "IDLE B → SELECTED → RETURN D → IDLE B",
              font=body, fill="#374446")
    draw.rounded_rectangle((660, 280, 1260, 775), radius=32,
                           fill="#f0ebdf", outline="#9c917d", width=3)
    draw.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    draw.text((75, 940),
              f"Подтверждение выбора: 1,00 с · ожидание стойки: {wait/24:.3f} с · размер: 207×116 px",
              font=body, fill="#374446")
    im.save(path)


def stage(start, end, label):
    if start > end:
        return ""
    return (f",drawtext=fontfile={FONT}:text='{label}':x=75:y=220:"
            f"fontsize=31:fontcolor=0x273c36:enable='between(n,{start},{end})'")


def render(seq, bg, length, boundaries, out):
    pre, waiting, selected, ret = boundaries
    graph = ("[0:v]scale=207:116,format=rgba[dog];"
             "[1:v][dog]overlay=856:527[base];[base]format=yuv420p")
    graph += stage(0, pre-1, "IDLE before selection")
    graph += stage(pre, pre+waiting-1, "CHOICE CONFIRMED - WAIT FOR STAND")
    graph += stage(pre+waiting, pre+waiting+selected-1, "SELECTED")
    graph += stage(pre+waiting+selected, pre+waiting+selected+ret-1, "RETURN D")
    graph += stage(pre+waiting+selected+ret, length-1, "IDLE B") + "[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
        "-i", str(seq / "f%04d.png"), "-loop", "1", "-framerate", "24", "-i", str(bg),
        "-filter_complex", graph, "-map", "[out]", "-frames:v", str(length),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(out))


def main():
    manifest = {"fps": FPS, "selectionScalePx": [207, 116],
                "sourceAssetsUnchanged": True, "scenarios": {}}
    with tempfile.TemporaryDirectory(prefix="dog3-selection-chain-") as scratch:
        tmp = Path(scratch)
        idle = decode(IDLE, tmp / "idle", 240)
        selected = decode(SELECTED, tmp / "selected", 121)
        ret = decode(RETURN, tmp / "return", 97)
        for phase in PHASES:
            # One second of visible IDLE before confirmation, including its last frame.
            pre_ids = [(phase-24+i) % 240 for i in range(24)]
            wait_ids = list(range(phase, 240)) if phase else []
            frames = [idle[i] for i in pre_ids + wait_ids] + selected + ret + idle
            seq = tmp / f"phase_{phase}"
            seq.mkdir()
            for n, source in enumerate(frames):
                (seq / f"f{n:04d}.png").symlink_to(source.resolve())
            bg = tmp / f"bg_{phase}.png"
            canvas(bg, phase, len(wait_ids))
            out = HERE / f"DOG3_SELECTION_CHAIN_TRIGGER_{phase:03d}_GAME.mp4"
            render(seq, bg, len(frames), (24, len(wait_ids), 121, 97), out)
            start_selected = 24 + len(wait_ids)
            start_return = start_selected + 121
            start_idle = start_return + 97
            manifest["scenarios"][str(phase)] = {
                "preIdleSourceFrames": pre_ids,
                "triggerOutputFrame": 24,
                "pendingIdleSourceFrames": [phase, 239] if wait_ids else [],
                "pendingFrames": len(wait_ids),
                "selectedOutputFrames": [start_selected, start_return-1],
                "selectedSourceFrames": [0, 120],
                "returnOutputFrames": [start_return, start_idle-1],
                "returnSourceFrames": [120, 24, -1],
                "finalIdleOutputFrames": [start_idle, len(frames)-1],
                "finalIdleSourceFrames": [0, 239],
                "totalFrames": len(frames), "durationSeconds": len(frames)/24,
                "output": out.name,
            }
    (HERE / "SELECTION_LAB_MAP.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
