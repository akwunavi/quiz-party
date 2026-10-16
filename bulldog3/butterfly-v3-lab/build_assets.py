#!/usr/bin/env python3
"""Build Rocky BUTTERFLY atlas from approved source RGBA and approved stand.

Only source frames 12..104 are used in their original order at 24 FPS. The
remaining action cells show the already-approved RACE_STAND; V3 still has 121
action cells. No world coordinate or source frame is changed.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
CELL = (178, 100)
COLUMNS = 24
LEAD = 4
SOURCE_START = 12
SOURCE_END = 104
TAIL = 121 - LEAD - (SOURCE_END - SOURCE_START + 1)
MAP = [None] * LEAD + list(range(SOURCE_START, SOURCE_END + 1)) + [None] * TAIL
assert len(MAP) == 121 and TAIL == 24

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--rgba', type=Path, required=True, help='dog_alpha.py work/rgba directory, r0000.png .. r0120.png')
    a = p.parse_args()
    assets = HERE / 'assets'
    assets.mkdir(exist_ok=True)
    stand = Image.open(HERE.parent / 'stop-v3-lab/assets/rocky-race-stand-alpha.png').convert('RGBA')
    source = {n: Image.open(a.rgba / f'r{n:04d}.png').convert('RGBA') for n in range(SOURCE_START, SOURCE_END + 1)}
    if stand.size != (1276, 720) or any(im.size != stand.size for im in source.values()):
        raise ValueError('Expected unchanged 1276x720 source and stand')
    frames = [stand if n is None else source[n] for n in MAP]
    sheet = Image.new('RGBA', (COLUMNS * CELL[0], ((len(frames) + COLUMNS - 1) // COLUMNS) * CELL[1]))
    for i, im in enumerate(frames):
        sheet.paste(im.resize(CELL, Image.Resampling.LANCZOS), ((i % COLUMNS) * CELL[0], (i // COLUMNS) * CELL[1]))
    sheet.save(assets / 'rocky-butterfly.png')
    with tempfile.TemporaryDirectory(prefix='rocky-butterfly-game-alpha-') as tmp:
        d = Path(tmp)
        for i, im in enumerate(frames):
            im.save(d / f'f{i:04d}.png')
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '24', '-i', str(d/'f%04d.png'),
                        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '14',
                        '-auto-alt-ref', '0', '-row-mt', '1', '-cpu-used', '1', '-deadline', 'good',
                        '-metadata:s:v:0', 'alpha_mode=1', str(assets/'rocky-butterfly-alpha-121.webm')], check=True)
    (HERE/'retiming.json').write_text(json.dumps({
        'sourceOriginal': 'assets/DOG3_BUTTERFLY_KLING_V3_ORIGINAL.mp4',
        'sourceFPS': 24, 'sourceFrameCount': 121,
        'usedSourceFramesInclusive': [SOURCE_START, SOURCE_END],
        'gameWindowFrames': 121, 'leadStandFrames': LEAD, 'tailStandFrames': TAIL,
        'gameFrameToSource': MAP,
        'scaleChanged': False, 'sourceMotionOrderChanged': False,
        'worldPositionChanged': False, 'spriteOffset': [0, 0],
    }, indent=2) + '\n')
    (HERE/'manifest.json').write_text(json.dumps({
        'cellWidth': CELL[0], 'cellHeight': CELL[1], 'columns': COLUMNS,
        'clips': {'BUTTERFLY': {'file': 'assets/rocky-butterfly.png', 'frames': 121}},
    }, indent=2) + '\n')

if __name__ == '__main__':
    main()
