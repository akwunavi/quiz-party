#!/usr/bin/env python3
"""Вырезание фона, который НЕ ровный цвет (градиент неба), по связности с краем кадра: python3 scripts/arena/key_sky.py <in.png> <out_rgba.png> [--margin 140] [--tol 26] [--bottom-y 0.86]
Модель фона — медиана цвета левого и правого полей по каждой строке; фоном считается то, что близко к модели И связано с краем кадра; затем остаётся самая большая
связная область (деревья по углам и прочий «мусор» отбрасываются), край сглаживается и очищается от цвета неба.
Нужны Pillow и numpy."""
import argparse, numpy as np
from PIL import Image, ImageFilter

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('out'); ap.add_argument('--margin', type=int, default=140); ap.add_argument('--tol', type=float, default=26); ap.add_argument('--bottom-y', type=float, default=0.86); ap.add_argument('--exclude', action='append', default=[], help='прямоугольник x0,y0,x1,y1 (пиксели исходника) — стереть (деревья, соседние постройки)'); ap.add_argument('--hole', type=int, default=6, help='радиус: просветы неба внутри объекта крупнее этого убираются')
    a = ap.parse_args(); im = Image.open(a.src).convert('RGB'); rgb = np.asarray(im).astype(np.int16); H, W = rgb.shape[:2]
    # модель неба: по строкам; ниже bottom-y (деревья, снег по углам) — продолжение последней чистой строки
    side = np.concatenate([rgb[:, :a.margin], rgb[:, W - a.margin:]], axis=1); row = np.median(side, axis=1)
    cut = int(H * a.bottom_y); row[cut:] = row[cut - 1]
    for c in range(3): row[:, c] = np.convolve(np.pad(row[:, c], 20, mode='edge'), np.ones(41) / 41, mode='valid')
    sky_like = (np.abs(rgb - row[:, None, :]).max(axis=2) < a.tol)
    # заливка от краёв: сдвиговое расширение внутри маски
    reach = np.zeros((H, W), bool); reach[0, :] = sky_like[0, :]; reach[:, 0] = sky_like[:, 0]; reach[:, -1] = sky_like[:, -1]
    for _ in range(4000):
        n = reach.copy(); n[1:] |= reach[:-1]; n[:-1] |= reach[1:]; n[:, 1:] |= reach[:, :-1]; n[:, :-1] |= reach[:, 1:]; n &= sky_like
        if (n == reach).all(): break
        reach = n
    # крупные просветы неба ВНУТРИ объекта (не связаны с краем): сжатие маски убирает мелочь (шапки цвета неба), геодезическое расширение возвращает форму просветов
    enc = sky_like & ~reach; seed = np.asarray(Image.fromarray((enc * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(2 * a.hole + 1))) > 0
    for _ in range(a.hole * 3 + 20):
        n = seed.copy(); n[1:] |= seed[:-1]; n[:-1] |= seed[1:]; n[:, 1:] |= seed[:, :-1]; n[:, :-1] |= seed[:, 1:]; n &= enc
        if (n == seed).all(): break
        seed = n
    reach |= seed
    solid = ~reach
    for r in a.exclude: x0, y0, x1, y1 = map(int, r.split(',')); solid[y0:y1, x0:x1] = False
    # оставить крупнейшую связную область объекта (сдвиговая заливка с точки максимума плотности не нужна: берём компоненту, содержащую центр кадра)
    cy, cx = int(H * 0.45), W // 2; comp = np.zeros_like(solid); 
    if not solid[cy, cx]: ys, xs = np.nonzero(solid); cy, cx = ys[len(ys) // 2], xs[len(xs) // 2]
    comp[cy, cx] = True
    for _ in range(6000):
        n = comp.copy(); n[1:] |= comp[:-1]; n[:-1] |= comp[1:]; n[:, 1:] |= comp[:, :-1]; n[:, :-1] |= comp[:, 1:]; n &= solid
        if (n == comp).all(): break
        comp = n
    # заполнить дыры внутри объекта (просветы между балками — это небо ВНУТРИ, оно должно остаться прозрачным только если связано с краем; дыры < порога закрываем)
    alpha = Image.fromarray((comp * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.9))
    A = np.asarray(alpha).astype(np.float32) / 255
    # очистка цвета на краю: заменить цвет граничных пикселей средним цветом близких внутренних
    inner = (A > 0.98).astype(np.float32); pm = rgb.astype(np.float32) * inner[..., None]
    from PIL import Image as I
    def box(x, r): return np.asarray(I.fromarray(np.clip(x, 0, 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(r))).astype(np.float32)
    num = np.stack([box(pm[..., c], 3) for c in range(3)], -1); den = box(inner * 255, 3)[..., None] / 255 + 1e-4
    rgb2 = np.where((A < 0.98)[..., None] & (den > 0.05), np.clip(num / den, 0, 255), rgb.astype(np.float32))
    out = np.dstack([rgb2.astype(np.uint8), (A * 255).astype(np.uint8)]); Image.fromarray(out, 'RGBA').save(a.out)
    ys, xs = np.nonzero(A > 0.5); print(f'объект: x {xs.min()}–{xs.max()}, y {ys.min()}–{ys.max()} из {W}×{H}; прозрачных {100*(A<0.02).mean():.0f}% кадра')
main()
