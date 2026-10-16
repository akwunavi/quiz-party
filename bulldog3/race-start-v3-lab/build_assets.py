#!/usr/bin/env python3
"""Build Rocky START sprites from approved Kling frames and existing RUN alpha.

No pixel synthesis, morphing, or world-position adjustment. The 40-frame
START sheet compensates for Race V3's variable sheet sampling so source
frames 18..41 play at their original 24 fps over the one-second START.
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
START_SOURCE = [18 + i // 3 for i in range(24)] + list(range(26, 42))
RUN_SOURCE = list(range(52, 63)) + list(range(63, 73)) + [61, 62]


def sheet(frames, path):
    out = Image.new('RGBA', (COLUMNS * CELL[0], ((len(frames) + COLUMNS - 1) // COLUMNS) * CELL[1]))
    for i, im in enumerate(frames):
        out.paste(im.resize(CELL, Image.Resampling.LANCZOS), ((i % COLUMNS) * CELL[0], (i // COLUMNS) * CELL[1]))
    out.save(path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--start-rgba', type=Path, required=True, help='pipeline rgba/r0018.png ... r0041.png')
    parser.add_argument('--run-frames', type=Path, required=True, help='decoded approved RUN alpha-v2, source-numbered 052.png ... 072.png')
    args = parser.parse_args()
    assets = HERE / 'assets'
    assets.mkdir(exist_ok=True)
    start = {n: Image.open(args.start_rgba / f'r{n:04d}.png').convert('RGBA') for n in range(18, 42)}
    run = {n: Image.open(args.run_frames / f'{n:03d}.png').convert('RGBA') for n in range(52, 73)}
    stand = Image.open(HERE.parent / 'stop-v3-lab/assets/rocky-race-stand-alpha.png').convert('RGBA')
    sheet([stand], assets / 'rocky-base.png')
    sheet([start[n] for n in START_SOURCE], assets / 'rocky-start.png')
    sheet([run[n] for n in RUN_SOURCE], assets / 'rocky-run.png')
    with tempfile.TemporaryDirectory(prefix='rocky-start-alpha-') as tmp:
        frames = Path(tmp)
        for i, n in enumerate(range(18, 42)):
            start[n].save(frames / f'f{i:04d}.png')
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '24', '-i', str(frames / 'f%04d.png'),
                        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '14', '-auto-alt-ref', '0',
                        '-row-mt', '1', '-cpu-used', '1', '-deadline', 'good', '-metadata:s:v:0', 'alpha_mode=1',
                        str(assets / 'rocky-race-start-alpha-24.webm')], check=True)
    (HERE / 'retiming.json').write_text(json.dumps({
        'sourceFramesInclusive': [18, 41], 'sourceFPS': 24, 'startWindowSeconds': 1,
        'startSheetSourceFrames': START_SOURCE, 'runSheetSourceFrames': RUN_SOURCE,
        'firstRunSourceFrame': 52, 'runLoopSourceFrames': list(range(61, 73)),
        'localSpriteOffset': [0, 0], 'worldPositionChanged': False,
    }, indent=2) + '\n')
    (HERE / 'manifest.json').write_text(json.dumps({
        'cellWidth': CELL[0], 'cellHeight': CELL[1], 'columns': COLUMNS,
        'clips': {
            'BASE': {'file': 'assets/rocky-base.png', 'frames': 1},
            'START': {'file': 'assets/rocky-start.png', 'frames': 40},
            'RUN': {'file': 'assets/rocky-run.png', 'frames': 23},
        },
    }, indent=2) + '\n')


if __name__ == '__main__':
    main()
