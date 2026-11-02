#!/usr/bin/env python3
"""Measure all 240 IDLE poses against SELECTED #0 and make visual seam sheet."""
import json
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
DOG3 = HERE.parent
IDLE = DOG3 / "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm"
SELECTED = DOG3 / "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SAMPLES = (0, 7, 8, 35, 36, 58, 59, 181, 182, 204, 205, 232, 233, 239)


def decode(src, dest):
    dest.mkdir()
    subprocess.run(("ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                    "-c:v", "libvpx-vp9", "-i", str(src), "-pix_fmt", "rgba",
                    "-vsync", "0", "-start_number", "0",
                    str(dest / "f%04d.png")), check=True)


def bbox(mask):
    y, x = np.where(mask)
    return [int(x.min()), int(y.min()), int(x.max()), int(y.max())]


def composite(frame):
    bg = np.array([221, 201, 167], dtype=np.float32)
    alpha = frame[:, :, 3:4].astype(np.float32) / 255
    return frame[:, :, :3].astype(np.float32) * alpha + bg * (1-alpha)


def main():
    with tempfile.TemporaryDirectory(prefix="dog3-entry-analysis-") as scratch:
        tmp = Path(scratch)
        decode(IDLE, tmp/"idle")
        decode(SELECTED, tmp/"selected")
        selected = np.asarray(Image.open(tmp/"selected/f0000.png").convert("RGBA"))
        target_mask = selected[:, :, 3] > 128
        target_rgb = composite(selected)
        records = []
        prev_rgb = None
        for phase in range(240):
            file = tmp/"idle"/f"f{phase:04d}.png"
            frame = np.asarray(Image.open(file).convert("RGBA"))
            mask = frame[:, :, 3] > 128
            rgb = composite(frame)
            records.append({
                "phase": phase, "sourceFrame": phase if phase <= 120 else 240-phase,
                "silhouetteIoUWithSelected0": round(float((mask & target_mask).sum() /
                                                            (mask | target_mask).sum()), 5),
                "bbox": bbox(mask),
                "faceMeanAbsRgbDifference": round(float(np.abs(rgb[120:410, 400:810] -
                                                               target_rgb[120:410, 400:810]).mean()), 3),
                "pawMeanAbsRgbDifference": round(float(np.abs(rgb[500:710, 400:900] -
                                                              target_rgb[500:710, 400:900]).mean()), 3),
                "previousFrameMeanAbsRgbDifference": None if prev_rgb is None else
                    round(float(np.abs(rgb[0:710, 350:950]-prev_rgb[0:710, 350:950]).mean()), 3),
            })
            prev_rgb = rgb
        (HERE/"ENTRY_METRICS.json").write_text(json.dumps(records, indent=2)+"\n")

        cols, w, h = 4, 520, 330
        points = [("SELECTED #0", tmp/"selected/f0000.png")]
        points.extend((f"IDLE B #{n}", tmp/"idle"/f"f{n:04d}.png") for n in SAMPLES)
        out = Image.new("RGB", (cols*w, ((len(points)+cols-1)//cols)*h), "#eee6d8")
        draw = ImageDraw.Draw(out)
        font = ImageFont.truetype(FONT, 23)
        for i, (label, file) in enumerate(points):
            dog = Image.open(file).convert("RGBA")
            bg = Image.new("RGBA", dog.size, "#ddc9a7")
            bg.alpha_composite(dog)
            x, y = (i % cols)*w, (i // cols)*h
            out.paste(bg.convert("RGB").resize((w, h-35)), (x, y+35))
            draw.text((x+5, y+5), label, font=font, fill="#24282a")
        out.save(HERE/"ENTRY_POSE_CONTACT.jpg", quality=92)

        entries = (0, 7, 36, 58, 182, 204, 233, 239)
        width, height = 460, 278
        seams = Image.new("RGB", (3*width, len(entries)*height), "#eee6d8")
        sd = ImageDraw.Draw(seams)
        for row, phase in enumerate(entries):
            series = ((f"IDLE #{(phase-1)%240}", tmp/"idle"/f"f{(phase-1)%240:04d}.png"),
                      (f"IDLE #{phase}", tmp/"idle"/f"f{phase:04d}.png"),
                      ("SELECTED #0", tmp/"selected/f0000.png"))
            for col, (label, file) in enumerate(series):
                dog = Image.open(file).convert("RGBA")
                bg = Image.new("RGBA", dog.size, "#ddc9a7")
                bg.alpha_composite(dog)
                x, y = col*width, row*height
                seams.paste(bg.convert("RGB").resize((width,height-32)), (x,y+32))
                sd.text((x+5,y+5), label, font=font, fill="#24282a")
        seams.save(HERE/"ENTRY_SEAM_PAIRS.png")


if __name__ == "__main__":
    main()
