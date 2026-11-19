#!/usr/bin/env python3
"""Сводка замеров декора свитков из measure.json (его пишет shoot.cjs с QP_EXTRA_MEASURE=e2e/book/hscroll-bow-measure.js).
usage: python3 -I e2e/book/hscroll-bow-report.py <measure.json> [префикс сцены]
Код выхода 1 — есть пересечения декор↔декор, заход на сгиб, обрезка родителем, выход за экран, текст вне пергамента."""
import json, sys
d = json.load(open(sys.argv[1]))
pre = sys.argv[2] if len(sys.argv) > 2 else ''
bad = 0
for r in d:
    if not r['name'].startswith(pre): continue
    e = r.get('extra')
    if not e or not e['n']: print(r['name'], 'нет свитков'); continue
    o = e['other']; pl = e['plates']
    hits = {k: o[k] for k in o if k.endswith('Hit') and k != 'answerBlockHit'}
    probs = []
    if e['pairOverlaps']: probs.append(f"пересечений декора {e['pairOverlaps']}")
    if e['foldHit']: probs.append(f"сгиб {e['foldHit']}")
    if e['clip']: probs.append(f"обрезка {e['clip']}")
    if e['outsideViewport']: probs.append(f"вне экрана {e['outsideViewport']}")
    if hits: probs.append(f"пересечения с {hits}")
    if not all(p['textInsideBody'] and p['textInBodyV'] for p in pl): probs.append('текст вне пергамента')
    bad += bool(probs)
    print(('НАРУШЕНИЕ ' if probs else 'ok  ') + r['name'], f"n={e['n']} bodyH={pl[0]['bodyH']}", '; '.join(probs))
sys.exit(1 if bad else 0)
