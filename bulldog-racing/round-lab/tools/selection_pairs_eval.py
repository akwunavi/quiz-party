#!/usr/bin/env python3
"""Попиксельная проверка переходов экрана выбора: IoU силуэтов соседних кадров, сдвиг центра и линии лап, касание края ячейки (обрезание).
Эталон — соседние кадры внутри самого цикла IDLE той же собаки. usage: selection_pairs_eval.py <out.json>"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.path.join(HERE, "..", "..", "assets", "dogs")
pairs = json.loads(subprocess.run(["node", os.path.join(HERE, "selection_pairs_dump.mjs")], capture_output=True, text=True, check=True).stdout)
res = {}
for dog, d in pairs.items():
    A = json.load(open(os.path.join(LIB, dog, "selection", "selection_atlas.json"))); cw, ch = A["cell"]; C = A["columns"]; sheets = {}
    cache = {}
    def mask(clip, i):
        k = (clip, i)
        if k not in cache:
            if clip not in sheets: sheets[clip] = np.asarray(Image.open(os.path.join(LIB, dog, A["clips"][clip]["sheet"])).convert("RGBA"))[..., 3]
            r, c = divmod(i, C); cache[k] = sheets[clip][r*ch:(r+1)*ch, c*cw:(c+1)*cw] >= 128
        return cache[k]
    def st(m):
        ys, xs = np.nonzero(m); return xs.mean(), ys.max(), (xs.min() == 0 or xs.max() == cw-1 or ys.min() == 0 or ys.max() == ch-1)
    rows = []; edge = 0
    for p in d["pairs"]:
        a, b = mask(*p["from"]), mask(*p["to"]); iou = (a & b).sum() / max(1, (a | b).sum()); (ax, ab, ae), (bx, bb, be) = st(a), st(b)
        edge += int(ae or be)
        rows.append({**p, "iou": round(float(iou), 3), "dCx": round(float(bx-ax), 2), "dBottom": int(bb-ab), "edge": bool(ae or be)})
    base = [r["iou"] for r in rows if r["from"][0] == "idle" and r["to"][0] == "idle" and r["kinds"] == "idle>idle" and abs(r["to"][1]-r["from"][1]) == 1]
    bmin = min(base) if base else 0.9
    joins = [r for r in rows if r["from"][0] != r["to"][0]]   # настоящие стыки: IDLE→SELECTED, SELECTED→RETURN, RETURN→IDLE
    flag = [r for r in rows if r["iou"] < bmin - 0.05 or abs(r["dBottom"]) > 3 or abs(r["dCx"]) > 8]
    res[dog] = {"maxWaitFrames": d["maxWait"], "pairs": len(rows), "baselineIdleMinIoU": bmin, "flagged": flag[:15], "flaggedCount": len(flag), "edgeTouchPairs": edge,
                "joinsWorst": sorted(joins, key=lambda r: r["iou"])[:3], "joinsMinIoU": min([r["iou"] for r in joins] or [1]), "minIoU": min(r["iou"] for r in rows)}
    print(f"{dog:6} пар {len(rows):5}  макс.ожидание {d['maxWait']:3} кадр.  эталон IoU(IDLE) мин {bmin:.3f}  самый низкий IoU {res[dog]['minIoU']:.3f}  стыки мин {res[dog]['joinsMinIoU']:.3f}  подозрительных {len(flag)}  касаний края {edge}")
json.dump(res, open(sys.argv[1], "w"), ensure_ascii=False, indent=1)
