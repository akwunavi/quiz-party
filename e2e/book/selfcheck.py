#!/usr/bin/env python3
"""Самопроверка переполнений и наложений на РЕАЛЬНЫХ экранах (кадры стенда): читает shots/redesign/measure.json (+ adaptive2/after) и печатает
markdown-сводку: сцена × окно → пересечения блоков, выход за окно, настоящие переполнения (кроме артефакта .q-text 7 px), ошибки диагностики.
usage: python3 -I e2e/book/selfcheck.py > docs-dev/book-redesign/redesign-selfcheck.md"""
import json, os
root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
def load(p):
    f = os.path.join(root, 'docs-dev/book-redesign/shots', p, 'measure.json')
    return [r for r in json.load(open(f)) if not r.get('reduced')] if os.path.exists(f) else []
rows = load('redesign') + load('adaptive2/after')
print('| кадр | валиден | пересечения | вне окна | переполнения (кроме .q-text) | ошибки диагностики |'); print('|---|---|---|---|---|---|')
bad = 0
for r in sorted(rows, key=lambda x: x['name']):
    ov = [f"{o.get('a','?')}×{o.get('b','?')}" for o in r['overlaps']]
    out = [o.get('node', '?') for o in r['outside'] if o.get('of') == 'viewport']
    of = [o['node'] for o in r['overflow'] if not o['node'].startswith('.q-text')]
    dg = [i['code'] for i in (r['geo'].get('diag') or []) if i.get('severity', 'error') == 'error']
    if ov or out or of or dg or not r['ok']: bad += 1
    print(f"| {r['name']} | {'да' if r['ok'] else 'НЕТ'} | {', '.join(ov) or '0'} | {', '.join(out) or '0'} | {', '.join(of) or '0'} | {', '.join(dg) or '0'} |")
print(f"\nКадров: {len(rows)}; с замечаниями: {bad}")
