#!/usr/bin/env python3
"""Проверка присланного слоя арены перед подключением: python3 scripts/arena/check_layer.py <файл> <id слоя> (id — из src/lib/bulldog/arena/slots.ts).
Что проверяет: размер и пропорции, альфа-канал есть и не пустой, нижняя кромка садится на ровную линию (нет «хвостов» и подложки),
остатки хромакей-пурпура (#FF00FF) на краях, шов между модулями (левый и правый край модуля похожи по прозрачности), крупные пустые полосы.
Нужны Pillow и numpy."""
import sys, numpy as np
from PIL import Image
SPEC = {  # id: (минимальная высота 1x, ширина модуля 1x, число модулей или None, bottom-line обязательна)
    'forest_far': (300, 3840, 1, False), 'village_mid': (400, 2752, None, True), 'stands': (320, 2400, None, True),
    'crowd': (230, 2400, None, True), 'stands_crowd': (360, 1596, None, True), 'spruce_set': (300, 0, None, False)}
def main():
    path, lid = sys.argv[1], sys.argv[2]; im = Image.open(path).convert('RGBA'); a = np.asarray(im).astype(int); H, W = a.shape[:2]; rep = []; ok = True
    def chk(name, cond, info=''):
        nonlocal ok; ok &= bool(cond); rep.append(f"{'✓' if cond else '✗'} {name} {info}")
    mh, mw, n, bottom = SPEC[lid]
    chk('размер', H >= mh * 2 * 0.9 or H >= mh, f'{W}×{H} (нужно высота ≥ {mh} при 1×, лучше {mh*2})')
    if mw: n = n or max(1, round(W / (mw * (W / (mw * max(1, round(W / mw)))))))
    chk('альфа-канал', a[..., 3].min() < 5 and a[..., 3].max() > 250, f'min={a[...,3].min()} max={a[...,3].max()}')
    cover = (a[..., 3] > 20).mean(); chk('занятость кадра', 0.15 < cover < 0.97, f'{cover*100:.0f}% непрозрачных')
    mag = ((a[..., 0] > 200) & (a[..., 2] > 200) & (a[..., 1] < 90) & (a[..., 3] > 20)).mean(); chk('нет остатков пурпурного ключа', mag < 0.0005, f'{mag*100:.3f}%')
    if bottom:
        row = a[-3:, :, 3].mean(axis=0); chk('нижняя кромка: объекты стоят на нижней линии (≥ 60% ширины непрозрачно в последних строках)', (row > 128).mean() > 0.6, f'{(row>128).mean()*100:.0f}%')
        chk('под кромкой ничего лишнего: верхняя часть кадра не «залита» сплошной подложкой', (a[:8, :, 3] > 200).mean() < 0.5)
    if lid in ('forest_far',):                                        # бесшовность: левый и правый край
        d = np.abs(a[:, 0, :4] - a[:, -1, :4]).mean(); chk('бесшовный стык левый/правый край', d < 18, f'разница {d:.1f}')
    if lid in ('village_mid', 'stands', 'crowd') and mw:
        m = max(1, round(W / mw)); step = W // m
        for i in range(m): sl = a[:, i * step:(i + 1) * step, 3]; edge = (sl[:, :60] > 128).mean() + (sl[:, -60:] > 128).mean(); chk(f'модуль {i+1}: края освобождены под стык (<35% занято на крайних 60 px)', edge < 0.7, f'{edge*50:.0f}%')
    print('\n'.join(rep)); print('ИТОГО:', 'годится' if ok else 'есть замечания'); sys.exit(0 if ok else 1)
main()
