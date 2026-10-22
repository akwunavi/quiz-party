#!/usr/bin/env python3
"""Build Rocky ROLL V2 alpha atlas in the unchanged 145-frame V3 window."""
import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'roll-generation-v2/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4'
STAND = ROOT.parent / 'stop-v3-lab/assets/rocky-race-stand-alpha.png'
CELL = (178, 100)
COLUMNS = 24
WINDOW = 145


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, required=True)
    p.add_argument('--first', type=int, default=8)
    p.add_argument('--last', type=int, default=120)
    a = p.parse_args()
    if not 0 <= a.first <= a.last <= 120:
        raise ValueError('Frame range must be inside the original 121-frame clip')
    frame_map = list(range(a.first, a.last + 1))
    if len(frame_map) > WINDOW:
        raise ValueError('ROLL exceeds Race V3 window')
    frame_map += [None] * (WINDOW - len(frame_map))
    stand = Image.open(STAND).convert('RGBA')
    source = {i: Image.open(a.rgba / f'r{i:04d}.png').convert('RGBA')
              for i in range(a.first, a.last + 1)}
    if stand.size != (1276, 720) or any(im.size != stand.size for im in source.values()):
        raise ValueError('Expected approved 1276x720 frames')
    assets = ROOT / 'assets'
    assets.mkdir(exist_ok=True)
    sheet = Image.new('RGBA', (COLUMNS * CELL[0], 7 * CELL[1]))
    for i, n in enumerate(frame_map):
        image = stand if n is None else source[n]
        sheet.paste(image.resize(CELL, Image.Resampling.LANCZOS),
                    ((i % COLUMNS) * CELL[0], (i // COLUMNS) * CELL[1]))
    sheet.save(assets / 'rocky-roll.png')
    with tempfile.TemporaryDirectory(prefix='rocky-roll-alpha-') as tmp:
        d = Path(tmp)
        for i, n in enumerate(frame_map):
            src = STAND if n is None else a.rgba / f'r{n:04d}.png'
            dst = d / f'f{i:04d}.png'
            try:
                os.link(src, dst)
            except OSError:
                shutil.copyfile(src, dst)
        subprocess.run([
            'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '24',
            '-i', str(d / 'f%04d.png'), '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
            '-b:v', '0', '-crf', '14', '-auto-alt-ref', '0', '-row-mt', '1',
            '-cpu-used', '1', '-deadline', 'good', '-metadata:s:v:0', 'alpha_mode=1',
            str(assets / 'DOG3_ROLL_V2_ALPHA_145.webm'),
        ], check=True)
    (ROOT / 'retiming.json').write_text(json.dumps({
        'approvedSource': str(SOURCE.relative_to(ROOT.parent.parent)),
        'sourceFPS': 24,
        'sourceRangeInclusive': [a.first, a.last],
        'visualFrames': WINDOW,
        'visualDurationSeconds': WINDOW / 24,
        'gameFrameToSource': frame_map,
        'spriteOffset': [0, 0],
        'scaleChanged': False,
        'motionRetimed': False,
    }, indent=2) + '\n')
    (ROOT / 'manifest.json').write_text(json.dumps({
        'cellWidth': CELL[0], 'cellHeight': CELL[1], 'columns': COLUMNS,
        'clips': {'ROLL': {'file': 'assets/rocky-roll.png', 'frames': WINDOW}},
    }, indent=2) + '\n')


if __name__ == '__main__':
    main()
