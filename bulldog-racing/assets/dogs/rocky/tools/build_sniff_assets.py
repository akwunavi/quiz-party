#!/usr/bin/env python3
"""Apply the accepted f28ecee visual montage to the existing alpha output."""
import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'sniff-pee-montage-review/assets/DOG3_SNIFF_PEE_CLIP1_STAND_TO_POSE_ORIGINAL.mp4'
STAND = ROOT.parent / 'stop-v3-lab/assets/rocky-race-stand-alpha.png'
CELL = (178, 100)
COLUMNS = 24
# Exact f28ecee source frame order; None is approved RACE_STAND.
FRAME_MAP = list(range(121)) + list(range(119, 71, -1)) + list(range(7, -1, -1)) + [None] * 63
assert len(FRAME_MAP) == 240


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, required=True, help='dog_alpha.py work/rgba with r0000.png..r0120.png')
    a = p.parse_args()
    assets = ROOT / 'assets'
    assets.mkdir(exist_ok=True)
    stand = Image.open(STAND).convert('RGBA')
    source = {i: Image.open(a.rgba / f'r{i:04d}.png').convert('RGBA') for i in range(121)}
    if stand.size != (1276, 720) or any(im.size != stand.size for im in source.values()):
        raise ValueError('Expected 1276x720 approved frames')
    sheet = Image.new('RGBA', (COLUMNS * CELL[0], 10 * CELL[1]))
    for i, n in enumerate(FRAME_MAP):
        image = stand if n is None else source[n]
        sheet.paste(image.resize(CELL, Image.Resampling.LANCZOS), ((i % COLUMNS) * CELL[0], (i // COLUMNS) * CELL[1]))
    sheet.save(assets / 'rocky-sniff-pee.png')

    with tempfile.TemporaryDirectory(prefix='rocky-sniff-alpha-') as tmp:
        d = Path(tmp)
        for i, n in enumerate(FRAME_MAP):
            src = STAND if n is None else a.rgba / f'r{n:04d}.png'
            dst = d / f'f{i:04d}.png'
            try:
                os.link(src, dst)
            except OSError:
                shutil.copyfile(src, dst)
        subprocess.run([
            'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '24', '-i', str(d/'f%04d.png'),
            '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '14',
            '-auto-alt-ref', '0', '-row-mt', '1', '-cpu-used', '1', '-deadline', 'good',
            '-metadata:s:v:0', 'alpha_mode=1', str(assets/'DOG3_SNIFF_PEE_ALPHA_240.webm'),
        ], check=True)
    (ROOT/'retiming.json').write_text(json.dumps({
        'acceptedMontageCommit': 'f28ecee',
        'source': str(SOURCE.relative_to(ROOT.parent.parent)),
        'sourceFPS': 24,
        'visualFrames': 240,
        'visualDurationSeconds': 10,
        'gameFrameToSource': FRAME_MAP,
        'spriteOffset': [0, 0],
        'scaleChanged': False,
        'motionOrderChanged': False,
    }, indent=2) + '\n')
    (ROOT/'manifest.json').write_text(json.dumps({
        'cellWidth': CELL[0], 'cellHeight': CELL[1], 'columns': COLUMNS,
        'clips': {'SNIFF_PEE': {'file': 'assets/rocky-sniff-pee.png', 'frames': 240}},
    }, indent=2) + '\n')


if __name__ == '__main__':
    main()
