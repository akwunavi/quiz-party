#!/usr/bin/env python3
"""Сводка по сценариям доработки адаптивности: читает shots/adaptive2/<after|before|cbf>/measure.json и печатает markdown-таблицу
(сценарий × разрешение: выбранная раскладка и очки, кегль текста, размеры картинок, ошибки/предупреждения диагностики, переполнение/пересечения).
usage: python3 -I e2e/book/adaptive2-report.py [after|before|cbf]"""
import json, os, sys
which = sys.argv[1] if len(sys.argv) > 1 else 'after'
root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
load = lambda w: [r for r in json.load(open(os.path.join(root, 'docs-dev/book-redesign/shots/adaptive2', w, 'measure.json'))) if not r.get('reduced')]
rows = load(which)
others = {w: {r['name']: r for r in load(w)} for w in ('before', 'cbf')} if which == 'after' else {}
def brief(r):
    if not r: return '—'
    g = r['geo']; q = g.get('qtext'); return (f"{q['fontPx']:.0f}" if q else '—') + ' / ' + (' '.join(f"{i['rect']['w']:.0f}×{i['rect']['h']:.0f}" for i in g['imgs']) or '—')
order = ['20-ad-short', '20-ad-long', '20-ad-1img', '21-cmp-1h', '21-cmp-1sq', '21-cmp-1v', '21-cmp-1h-long', '21-cmp-3h', '21-cmp-3v', '20-ad-4img', '21-cmp-4mix', '21-cmp-4h',
         '21-cmp-4v', '21-cmp-4sq', '21-cmp-4caps', '20-ad-4img-caps', '21-cmp-4-short', '21-cmp-4-long', '20-ad-3img-choices', '21-fold-short', '21-fold-mid', '21-fold-long']
vps = ['1920x1080', '1899x905', '1366x768', '1280x720']
print('| сценарий | окно | раскладка (очки) | текст, px | картинки, px (w×h) | ошибки | предупреждения | пересечений | было до A–C: текст / картинки | было на cbf101b: текст / картинки |')
print('|---|---|---|---|---|---|---|---|---|---|')
for sc in order:
    for vp in vps:
        r = next((x for x in rows if x['name'] == f'{sc}-{vp}'), None)
        if not r: continue
        g = r['geo']; L = g.get('layout') or {}
        lay = (L.get('comp') and f"{L['comp']} ({L['compScore']})") or (L.get('media') and f"{L['media']} ({L['mediaScore']})") or '—'
        if L.get('comp') and L.get('media'): lay += f" · {L['media']}"
        q = g.get('qtext'); txt = f"{q['fontPx']:.0f}" if q else '—'
        im = ' '.join(f"{i['rect']['w']:.0f}×{i['rect']['h']:.0f}" for i in g['imgs']) or '—'
        diag = g.get('diag') or []
        err = [f"{i['code']}" for i in diag if i.get('severity', 'error') == 'error']; warn = [f"{i['code']}" for i in diag if i.get('severity') == 'warn']
        print(f"| {sc} | {vp} | {lay} | {txt} | {im} | {', '.join(err) or '0'} | {', '.join(warn) or '—'} | {len(r['overlaps'])} | {brief(others.get('before', {}).get(r['name']))} | {brief(others.get('cbf', {}).get(r['name']))} |")
