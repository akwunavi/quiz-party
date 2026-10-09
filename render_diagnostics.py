#!/usr/bin/env python3
"""Render explicit diagnostic frame plans. No inference, blending or production writes.

Frames are zero-based and ranges inclusive. All writes stay beside this script.
Usage: python render_diagnostics.py plan.json [--render] [--only OUTPUT_NAME]
Without --render, validate inputs and print durations; no decoding or encoding.
"""
import argparse
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SIZE = (1276, 720)
FPS = 24
NAMES = [
    '01_start_from_existing_run.mp4', '02_run_loop_test.mp4',
    '03_stop_feasibility.mp4', '04_sniff_action_variants.mp4',
    '05_return_feasibility.mp4',
]


def output_path(relative):
    path = (ROOT / relative).resolve()
    if not path.is_relative_to(ROOT):
        raise ValueError('Outputs must stay in audit directory')
    return path


def indices(segment):
    start, end = segment['start'], segment['end']
    if not isinstance(start, int) or not isinstance(end, int) or start < 0 or end < start:
        raise ValueError('Frame ranges must be nonnegative inclusive integers')
    seq = list(range(start, end + 1))
    if segment.get('reverse'):
        seq.reverse()
        if 'reverse' not in segment['label'].lower():
            raise ValueError('Reverse experiments must be explicitly labeled reverse')
    repeat = segment.get('repeat', 1)
    hold = segment.get('hold_frames', 1)
    if not isinstance(repeat, int) or not isinstance(hold, int) or min(repeat, hold) < 1:
        raise ValueError('repeat and hold_frames must be positive integers')
    return [n for _ in range(repeat) for n in seq for _ in range(hold)]


def validate(plan, only=None):
    if set(plan['videos']) != set(NAMES):
        raise ValueError('Plan must include precisely the five required MP4 names')
    selected = {n: s for n, s in plan['videos'].items() if only is None or n == only}
    needed = {s['source'] for segments in selected.values() for s in segments}
    for key in needed:
        source = plan['sources'][key]
        if source['kind'] not in ('png', 'webm'):
            raise ValueError('Unsupported source kind')
        if source['kind'] == 'webm' and not Path(source['path']).is_file():
            raise FileNotFoundError(source['path'])
    for name, segments in selected.items():
        if not segments:
            raise ValueError(f'No segments for {name}')
        count = 0
        for seg in segments:
            if not seg['label']:
                raise ValueError('Every segment requires a diagnostic label')
            source = plan['sources'][seg['source']]
            seq = indices(seg)
            if max(seq) >= source['frame_count']:
                raise ValueError(f'{name}: out of range for {seg["source"]}')
            if source['kind'] == 'png':
                for n in set(seq):
                    path = Path(source['directory']) / (source.get('pattern', '%04d.png') % n)
                    if not path.is_file():
                        raise FileNotFoundError(path)
            count += len(seq)
        print(f'{name}: {count} frames, {count / FPS:.6f} seconds', flush=True)


def materialize(source_id, source):
    if source['kind'] == 'png':
        return Path(source['directory']), source.get('pattern', '%04d.png')
    cache = output_path('decoded/' + source_id)
    cache.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        'ffmpeg', '-hide_banner', '-loglevel', 'error', '-c:v', 'libvpx-vp9',
        '-i', source['path'], '-vsync', '0', '-pix_fmt', 'rgba',
        '-start_number', '0', '-y', str(cache / '%04d.png'),
    ], check=True)
    if len(list(cache.glob('*.png'))) != source['frame_count']:
        raise ValueError('Decoded frame count differs from plan')
    return cache, '%04d.png'


def render(name, segments, sources, background):
    font_path = Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
    font = ImageFont.truetype(str(font_path), 18) if font_path.exists() else ImageFont.load_default()
    count = sum(len(indices(s)) for s in segments)
    cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-f', 'rawvideo',
           '-pix_fmt', 'rgb24', '-s', '1276x720', '-r', str(FPS), '-i', 'pipe:0',
           '-frames:v', str(count), '-an', '-c:v', 'libx264', '-crf', '17',
           '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
           '-y', str(output_path(name))]
    encoder = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    try:
        for segment_number, seg in enumerate(segments, 1):
            directory, pattern = sources[seg['source']]
            seq = indices(seg)
            print(f'{name}: segment {segment_number}/{len(segments)} {seg["label"]}', flush=True)
            for n in seq:
                with Image.open(directory / (pattern % n)) as image:
                    if image.size != SIZE:
                        raise ValueError('Source size differs from 1276x720; resizing prohibited')
                    frame = Image.new('RGBA', SIZE, background)
                    frame.alpha_composite(image.convert('RGBA'))
                frame = frame.convert('RGB')
                draw = ImageDraw.Draw(frame)
                label = f'{seg["label"]} | source #{n} | [{seg["start"]}..{seg["end"]}] | {len(seq)/FPS:.3f}s'
                draw.rectangle((0, 696, SIZE[0], 719), fill='#1b1b1b')
                draw.text((8, 696), label, fill='white', font=font)
                encoder.stdin.write(frame.tobytes())
    except BaseException:
        encoder.stdin.close()
        encoder.wait()
        raise
    encoder.stdin.close()
    if encoder.wait():
        raise RuntimeError('H264 encoder failed')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('plan', type=Path)
    parser.add_argument('--render', action='store_true')
    parser.add_argument('--only', choices=NAMES)
    args = parser.parse_args()
    plan = json.loads(args.plan.read_text())
    validate(plan, args.only)
    if not args.render:
        return
    selected = {n: s for n, s in plan['videos'].items() if not args.only or n == args.only}
    needed = {s['source'] for segments in selected.values() for s in segments}
    sources = {key: materialize(key, plan['sources'][key]) for key in needed}
    for name, segments in selected.items():
        render(name, segments, sources, plan.get('background', '#D1C5AA'))
    output_path('rendered-plan.json').write_text(json.dumps(plan, indent=2) + '\n')


if __name__ == '__main__':
    main()
