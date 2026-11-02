#!/usr/bin/env python3
"""Build full Rocky selection chains using nearby compatible IDLE exit poses."""
import csv
import json
import statistics
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
IDLE = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm"
SELECTED = DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
RETURN = DOG3 / "return-montage-v2/assets/DOG3_RETURN_D_ALPHA_97.webm"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FPS = 24
WINDOWS = ((0, 7), (36, 58), (182, 204), (233, 239))
SCENARIOS = (0, 1, 8, 36, 58, 59, 77, 80, 100, 119, 120, 150, 205, 239)


def run(*args):
    subprocess.run(args, check=True)


def decide(phase):
    assert 0 <= phase < 240
    if any(lo <= phase <= hi for lo, hi in WINDOWS):
        return "direct", phase, []
    if 8 <= phase <= 35:
        return "forward", 36, list(range(phase+1, 37))
    if 59 <= phase <= 61:
        return "reverse", 58, list(range(phase-1, 57, -1))
    if 62 <= phase <= 74:
        return "finish_to_74_then_reverse", 58, list(range(phase+1, 75)) + \
            list(range(73, 57, -1))
    if 75 <= phase <= 76:
        return "reverse", 58, list(range(phase-1, 57, -1))
    if 77 <= phase <= 113:
        return "finish_to_113_then_reverse", 58, list(range(phase+1, 114)) + \
            list(range(112, 57, -1))
    if 114 <= phase <= 119:
        return "reverse", 58, list(range(phase-1, 57, -1))
    if 120 <= phase <= 181:
        return "forward", 182, list(range(phase+1, 183))
    if 205 <= phase <= 232:
        return "forward", 233, list(range(phase+1, 234))
    raise AssertionError(phase)


def forward_only_wait(phase):
    if any(lo <= phase <= hi for lo, hi in WINDOWS):
        return 0
    for lo, _ in WINDOWS:
        if phase < lo:
            return lo - phase
    return 240 - phase


def decode(src, dest, count):
    dest.mkdir()
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-c:v", "libvpx-vp9",
        "-i", str(src), "-pix_fmt", "rgba", "-vsync", "0", "-start_number", "0",
        str(dest / "f%04d.png"))
    frames = [dest / f"f{i:04d}.png" for i in range(count)]
    assert all(p.is_file() for p in frames)
    assert len(list(dest.glob("f*.png"))) == count
    return frames


def make_canvas(path, phase, method, wait):
    im = Image.new("RGB", (1920, 1080), "#e2d9c6")
    draw = ImageDraw.Draw(im)
    title = ImageFont.truetype(FONT, 39)
    body = ImageFont.truetype(FONT, 25)
    draw.text((75, 72), f"РОККИ · ВЫХОД ИЗ IDLE · КАДР #{phase}",
              font=title, fill="#202c2e")
    draw.text((75, 145), "IDLE B → SELECTED → RETURN D → IDLE B",
              font=body, fill="#374446")
    draw.rounded_rectangle((660, 280, 1260, 775), radius=32,
                           fill="#f0ebdf", outline="#9c917d", width=3)
    draw.text((795, 320), "РОККИ", font=title, fill="#202c2e")
    draw.text((75, 940),
              f"Выбор после 1,00 с · выход: {method} · ожидание: {wait/24:.3f} с · размер 207×116 px",
              font=body, fill="#374446")
    im.save(path)


def label(start, stop, text):
    if start >= stop:
        return ""
    return (f",drawtext=fontfile={FONT}:text='{text}':x=75:y=220:"
            f"fontsize=31:fontcolor=0x273c36:enable='between(n,{start},{stop-1})'")


def render(sequence, canvas, out, total, pending):
    selected_start = 24 + pending
    return_start = selected_start + 121
    idle_start = return_start + 97
    graph = ("[0:v]scale=207:116,format=rgba[dog];"
             "[1:v][dog]overlay=856:527[base];[base]format=yuv420p")
    graph += label(0, 24, "IDLE before choice")
    graph += label(24, selected_start, "CHOICE CONFIRMED - FINISH MOTION")
    graph += label(selected_start, return_start, "SELECTED")
    graph += label(return_start, idle_start, "RETURN D")
    graph += label(idle_start, total, "IDLE B") + "[out]"
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-framerate", "24",
        "-i", str(sequence / "f%04d.png"), "-loop", "1", "-framerate", "24",
        "-i", str(canvas), "-filter_complex", graph, "-map", "[out]",
        "-frames:v", str(total), "-c:v", "libx264", "-preset", "veryfast",
        "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out))


def delay_map():
    rows = []
    for phase in range(240):
        method, target, path = decide(phase)
        rows.append({"phase": phase, "sourceFrame": phase if phase <= 120 else 240-phase,
                     "method": method, "entryPhase": target,
                     "entrySourceFrame": target if target <= 120 else 240-target,
                     "waitFrames": len(path), "waitSeconds": len(path)/FPS,
                     "forwardOnlyWaitFrames": forward_only_wait(phase)})
    waits = [x["waitFrames"] for x in rows]
    baseline = [x["forwardOnlyWaitFrames"] for x in rows]
    summary = {
        "maxWaitFrames": max(waits), "maxWaitSeconds": max(waits)/FPS,
        "worstPhases": [x["phase"] for x in rows if x["waitFrames"] == max(waits)],
        "meanWaitFrames": statistics.mean(waits),
        "meanWaitSeconds": statistics.mean(waits)/FPS,
        "casesOver2_5Seconds": sum(n > 60 for n in waits),
        "baselineForwardOnly": {"maxWaitFrames": max(baseline),
                                "meanWaitFrames": statistics.mean(baseline),
                                "casesOver2_5Seconds": sum(n > 60 for n in baseline)},
    }
    return rows, summary


def main():
    rows, summary = delay_map()
    with (HERE / "DELAY_MAP.csv").open("w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=rows[0].keys(), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    manifest = {"fps": FPS, "approvedIdleBUnchanged": True,
                "compatibleWindows": [list(x) for x in WINDOWS],
                "delaySummary": summary, "delayByPhase": rows, "scenarios": {}}
    with tempfile.TemporaryDirectory(prefix="dog3-idle-exit-") as scratch:
        tmp = Path(scratch)
        idle = decode(IDLE, tmp / "idle", 240)
        selected = decode(SELECTED, tmp / "selected", 121)
        ret = decode(RETURN, tmp / "return", 97)
        for phase in SCENARIOS:
            method, target, pending = decide(phase)
            # The trigger frame itself is visible at confirmation.
            pre = [(phase-23+i) % 240 for i in range(24)]
            assert pre[-1] == phase
            seq = [idle[n] for n in pre+pending] + selected + ret + idle
            directory = tmp / f"sequence_{phase}"
            directory.mkdir()
            for n, source in enumerate(seq):
                (directory / f"f{n:04d}.png").symlink_to(source.resolve())
            bg = tmp / f"canvas_{phase}.png"
            make_canvas(bg, phase, method, len(pending))
            output = HERE / f"DOG3_IDLE_EXIT_TRIGGER_{phase:03d}_GAME.mp4"
            render(directory, bg, output, len(seq), len(pending))
            s0 = 24 + len(pending)
            r0 = s0 + 121
            i0 = r0 + 97
            manifest["scenarios"][str(phase)] = {
                "preIdlePhases": pre, "triggerAtOutputFrame": 23,
                "method": method, "entryPhase": target,
                "pendingIdlePhases": pending, "waitFrames": len(pending),
                "selectedOutputFrames": [s0, r0-1],
                "returnOutputFrames": [r0, i0-1],
                "finalIdleOutputFrames": [i0, len(seq)-1],
                "totalFrames": len(seq), "durationSeconds": len(seq)/FPS,
                "output": output.name,
            }
    (HERE / "DELAY_MAP.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
