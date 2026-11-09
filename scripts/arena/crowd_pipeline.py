#!/usr/bin/env python3
"""Конвейер «ожившая трибуна»: видео Kling (i2v, статичная камера, пурпурный фон) → слои для Canvas.
  python3 scripts/arena/crowd_pipeline.py <kling.mp4> <outdir> [--band-y0 Y --band-h H] [--key FF00FF] [--thr 5]
Что делает (по порядку):
  1. маска движения: покадровый разброс яркости по времени → где двигаются зрители (архитектура и фон неподвижны), расширение и размытие края;
  2. still.webp — ПЕРВЫЙ кадр, пурпур вырезан в альфу, обрезан по полосе: неподвижная архитектура берётся из него, а не из видео (видео может «плыть»);
  3. crowd.webm — VP9 с альфой: движущиеся области видео × прозрачность по ключу; браузер играет его в <video> и рисует в Canvas;
  4. report.json — доля движущейся площади и «качество петли» (разница первого и последнего кадра; чем меньше, тем ровнее шов; нужен tail_image = first_image).
Нужны: ffmpeg (libvpx-vp9), Pillow, numpy."""
import argparse, json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageFilter

def run(cmd, **kw): return subprocess.run(cmd, check=True, capture_output=True, **kw)
def probe(path):
    o = run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,duration', '-of', 'json', path]).stdout
    s = json.loads(o)['streams'][0]; n, d = s['r_frame_rate'].split('/'); return int(s['width']), int(s['height']), float(n) / float(d), float(s['duration'])

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('out'); ap.add_argument('--band-y0', type=int, default=0); ap.add_argument('--band-h', type=int, default=0)
    ap.add_argument('--key', default='FF00FF'); ap.add_argument('--thr', type=float, default=5.0); ap.add_argument('--grow', type=int, default=11); ap.add_argument('--feather', type=float, default=6.0)
    a = ap.parse_args(); os.makedirs(a.out, exist_ok=True)
    W, H, fps, dur = probe(a.src); y0 = a.band_y0; bh = a.band_h or (H - y0); crop = f'crop={W}:{bh}:0:{y0}'
    # 1. маска движения на уменьшенных кадрах полосы
    sw = 480; sh = max(8, round(bh * sw / W)); raw = run(['ffmpeg', '-v', 'error', '-i', a.src, '-vf', f'{crop},scale={sw}:{sh},format=gray', '-f', 'rawvideo', '-']).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, sh, sw).astype(np.float32); T = len(fr)
    spread = fr.max(0) - fr.min(0); motion = spread > a.thr
    m = Image.fromarray((motion * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(a.grow | 1)).filter(ImageFilter.GaussianBlur(a.feather)).resize((W, bh), Image.BILINEAR)
    m.save(os.path.join(a.out, 'mask.png'))
    loop_diff = float(np.abs(fr[0] - fr[-1]).mean())
    # 2. неподвижный слой: первый кадр с вырезанным фоном
    key = f'0x{a.key}'; keyf = f'chromakey={key}:0.14:0.06,despill=type=green'
    run(['ffmpeg', '-v', 'error', '-y', '-i', a.src, '-frames:v', '1', '-vf', f'{crop},{keyf},format=rgba', os.path.join(a.out, 'still.png')])
    Image.open(os.path.join(a.out, 'still.png')).save(os.path.join(a.out, 'still.webp'), lossless=True, quality=100); os.remove(os.path.join(a.out, 'still.png'))
    # 3. оживляющий слой: видео × (маска движения ∩ ключ) → VP9 с альфой
    fg = (f'[0:v]{crop},{keyf},format=yuva444p,split[k1][k2];[k2]alphaextract[ka];[1:v]scale={W}:{bh},format=gray[mk];'
          f'[mk][ka]blend=all_mode=darken[ma];[k1][ma]alphamerge,format=yuva420p[o]')
    run(['ffmpeg', '-v', 'error', '-y', '-i', a.src, '-loop', '1', '-framerate', f'{fps}', '-i', os.path.join(a.out, 'mask.png'), '-filter_complex', fg, '-map', '[o]', '-t', f'{dur}', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '30', '-auto-alt-ref', '0', '-an', os.path.join(a.out, 'crowd.webm')])
    rep = {'source': {'w': W, 'h': H, 'fps': round(fps, 2), 'seconds': round(dur, 2)}, 'band': {'y0': y0, 'h': bh}, 'frames': T,
           'moving_area_percent': round(float(motion.mean()) * 100, 1), 'loop_first_last_mean_diff': round(loop_diff, 2),
           'loop_quality': 'хорошо' if loop_diff < 3 else 'шов заметен — перегенерировать с tail_image = first_image или собрать ping-pong',
           'files': {f: os.path.getsize(os.path.join(a.out, f)) for f in ('still.webp', 'crowd.webm', 'mask.png')}}
    json.dump(rep, open(os.path.join(a.out, 'report.json'), 'w'), ensure_ascii=False, indent=1); print(json.dumps(rep, ensure_ascii=False, indent=1))
main()
