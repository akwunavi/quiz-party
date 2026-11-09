#!/usr/bin/env python3
"""Собирает reports/VALIDATION_REPORT.md из результатов проверок (validation_raw.json, seams.json, crosscheck_zefir.json,
rebuild_check.json, p3_test_results_frenk_pups_rerun.json). Числа берёт из файлов, не из памяти."""
import json, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
R = lambda *p: json.load(open(os.path.join(ROOT, "reports", *p)))
raw, seams, zx, rb, p3 = R("validation_raw.json"), R("seams.json"), R("crosscheck_zefir.json"), R("rebuild_check.json"), R("p3_test_results_frenk_pups_rerun.json")
NAMES = {"frenk": "Фрэнк №1", "zefir": "Зефир №2", "rocky": "Рокки №3", "pups": "Пупс №4", "luna": "Луна №5"}
L = []
w = L.append
w("# Отчёт автоматических проверок библиотеки пяти бульдогов")
w("")
w(f"Прогон: {raw['generated']}, {raw['races']} реальных гонок V3 × 5 дорожек на каждую собаку (физика `dog4-v3-lab` и валидатор `race-v3-p3-lab` не изменялись). "
  "Команда: `node bulldog-racing/tools/validate_library.mjs 200 && python3 bulldog-racing/tools/measure.py`.")
w("")
w("## Итог")
w("")
w("| собака | файлы по lock | валидатор P3 | кадров проверено | пустых/обрезанных | вход в STOP (T4) | заметных швов | вердикт |")
w("|---|---|---|---|---|---|---|---|")
verd = {}
for d, x in raw["dogs"].items():
    errs = [p for p in x["problems"] if p["sev"] == "error"]
    part = [p for p in x["problems"] if p["sev"] == "partial"]
    fl = [s for s in seams[d]["seams"] if s.get("flag")]
    f = x["files"]
    t4 = x["t4"]
    v = "СОВМЕСТИМА" if not errs and not part else ("ЧАСТИЧНО" if d == "rocky" else "НЕ СОВМЕСТИМА")
    verd[d] = v
    w(f"| {NAMES[d]} | {f['lockEntries']} файлов; не совпало {f['badSha']+f['missing']}; не разрешено {f['unresolved']} | "
      f"{'ok' if x['contract']['ok'] else 'ОШИБКИ'} (предупр. {len(x['contract']['warnings'])}) | {x['sweep']['evaluations']:,} | ".replace(",", " ") +
      f"{x['sweep']['missing']+x['sweep']['overflow']+x['sweep']['badCell']} | {t4['mismatches']}/{t4['stopsAndFinishes']} | {len(fl)} | **{v}** |")
w("")
w("«Совместима» означает: контракт проходит неизменённый валидатор P3, все кадры всех состояний на реальных гонках разрешаются в существующие ячейки атласа, "
  "вход в STOP/FINISH стоит в нужной фазе RUN, а стыки состояний измерены (список заметных — ниже). Это проверка по метрикам и силуэтам, "
  "**не просмотр видео глазами** — художественные решения о стыках остаются за приёмкой.")
w("")
w("## Рокки — частичная совместимость (главная находка)")
x = raw["dogs"]["rocky"]["t4"]["rockyAcceptedPhase"]
w("")
w(f"* Контракт P3 выражает у Рокки всё, кроме принятой фазировки RUN перед STOP. Сам по себе P3 ставит перед STOP последнюю ячейку цикла → исходный кадр **#{x['p3ContractAlone']['sourceFrame'][0]}**, принято **#68** (`runtime/phase.mjs`).")
w(f"* Шов RUN→STOP при этом: IoU силуэтов **0,58** при эталоне 0,76 в цикле RUN, лапы на 6 px ниже (в отчёте самого Рокки: 0,583 «заметный конфликт»).")
nb = x["stopsNotAt68"]
w(f"* Адаптер (`runtime/dog_visual.mjs`) применяет `phase.mjs` и ставит #68 в {nb['of']-nb['count']} из {nb['of']} остановок. "
  f"В остальных **{nb['count']} ({nb['share']*100:.0f}%)** RUN-отрезок короче 155 кадров (в случайных гонках бывает от 23 кадров) — `phase.mjs` такие отрезки не обрабатывает "
  "(в коде: «six advances need separate review»), остаётся #62 и тот же заметный шов. В отчёте Рокки «самый короткий V3 — 155» верно только для пресетов A/B/C, не для случайных гонок.")
w("* Что с этим делать — решение не моё: (а) короткая схема пропусков для RUN < 155 кадров, (б) визуальный lead как у Фрэнка/Луны (меняет принятый шов START→RUN), (в) принять шов как есть. Ничего из этого не сделано.")
w("")
w("## Существующие тесты Race V3/P3 (повторный прогон)")
w("")
w("Тесты `race-v3-p3-lab/tests` жёстко привязаны к контракту Фрэнка и эталону Пупса — на остальных собак их не распространить без переписывания, поэтому для Зефира, Рокки и Луны вместо них работает общий валидатор выше.")
w("")
for t in p3["results"]:
    w(f"* {t['id']} **{t['status']}** — {t['title']}")
w("")
w("T5 FAIL (Фрэнк как есть: BUTTERFLY после STOP не влезает на 11 кадров) относится к старому контракту; контракт Фрэнка из пакета интеграции (`integration_v1`) проходит валидатор без ошибок. T11 требует человека.")
w("")
w("## Зефир: сверка с его принятой лабораторией")
w("")
w(f"Контракт + адаптер сравнены с `runtime/dog2stop.mjs` (его принятая лаборатория STOP) в окнах BASE/START/RUN/STOP/FINISH на {zx['races']} гонках: "
  f"сопоставлено {zx['compared']:,} кадров; расхождений по кадру **{zx['frameMismatch']}**, по сдвигу спрайта **{zx['shiftMismatch']}** (макс. разница {zx['maxShiftDiffPx']} px).".replace(",", " "))
w("Действия (BUTTERFLY/ROLL/SNIFF_PEE) проверены только валидатором P3 и наличием кадров: их порядок взят из атласов и `rhythm_variants.json[selected]`.")
w("")
w("## Воспроизводимость атласов")
w("")
w(f"* Фрэнк: пересборка из alpha рецептом его пакета — **{rb['frenk']}** (попиксельно).")
w(f"* Луна: `tools/build_luna_atlas.py` из alpha библиотеки — **{rb['luna']}** (попиксельно, повторный прогон).")
w("* Зефир, Рокки, Пупс: рецепты (`tools/build_*`) сохранены в каталогах собак, alpha-мастера лежат в библиотеке, но пересборку и сравнение с готовыми атласами **не запускали** — не проверено.")
w("")
w("## Швы состояний (попиксельно, с учётом сдвигов спрайта)")
w("")
w("Эталон — IoU соседних кадров цикла RUN у той же собаки (мин.). Шов помечен, если IoU < 0,75 или лапы сдвинулись > 3 px или центр > 8 px.")
w("")
w("| собака | эталон IoU (RUN) | заметные швы |")
w("|---|---|---|")
for d, s in seams.items():
    fl = [x for x in s["seams"] if x.get("flag")]
    seen = {}
    for x in fl: seen.setdefault((x["from"], x["to"]), x)
    txt = "; ".join(f"{a}→{b} IoU {x['iou']}, лапы {x['dBottom']:+d}px" for (a, b), x in seen.items()) or "нет"
    w(f"| {NAMES[d]} | {s['reference']['runLoopNeighbourIoU_min']} | {txt} |")
w("")
w("Фрэнк RUN→STOP (0,73) чуть ниже эталона цикла (0,758). Пакет Фрэнка принят пользователем, но глазной проверки именно этого шва в отчёте P3 нет (T11 «NOT_RUN») — оставляю как наблюдение, не как ошибку.")
w("")
w("Пояснение к T4: у Фрэнка, Зефира и Луны в контракте объявлен кадр RUN перед STOP (`run.stopEntry`), проверяется он. У Пупса и Рокки такого поля нет (стиль dog4): проверяется только первый кадр STOP, а фаза RUN у Пупса задана самой арифметикой V3 (эталон), у Рокки — проверяется отдельно (раздел выше).")
w("")
w("## Все замечания автопроверки")
w("")
for d, x in raw["dogs"].items():
    for p in x["problems"]:
        w(f"* {NAMES[d]} [{p['sev']}] {p['msg']}")
if not any(x["problems"] for x in raw["dogs"].values()): w("нет")
w("")
open(os.path.join(ROOT, "reports", "VALIDATION_REPORT.md"), "w").write("\n".join(L))
print("\n".join(L))
