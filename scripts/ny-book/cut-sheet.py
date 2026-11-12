#!/usr/bin/env python3
"""Нарезка листов декора темы «Книга» (ny_book) на ассеты — ВРЕМЕННЫЕ, для прототипа.

Вход — листы с НАСТОЯЩЕЙ альфой (docs-dev/book-redesign/assets-src/sheet-*.png). Хромакей не нужен.
Шаги: (1) альфа < 8 обнуляется (на листах вокруг объектов «пыль» alpha 1–7 с насыщенным красным/жёлтым);
(2) маска «объект» = альфа >= порог (200; кроны соседних елей касаются полупрозрачной хвоей), уменьшение в 4 раза;
(3) связные компоненты (свой BFS — scipy/opencv нет); если имён больше, чем компонент (ели заходят друг на друга) —
маска сжимается эрозией, пока не разделится (область перекрытия делится по близости — временное решение);
(4) мягкие края (альфа 8…порог: хвоя, свечение) приклеиваются к ближайшей компоненте многоисточниковым BFS;
bbox + поле 16 px, вырез только своей компоненты; (5) лампочки: яркие тёплые пятна (R>235, G>180, R−B>70, альфа>200;
белый снег не попадает) → центры в долях ширины/высоты — для мерцания DOM/CSS; (6) WebP q88 с альфой без потерь + MANIFEST.json.

usage: python3 -I scripts/ny-book/cut-sheet.py <out-dir> <sheet.png>:<prefix>[:id1,id2,...[:порог[:раздутие]]] ...
Порядок имён: ряды сверху вниз (допуск 18 % высоты листа), внутри ряда — слева направо.
"""
import hashlib, json, os, sys
from collections import deque
import numpy as np
from PIL import Image

PAD, DOWN = 16, 4

def components(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    out = []
    for y0, x0 in zip(*np.nonzero(mask)):
        if seen[y0, x0]: continue
        q = deque([(y0, x0)]); seen[y0, x0] = True; pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; q.append((ny, nx))
        out.append(np.array(pts))
    return out

def dilate(mask, r):
    out = mask.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out |= np.roll(np.roll(mask, dy, 0), dx, 1)
    return out

def lamps_of(rgba, limit=28):
    r, g, b, a = (rgba[..., i].astype(int) for i in range(4))
    hot = (r > 235) & (g > 180) & (a > 200) & (r - b > 70)
    if not hot.any(): return []
    h, w = hot.shape
    comps = sorted([c for c in components(hot[::2, ::2]) if len(c) >= 2], key=len, reverse=True)
    return [[round(float(c.mean(0)[1] * 2) / w, 4), round(float(c.mean(0)[0] * 2) / h, 4)] for c in comps[:limit]]

def cut(sheet_path, prefix, names, out_dir, thr=200, grow=0):
    want = len(names)
    px = np.array(Image.open(sheet_path).convert('RGBA')); px[px[..., 3] < 8] = 0
    h, w = px.shape[:2]
    hs, ws = h // DOWN, w // DOWN
    red = lambda m: m[:hs * DOWN, :ws * DOWN].reshape(hs, DOWN, ws, DOWN).any(axis=(1, 3))
    small = red(px[..., 3] >= thr)
    if grow: small = dilate(small, grow)
    comps = [c for c in components(small) if len(c) > 0.004 * hs * ws]
    core = small
    for _ in range(16):
        if not want or len(comps) >= want: break
        core = core & np.roll(core, 1, 0) & np.roll(core, -1, 0) & np.roll(core, 1, 1) & np.roll(core, -1, 1)
        comps = [c for c in components(core) if len(c) > 0.002 * hs * ws]
    soft = red(px[..., 3] > 0)
    labels = np.full((hs, ws), -1, dtype=int); q = deque()
    for k, c in enumerate(comps):
        labels[c[:, 0], c[:, 1]] = k; q.extend((int(y), int(x)) for y, x in c)
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < hs and 0 <= nx < ws and soft[ny, nx] and labels[ny, nx] < 0:
                labels[ny, nx] = labels[y, x]; q.append((ny, nx))
    boxes = []
    for k in range(len(comps)):
        lab = labels == k; c = np.argwhere(lab)
        y0, x0 = c.min(0) * DOWN; y1, x1 = (c.max(0) + 1) * DOWN
        full = np.pad(np.repeat(np.repeat(lab, DOWN, 0), DOWN, 1), ((0, h - hs * DOWN), (0, w - ws * DOWN)))
        boxes.append(((y0 + y1) / 2, x0, y0, x1, y1, full))
    boxes.sort(key=lambda b: b[0]); rows, cur = [], []
    for b in boxes:
        if cur and b[0] - cur[0][0] > 0.18 * h: rows.append(cur); cur = []
        cur.append(b)
    if cur: rows.append(cur)
    items = []
    for i, (_, x0, y0, x1, y1, full) in enumerate([b for row in rows for b in sorted(row, key=lambda b: b[1])]):
        id_ = names[i] if i < len(names) else f'{prefix}-{i + 1}'
        X0, Y0, X1, Y1 = max(0, int(x0) - PAD), max(0, int(y0) - PAD), min(w, int(x1) + PAD), min(h, int(y1) + PAD)
        crop = px[Y0:Y1, X0:X1].copy(); crop[~full[Y0:Y1, X0:X1]] = 0
        img = Image.fromarray(crop, 'RGBA'); path = os.path.join(out_dir, f'{id_}.webp')
        img.save(path, 'WEBP', quality=88, method=6, alpha_quality=100)
        items.append({'id': id_, 'file': f'{id_}.webp', 'w': img.width, 'h': img.height, 'lamps': lamps_of(crop),
                      'sha': hashlib.sha1(open(path, 'rb').read()).hexdigest()[:12], 'src': os.path.basename(sheet_path)})
        print(f'{id_:16s} {img.width}x{img.height} lamps={len(items[-1]["lamps"])} {os.path.getsize(path) // 1024} KB')
    return items

def main():
    out_dir = sys.argv[1]; os.makedirs(out_dir, exist_ok=True); allitems = []
    for spec in sys.argv[2:]:
        p = spec.split(':')
        allitems += cut(p[0], p[1], p[2].split(',') if len(p) > 2 and p[2] else [], out_dir,
                        int(p[3]) if len(p) > 3 and p[3] else 200, int(p[4]) if len(p) > 4 and p[4] else 0)
    json.dump({'note': 'ВРЕМЕННЫЕ ассеты прототипа (этап 2), не финальные. Нарезано scripts/ny-book/cut-sheet.py', 'items': allitems},
              open(os.path.join(out_dir, 'MANIFEST.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

if __name__ == '__main__': main()
