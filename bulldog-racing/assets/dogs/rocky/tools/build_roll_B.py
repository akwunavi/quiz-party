#!/usr/bin/env python3
"""Assemble Rocky ROLL B from existing transparent source frames; no new matting."""
import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCE_ALPHA = ROOT / 'assets/DOG3_ROLL_V2_SOURCE_ALPHA_121.webm'
STAND = ROOT.parent / 'stop-v3-lab/assets/rocky-race-stand-alpha.png'
CELL = (178, 100)
COLUMNS = 24
FRAME_MAP = [None] * 8 + list(range(121)) + [None] * 16
assert len(FRAME_MAP) == 145


def build(rgba):
    stand = Image.open(STAND).convert('RGBA')
    sources = {n: Image.open(rgba / f'r{n:04d}.png').convert('RGBA') for n in range(121)}
    if stand.size != (1276, 720) or any(im.size != stand.size for im in sources.values()):
        raise ValueError('Unexpected source frame resolution')
    assets = ROOT / 'assets'
    assets.mkdir(exist_ok=True)
    atlas = Image.new('RGBA', (COLUMNS * CELL[0], 7 * CELL[1]))
    for i, n in enumerate(FRAME_MAP):
        im = stand if n is None else sources[n]
        atlas.paste(im.resize(CELL, Image.Resampling.LANCZOS),
                    ((i % COLUMNS) * CELL[0], (i // COLUMNS) * CELL[1]))
    atlas.save(assets / 'rocky-roll-B.png')
    with tempfile.TemporaryDirectory(prefix='rocky-roll-b-') as tmp:
        d = Path(tmp)
        for i, n in enumerate(FRAME_MAP):
            src = STAND if n is None else rgba / f'r{n:04d}.png'
            dst = d / f'f{i:04d}.png'
            try:
                os.link(src, dst)
            except OSError:
                shutil.copyfile(src, dst)
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                        '-framerate', '24', '-i', str(d / 'f%04d.png'),
                        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0',
                        '-crf', '14', '-auto-alt-ref', '0', '-row-mt', '1', '-cpu-used', '1',
                        '-deadline', 'good', '-metadata:s:v:0', 'alpha_mode=1',
                        str(assets / 'DOG3_ROLL_V2_B_ALPHA_145.webm')], check=True)
    (ROOT / 'retiming.json').write_text(json.dumps({
        'source': '../roll-generation-v2/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4',
        'sourceAlpha': 'assets/DOG3_ROLL_V2_SOURCE_ALPHA_121.webm',
        'sourceFPS': 24,
        'visualFrames': 145,
        'standBeforeFrames': 8,
        'standAfterFrames': 16,
        'gameFrameToSource': FRAME_MAP,
        'motionRetimed': False,
        'spriteOffset': [0, 0],
        'scaleChanged': False,
    }, indent=2) + '\n')


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, help='Original 121 lossless RGBA frames from the approved pipeline')
    a = p.parse_args()
    if a.rgba is not None:
        build(a.rgba)
    else:
        with tempfile.TemporaryDirectory(prefix='rocky-roll-source-') as tmp:
            d = Path(tmp)
            subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                            '-c:v', 'libvpx-vp9', '-i', str(SOURCE_ALPHA),
                            '-pix_fmt', 'rgba', '-vsync', '0', str(d / 'd%04d.png')], check=True)
            for n in range(121):
                (d / f'd{n+1:04d}.png').rename(d / f'r{n:04d}.png')
            build(d)


if __name__ == '__main__':
    main()
