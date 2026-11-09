#!/usr/bin/env python3
"""Сравнение фаз RUN Рокки до/после по реальным силуэтам атласа. Пишет reports/ROCKY_PHASE_EVAL.md и .json.
usage: rocky_phase_eval.py   (из корня репозитория; нужен node)"""
import json, os, subprocess
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, "..")
A = os.path.join(ROOT, "assets", "dogs", "rocky", "atlas")
W, H = 178, 100
run = np.asarray(Image.open(os.path.join(A, "run.png")).convert("RGBA")); stop = np.asarray(Image.open(os.path.join(A, "stop.png")).convert("RGBA"))
M = [run[:, c*W:(c+1)*W, 3] >= 128 for c in range(23)]; S0 = stop[0:H, 0:W, 3] >= 128
bot = lambda m: int(np.nonzero(m)[0].max()); iou = lambda a, b: (a & b).sum() / (a | b).sum()
src = lambda c: 52 + c if c < 11 else 61 + ((c - 11 + 2) % 12)
seqs = json.loads(subprocess.run(["node", os.path.join(HERE, "rocky_phase_dump.mjs")], capture_output=True, text=True, check=True).stdout)
rows = []
def metrics(s):
    tr = [iou(M[a], M[b]) for a, b in zip(s, s[1:])]
    skips = sum(1 for a, b in zip(s[11:], s[12:]) if ((b - a) % 12) == 2)
    rep = sum(1 for a, b in zip(s, s[1:]) if a == b)
    L = s[-1]; loop = len(s) - 11
    return {"lastSource": src(L), "minStepIoU": round(float(min(tr)), 3), "stepsBelow072": int(sum(t < .72 for t in tr)), "meanStepIoU": round(float(np.mean(tr)), 3),
            "stopSeamIoU": round(float(iou(M[L], S0)), 3), "stopSeamDBottom": bot(S0) - bot(M[L]), "skips": skips, "repeats": rep,
            "cadence": round((loop + skips) / loop, 3) if loop else 1.0}
for n, v in seqs.items():
    r = {"n": int(n), "tier": (v["plan"] or {}).get("tier"), "skipCells": (v["plan"] or {}).get("cells"), "before": metrics(v["natural"]), "after": metrics(v["v2"])}
    if "accepted" in v: r["identicalToAccepted"] = v["accepted"] == v["v2"]
    rows.append(r)
json.dump(rows, open(os.path.join(ROOT, "reports", "ROCKY_PHASE_EVAL.json"), "w"), ensure_ascii=False, indent=1)
L = ["# Рокки: фаза RUN перед STOP — до и после", "",
     "«До» — натуральный цикл P3 (перед STOP #62). «После» — `runtime/phase_v2.mjs`. Метрики — по силуэтам ячеек атласа Рокки (alpha ≥ 128). "
     "IoU шага — схожесть соседних показанных кадров (в обычном галопе 0,757–0,846); шов STOP — схожесть последнего кадра RUN с первым кадром STOP; "
     "темп = (кадров цикла + пропусков) / кадров цикла.", "",
     "| RUN (кадров) | схема | пропуски после ячеек | до: кадр / шов STOP / лапы | после: кадр / шов STOP / лапы | после: мин. IoU шага, шагов < 0,72 | темп | повторов кадров |",
     "|---|---|---|---|---|---|---|---|"]
for r in rows:
    b, a = r["before"], r["after"]
    tier = r["tier"] if r["n"] < 155 else "принятый phase.mjs" + (" (совпадает побайтно)" if r.get("identicalToAccepted") else " ⚠ НЕ СОВПАДАЕТ")
    L.append(f"| {r['n']} | {tier} | {','.join(map(str, r['skipCells'] or [])) if r['n'] < 155 else '…'} | #{b['lastSource']} / {b['stopSeamIoU']} / {b['stopSeamDBottom']:+d}px | #{a['lastSource']} / {a['stopSeamIoU']} / {a['stopSeamDBottom']:+d}px | {a['minStepIoU']}, {a['stepsBelow072']} | ×{a['cadence']} | {a['repeats']} |")
L += ["", "## Альтернативы для самых коротких пробегов (замер по тем же силуэтам)", "",
      "| RUN | вариант | кадр перед STOP | шов STOP IoU / лапы | мин. IoU шага | шагов < 0,72 | вывод |", "|---|---|---|---|---|---|---|",
      "| 23 | ничего не делать (натуральный цикл) | #62 | 0,579 / +5 | 0,757 | 0 | единственный, но плохой шов (отвергнут: заведомо худший вход в торможение) |",
      "| 23 | 6 пропусков, первый сразу после шва (**выбран**) | #68 | 0,841 / 0 | 0,694 | 1 | принятый вход; темп ×1,5 на ≈1 с |",
      "| 23 | 5 пропусков → вход в #67 | #67 | 0,759 / −2 | 0,694 | 3 | кадр не принятый, шагов хуже, выигрыш в темпе ничтожный (×1,45) — отвергнут |",
      "| 35 | 6 пропусков, T3 (**выбран**) | #68 | 0,841 / 0 | 0,694 | 4 | принятый вход; темп ×1,25 |",
      "| 35 | 5 пропусков → вход в #67 | #67 | 0,759 / −2 | 0,684 | 2 | на 2 слабых шага меньше, но вход не в принятый #68 — не принят |", "",
      "Другие пути, которые не годятся без изменения утверждённого материала: удлинить цикл повторами кадров (≡ −6, лапы «застывают», 6 повторов на 11 шагов); сдвинуть START (lead 6 меняет принятый шов START→RUN и физические окна); менять кадры RUN/STOP. "
      "Если глазом шаг ×1,5/×1,25 окажется неприемлем, выключатель `CONFIG.minCorrectedCells` вернёт натуральный цикл для коротких отрезков (с прежним швом 0,58).", ""]
open(os.path.join(ROOT, "reports", "ROCKY_PHASE_EVAL.md"), "w").write("\n".join(L) + "\n"); print("\n".join(L))
