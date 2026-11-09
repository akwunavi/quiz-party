#!/usr/bin/env python3
"""Попиксельные проверки библиотеки (дополняет validate_library.mjs):
  1. швы: для каждой пары кадр->кадр на границах клипов (список из reports/validation_raw.json) — IoU силуэтов, сдвиг центра, сдвиг линии лап;
     эталон для сравнения — соседние кадры внутри цикла RUN той же собаки;
  2. размеры собак В ИГРОВЫХ ПИКСЕЛЯХ спрайта 207×116 (ячейки 178×100 растягиваются так же, как рисует игра);
  3. линия лап: нижний ряд силуэта у RACE_STAND и в цикле RUN.
Пишет reports/seams.json, reports/sizes.json. Нужны Pillow, numpy.
usage: measure.py"""
import json, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(HERE, "..", "assets", "dogs")
REP = os.path.join(HERE, "..", "reports")
SW, SH = 207, 116
THR = 128
raw = json.load(open(os.path.join(REP, "validation_raw.json")))
_sheets = {}


def sheet(dog, rel):
    k = (dog, rel)
    if k not in _sheets:
        _sheets[k] = Image.open(os.path.join(LIB, dog, rel)).convert("RGBA")
    return _sheets[k]


def cell(dog, A, clip, frame):
    """RGBA-ячейка в размере спрайта 207×116."""
    cw, ch, cols = A["cellWidth"], A["cellHeight"], A["columns"]
    if A["kind"] == "labelled":
        f = A["frames"][frame]; rel = A["sheets"][f["sheet"]]; idx = f["index"]
    else:
        rel = A["clips"][clip]["sheet"]; idx = int(frame)
    im = sheet(dog, rel)
    c, r = idx % cols, idx // cols
    im = im.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
    if (cw, ch) != (SW, SH):
        im = im.resize((SW, SH), Image.LANCZOS)  # как игра растягивает ячейку 178×100 в спрайт 207×116
    return im


def mask(im):
    return np.asarray(im)[..., 3] >= THR


def stats(m):
    ys, xs = np.nonzero(m)
    if len(xs) == 0:
        return None
    return {"left": int(xs.min()), "right": int(xs.max()), "top": int(ys.min()), "bottom": int(ys.max()),
            "w": int(xs.max() - xs.min() + 1), "h": int(ys.max() - ys.min() + 1), "area": int(m.sum()),
            "cx": round(float(xs.mean()), 2)}


def parse(tag):
    clip, fr = tag.split(":", 1)
    return clip, fr


def key_frame(A, fr):
    return fr if A["kind"] == "labelled" else int(fr)


seams_out, sizes_out = {}, {}
for dog, rep in raw["dogs"].items():
    A = json.load(open(os.path.join(LIB, dog, "atlas", "atlas.json")))
    # эталон: соседние кадры внутри цикла RUN
    c = json.load(open(os.path.join(LIB, dog, "contract", f"{dog}.contract.json")))
    run_clip = None
    if A["kind"] == "labelled":
        loop = (c["clips"]["START"].get("loop") or [])
        pairs = list(zip(loop, loop[1:] + loop[:1]))
        base = []
        for a, b in pairs:
            ma, mb = mask(cell(dog, A, "START", a)), mask(cell(dog, A, "START", b))
            base.append((ma & mb).sum() / max(1, (ma | mb).sum()))
    else:
        rc = c["clips"]["RUN"]; pro, lp = rc["prologue"], rc["loop"]
        base = []
        for i in range(lp):
            a, b = pro + i, pro + (i + 1) % lp
            ma, mb = mask(cell(dog, A, "RUN", a)), mask(cell(dog, A, "RUN", b))
            base.append((ma & mb).sum() / max(1, (ma | mb).sum()))
    ref = {"runLoopNeighbourIoU_min": round(float(min(base)), 3), "median": round(float(np.median(base)), 3)}
    seams = []
    for s in rep["seams"]:
        ca, fa = parse(s["from"]); cb, fb = parse(s["to"])
        try:
            ia, ib = cell(dog, A, ca, key_frame(A, fa)), cell(dog, A, cb, key_frame(A, fb))
        except Exception as e:  # noqa
            seams.append({**s, "error": str(e)}); continue
        ma, mb = mask(ia), mask(ib)
        dxa = int(round(s.get("shiftPxFrom") or 0)); dxb = int(round(s.get("shiftPxTo") or 0))
        ma, mb = np.roll(ma, dxa, axis=1), np.roll(mb, dxb, axis=1)   # сдвиг спрайта из контракта (shift.arrays), если он есть
        sa, sb = stats(ma), stats(mb)
        iou = (ma & mb).sum() / max(1, (ma | mb).sum())
        seams.append({**s, "iou": round(float(iou), 3), "dCx": round(sb["cx"] - sa["cx"], 2), "dBottom": sb["bottom"] - sa["bottom"],
                      "flag": bool(iou < 0.75 or abs(sb["bottom"] - sa["bottom"]) > 3 or abs(sb["cx"] - sa["cx"]) > 8)})
    seams_out[dog] = {"reference": ref, "seams": seams}

    # размеры в игровых пикселях: RACE_STAND и цикл RUN
    if A["kind"] == "labelled":
        stand_lab = c["clips"][c["windows"]["BASE"]["hold"]]["frame"]
        stand = stats(mask(cell(dog, A, "RACE_STAND", stand_lab)))
        run_frames = (c["clips"]["START"].get("loop") or [])
        run = [stats(mask(cell(dog, A, "START", l))) for l in run_frames]
    else:
        stand = stats(mask(cell(dog, A, "BASE", 0)))
        rc = c["clips"]["RUN"]
        run = [stats(mask(cell(dog, A, "RUN", rc["prologue"] + i))) for i in range(rc["loop"])]
    runm = {k: round(float(np.mean([r[k] for r in run])), 2) for k in ("w", "h", "area", "bottom")}
    runm["bottom_min"] = int(min(r["bottom"] for r in run)); runm["bottom_max"] = int(max(r["bottom"] for r in run))
    sizes_out[dog] = {"cell": [A["cellWidth"], A["cellHeight"]], "stretchedToSprite": (A["cellWidth"], A["cellHeight"]) != (SW, SH),
                      "raceStand": stand, "runLoopMean": runm}
os.makedirs(REP, exist_ok=True)
json.dump(seams_out, open(os.path.join(REP, "seams.json"), "w"), ensure_ascii=False, indent=1)
json.dump(sizes_out, open(os.path.join(REP, "sizes.json"), "w"), ensure_ascii=False, indent=1)
for dog, s in seams_out.items():
    fl = [x for x in s["seams"] if x.get("flag")]
    print(f"{dog:6} швов {len(s['seams'])}, заметных {len(fl)}, эталон IoU(RUN) мин {s['reference']['runLoopNeighbourIoU_min']}")
    for x in fl:
        print("    ", x["from"], ">", x["to"], f"[{x['windows']}]", "IoU", x["iou"], "dCx", x["dCx"], "dBottom", x["dBottom"])
for dog, s in sizes_out.items():
    print(dog, "STAND", {k: s["raceStand"][k] for k in ("w", "h", "area", "bottom")}, "RUN", s["runLoopMean"])
