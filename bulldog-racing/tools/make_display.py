#!/usr/bin/env python3
"""Пишет display.json каждой собаки и reports/SIZE_COMPARISON.md из замеров (reports/sizes.json, seams.json).
Правила отображения (якорь, дорожка, сдвиги, масштаб) — в DISPLAY_CONTRACT.md (пишется вручную, числа берёт отсюда)."""
import json, os
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
LIB = os.path.join(ROOT, "assets", "dogs")
sizes = json.load(open(os.path.join(ROOT, "reports", "sizes.json")))
NAMES = {"frenk": "Фрэнк №1", "zefir": "Зефир №2", "rocky": "Рокки №3", "pups": "Пупс №4", "luna": "Луна №5"}
LAYOUT = {"canvas": [1920, 1080], "startX": 406, "finishX": 1484, "finishControlOffset": 92, "laneTop": 260, "laneStep": 159,
          "sprite": {"w": 207, "h": 116, "anchorX": 148, "topOffset": 110}}
SHIFT_RULES = {
    "frenk": "массивы START по категории скорости + массивы STOP по категории + стационарный сдвиг от последнего STOP (contract/frenk_*_shift_arrays.json, единицы — px исходного кадра 1276)",
    "zefir": "стойка и действия: сдвиг стойки (cxRun − cx(run30)); START: гашение качания корпуса, сдвиг = −(cx − cxRun)·(1 − smoothstep(k/42)); STOP: сдвиги монтажа stopB_montage_list.json с плавным выходом на сдвиг стойки",
    "rocky": "нет сдвигов; поправка КАДРА RUN перед STOP (runtime/phase.mjs, шесть пропусков #65), P3 её не выражает; сдвиг входа STOP запечён в атлас",
    "pups": "нет",
    "luna": "contract/stop_shift.json: сдвиг на каждый кадр STOP (37 + хвост 22), вход 0, выход ≈ −1 px; остальное 0",
}
mean_len_others = lambda d: float(np.mean([sizes[x]["runLoopMean"]["w"] for x in sizes if x != d]))
mean_area_others = lambda d: float(np.mean([sizes[x]["runLoopMean"]["area"] for x in sizes if x != d]))
rows = []
for d, s in sizes.items():
    st, rn = s["raceStand"], s["runLoopMean"]
    info = {
        "dog": d, "name": NAMES[d], "schema": "bulldog-display/v1", "layout": LAYOUT,
        "atlasCell": s["cell"], "stretchedToSprite": s["stretchedToSprite"],
        "scale": 1.0, "scaleNote": "Луна остаётся 1.0; возможное ×0.93 проверить позднее в общей гонке" if d == "luna" else "1.0",
        "pawLine": {"laneRowInSprite": LAYOUT["sprite"]["topOffset"], "raceStandBottomRow": st["bottom"],
                    "raceStandOffsetPx": LAYOUT["sprite"]["topOffset"] - st["bottom"],
                    "runBottomRowMin": rn["bottom_min"], "runBottomRowMax": rn["bottom_max"],
                    "runBelowLanePx": max(0, rn["bottom_max"] - LAYOUT["sprite"]["topOffset"])},
        "sizeGamePx": {"raceStand": {k: st[k] for k in ("w", "h", "area")}, "runLoopMean": {k: rn[k] for k in ("w", "h", "area")}},
        "runLengthVsOthersMean": round(rn["w"] / mean_len_others(d), 3),
        "runAreaVsOthersMean": round(rn["area"] / mean_area_others(d), 3),
        "spriteShiftRule": SHIFT_RULES[d],
        "highResSource": {"alphaFrame": [1276, 720], "gameToSourceFactor": round(1276 / 207, 3),
                          "note": "для атласа крупнее перестроить из alpha в library (каталог alpha/); для Пупса и Рокки исходные ячейки 178×100 растянуты ×1.163 — перестройка из alpha даст чётче"},
    }
    json.dump(info, open(os.path.join(LIB, d, "display.json"), "w"), ensure_ascii=False, indent=1)
    rows.append(info)

L = ["# Сравнение размеров собак в игровых пикселях (спрайт 207×116)", "",
     "Замер по силуэтам атласов (alpha ≥ 128). Ячейки Пупса и Рокки 178×100 растянуты в 207×116 так же, как рисует игра. "
     "RUN — среднее по 12 кадрам цикла. Линия лап: строка спрайта 110 = линия дорожки.", "",
     "| собака | стойка w×h | RUN длина | RUN высота | RUN площадь | длина к остальным | площадь к остальным | лапы стойки (строка) | лапы RUN мин–макс |",
     "|---|---|---|---|---|---|---|---|---|"]
for i in rows:
    st, rn, pl = i["sizeGamePx"]["raceStand"], i["sizeGamePx"]["runLoopMean"], i["pawLine"]
    L.append(f"| {i['name']} | {st['w']}×{st['h']} | {rn['w']} | {rn['h']} | {int(rn['area'])} | ×{i['runLengthVsOthersMean']} | ×{i['runAreaVsOthersMean']} | {pl['raceStandBottomRow']} | {pl['runBottomRowMin']}–{pl['runBottomRowMax']} |")
luna = next(i for i in rows if i["dog"] == "luna")
w93 = luna["sizeGamePx"]["runLoopMean"]["w"] * 0.93
L += ["", f"Луна при ×0.93 (проверка позже, не применено): RUN длина ≈ {w93:.1f}, площадь ≈ {luna['sizeGamePx']['runLoopMean']['area']*0.93**2:.0f}.", ""]
open(os.path.join(ROOT, "reports", "SIZE_COMPARISON.md"), "w").write("\n".join(L))
print("\n".join(L))
