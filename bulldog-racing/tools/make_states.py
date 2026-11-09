#!/usr/bin/env python3
"""STATES.md — таблица состояний пяти собак из manifest.json (статус, кадры, контракт)."""
import json, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LIB = os.path.join(ROOT, "assets", "dogs")
DOGS = [("frenk", "Фрэнк №1"), ("zefir", "Зефир №2"), ("rocky", "Рокки №3"), ("pups", "Пупс №4"), ("luna", "Луна №5")]
M = {d: json.load(open(os.path.join(LIB, d, "manifest.json"))) for d, _ in DOGS}
ICON = {"accepted": "✅", "accepted_working": "✅ раб.", "provisional": "🟡 предв.", "not_needed": "— не нужен", "not_accepted": "❌", "missing": "❌ нет"}
ORDER = ["FRONT_STAND", "IDLE", "SELECTED", "RETURN_TO_IDLE", "RACE_STAND", "START", "RUN", "STOP", "FINISH", "SNIFF_PEE+RETURN", "ROLL", "BUTTERFLY"]
L = ["# Состояния пяти собак", "",
     "✅ принято пользователем · ✅ раб. — принято как рабочее (игровой масштаб) · 🟡 — предварительно (финал в общей гонке). Кадры — число кадров alpha-файла (24 к/с), у Фрэнка/Зефира/Рокки/Луны STOP и др. собираются монтажом из таких кадров (см. `contract/*.contract.json`).", "",
     "| состояние | " + " | ".join(n for _, n in DOGS) + " |", "|---|" + "---|" * 5]
for st in ORDER:
    row = []
    for d, _ in DOGS:
        s = M[d]["states"][st]
        fr = "+".join(str(v["frames"]) for v in s["media"].values() if v["frames"]) if s["media"] else ""
        row.append(f"{ICON[s['status']]}" + (f" ({fr} к.)" if fr and st not in ("FRONT_STAND",) else ""))
    L.append(f"| {st} | " + " | ".join(row) + " |")
L += ["", "## Выход из IDLE к SELECTED", ""]
for d, n in DOGS:
    L.append(f"* **{n}**: " + (M[d]["selectionLogic"] or "модуля выбора в библиотеке нет — не написан/не принят") + f" · {M[d]['states']['IDLE']['note']}")
L += ["", "## Что лежит у каждой собаки", "", "`manifest.json` (состояния, файлы, кадры, статусы) · `SOURCES.lock.json` (откуда взят каждый файл: ветка, коммит, путь, sha256) · `alpha/` (мастера 1276×720) · `sources/` (оригиналы Kling) · `stills/` · `atlas/` (атлас + `atlas.json`) · `contract/` (контракт Race V3) · `runtime/`, `tools/`, `docs/`, `display.json`.", ""]
open(os.path.join(ROOT, "STATES.md"), "w").write("\n".join(L)); print("\n".join(L[:20]))
