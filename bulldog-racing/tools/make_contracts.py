#!/usr/bin/env python3
"""Единый атлас-индекс и контракты Race V3 (P3) для Зефира и Рокки.

Ничего не придумывает: кадры берутся из принятых атласов лабораторий и их списков монтажа
(Зефир: rhythm_variants.json[selected], stopB_montage_list.json; Рокки: retiming.json лабораторий).
Запуск: python3 bulldog-racing/tools/make_contracts.py
"""
import json, os

ROOT = os.path.join(os.path.dirname(__file__), "..", "assets", "dogs")


def J(*p):
    return json.load(open(os.path.join(ROOT, *p)))


def W(obj, *p):
    f = os.path.join(ROOT, *p)
    os.makedirs(os.path.dirname(f), exist_ok=True)
    json.dump(obj, open(f, "w"), ensure_ascii=False, indent=1)


# ------------------------------------------------------------------ Зефир
def zefir():
    z = "zefir"
    A = {k: J(z, "atlas", f) for k, f in dict(
        run="dog2_atlas.json", stop="dog2_stopB_atlas.json", roll="dog2_roll_atlas.json",
        bf="dog2_butterfly_atlas.json", sniff="dog2_sniff_atlas.json").items()}
    sheets, frames = {}, {}
    pref = dict(run=("run", "r"), roll=("roll", "o"), bf=("bf", "o"), sniff=("sniff", "s"))
    for name, a in A.items():
        sheets[name] = "atlas/" + os.path.basename(a["sheet"])
        for key, f in a["frames"].items():
            if name == "stop":
                label = ("stopS" if key[0] == "s" else "stopT") + key[1:]
            else:
                label = pref[name][0] + key[len(pref[name][1]):]
            frames[label] = {"sheet": name, "index": f["index"], "cx": f["cx"], "bottom": f["bottom"]}
    atlas = {"schema": "bulldog-atlas/v1", "kind": "labelled", "dog": "zefir", "cellWidth": 207, "cellHeight": 116,
             "columns": 24, "sheets": sheets, "frames": frames,
             "note": "Метки run<N>=RUN-кадр N из alpha, stopS<K>/stopT<K>=кадры STOP B (v2/v1), roll<N>, bf<N>, sniff<N>."}
    W(atlas, z, "atlas", "atlas.json")

    # --- клипы
    start = [f"run{n}" for n in range(30, 72)] + [f"run{n}" for n in range(96, 100)]
    loop = [f"run{n}" for n in range(88, 100)]
    ml = J(z, "atlas", "stopB_montage_list.json")
    stop = []
    for e in ml:
        L = e["label"]
        if L.startswith("RUN#"): stop.append("run" + L[4:])
        elif L.startswith("v2 k"): stop.append("stopS" + L[4:])
        elif L.startswith("v1 k"): stop.append("stopT" + L[4:])
        elif L.startswith("RACE_STAND"): stop.append("run30")
        else: raise SystemExit("неизвестная метка " + L)
    rv = J(z, "atlas", "rhythm_variants.json")
    sniff = ["run30" if x == "STAND" else "sniff" + x[1:] for x in rv["variants"][rv["selected"]]]
    roll = ["roll" + k[1:] for k in A["roll"]["clip"]]
    bf = ["bf" + k[1:] for k in A["bf"]["clip"]]
    for nm, seq in (("START", start), ("STOP", stop), ("SNIFF", sniff), ("ROLL", roll), ("BF", bf)):
        miss = [x for x in seq if x not in frames]
        if miss: raise SystemExit(f"{nm}: нет в атласе {miss[:5]}")
    contract = {
        "schema": "character-visual-contract/v1", "contractVersion": "zefir-1.0.0", "date": "2026-11-09",
        "character": "bulldog2-zefir", "fps": 24,
        "role": "Зефир (dog2) для неизменённого валидатора Race V3/P3. Кадры и порядок взяты из принятых лабораторий "
                "(STATUS.md 22.10.2026); контракт ничего не придумывает. Сдвиги спрайта (surge/стойка/STOP) — в display.json.",
        "assetStatus": {
            "RACE_STAND": "accepted_working: RUN #30 (STATUS.md, утверждён)",
            "START": "accepted_working: START B #30-#71 -> #96 (lead 0, STATUS.md)",
            "RUN": "accepted_working: RUN loop #88-#99",
            "STOP": "accepted_working: STOP B 37 кадров (stop_montage_v2/APPROVED.md)",
            "BUTTERFLY": "accepted_working: BUTTERFLY v2 b8-b109 + стойка",
            "ROLL": "accepted_working: ROLL v3 r10-r117 + стойка",
            "SNIFF_PEE": "accepted_working: SNIFF_PEE v1 монтаж V1S_SHORT_HOLD, 199 кадров + стойка (одним клипом через SNIFF_PEE+RETURN)",
            "RETURN": "merged into SNIFF_PEE"},
        "clips": {
            "RACE_STAND": {"sampler": "constant", "frame": "run30"},
            "START": {"sampler": "table", "fps": 24, "labels": start, "loop": loop},
            "STOP": {"sampler": "table", "fps": 24, "labels": stop},
            "BUTTERFLY": {"sampler": "table", "fps": 24, "labels": bf},
            "ROLL": {"sampler": "table", "fps": 24, "labels": roll},
            "SNIFF_PEE": {"sampler": "table", "fps": 24, "labels": sniff}},
        "windows": {
            "BASE": {"hold": "RACE_STAND"},
            "START": {"clip": "START", "lead": 0},
            "RUN": {"clip": "START", "spillFromStart": True},
            "STOP": {"clip": "STOP"}, "FINISH_DECELERATE": {"clip": "STOP"},
            "BUTTERFLY": {"body": "BUTTERFLY", "pad": "RACE_STAND"},
            "ROLL": {"body": "ROLL", "pad": "RACE_STAND"},
            "SNIFF_PEE": {"body": "SNIFF_PEE", "pad": "RACE_STAND"},
            "RETURN": {"mergeInto": "SNIFF_PEE"}},
        "keys": {"releaseIdx": 0, "visualJoinFirstRunIdx": 42, "runFrameAtJoin": 96},
        "run": {"cycle": {"firstSrc": 88, "lastSrc": 99, "frames": 12, "periodMustEqual_s": 0.5},
                "stopEntry": {"previousRunFrame": 88}},
        "limits": {"retimeRateBounds": [0.9, 1.12]},
        "shift": {"note": "в P3 читаются только массивы START по категориям скорости; у Зефира сдвиг START считается по формуле "
                          "surge (одинаково для всех категорий) — см. display.json"}}
    W(contract, z, "contract", "zefir.contract.json")
    return len(frames)


# ------------------------------------------------------------------ Рокки
def rocky():
    r = "rocky"
    # листы клипов (178×100, 24 в ряд) — как у Пупса; ячейка i = кадр i клипа
    counts = {"BASE": 1, "START": 40, "RUN": 23, "STOP": 37, "BUTTERFLY": 121, "ROLL": 145, "SNIFF_PEE": 240}
    files = {"BASE": "base.png", "START": "start.png", "RUN": "run.png", "STOP": "stop.png",
             "BUTTERFLY": "butterfly.png", "ROLL": "roll.png", "SNIFF_PEE": "sniff_pee.png"}
    atlas = {"schema": "bulldog-atlas/v1", "kind": "clip-indexed", "dog": "rocky", "cellWidth": 178, "cellHeight": 100,
             "columns": 24, "sprite": {"w": 207, "h": 116, "stretch": "x1.1629 / x1.16 (как у Пупса, решение сохранено)"},
             "clips": {k: {"sheet": "atlas/" + files[k], "count": counts[k]} for k in counts},
             "note": "SNIFF_PEE — один клип 240 кадров на оба окна SNIFF_PEE+RETURN (RETURN = реверс внутри клипа). "
                     "RUN: ячейки 0-10 = исходные #52-#62, 11-22 = цикл #61-#72 (см. runtime/phase.mjs sourceForCell)."}
    W(atlas, r, "atlas", "atlas.json")
    sn = J(r, "meta", "retiming_sniff.json")
    # частота: кадры SNIFF_PEE+RETURN = visualFrames 240 за 10 с
    contract = {
        "schema": "character-visual-contract/v1", "contractVersion": "rocky-1.1.0", "date": "2026-11-09",
        "character": "bulldog3-rocky", "fps": 24,
        "role": "Рокки (dog3) для неизменённого валидатора Race V3/P3, стиль Пупса (клипы по индексу ячейки). "
                "Кадр RUN перед STOP (#68) задаёт не P3, а runtime/phase_v2.mjs (frameRule ниже): без него P3 даёт #62.",
        "assetStatus": {
            "BASE": "accepted_working: RACE_STAND рабочая боковая (STATUS.md)",
            "START": "accepted_working: RACE_START #18-#41 (пользователь принял игровую версию)",
            "RUN": "accepted_working: RUN loop #61-#72; фазировка #68: phase.mjs (>=155 кадров, принят) + phase_v2.mjs (короткие, новое, ждёт глазной приёмки)",
            "STOP": "accepted_working: STOP 37 кадров (принят)",
            "BUTTERFLY": "accepted_working: BUTTERFLY v1 121 (полностью принят)",
            "ROLL": "accepted_working: ROLL v2 монтаж B 145 (окончательно принят)",
            "SNIFF_PEE": "provisional: SNIFF_PEE+RETURN 240 (предварительно принят, финал — в общей гонке)",
            "RETURN": "merged into SNIFF_PEE"},
        "clips": {
            "BASE": {"sampler": "constant", "frame": 0},
            "START": {"sampler": "bands", "bands": [[24, 72], [16, 24]], "count": 40},
            "RUN": {"sampler": "prologueLoop", "prologue": 11, "loop": 12},
            "STOP": {"sampler": "linear", "fps": 24, "count": 37, "eps": False},
            "BUTTERFLY": {"sampler": "linear", "fps": 24, "count": 121, "eps": False},
            "ROLL": {"sampler": "linear", "fps": 24, "count": 145, "eps": False},
            "SNIFF_PEE": {"sampler": "linear", "fps": 24, "count": 240, "eps": False}},
        "windows": {
            "BASE": {"hold": "BASE"},
            "START": {"clip": "START", "lead": 0},
            "RUN": {"clip": "RUN"},
            "STOP": {"clip": "STOP"}, "FINISH_DECELERATE": {"clip": "STOP"},
            "BUTTERFLY": {"body": "BUTTERFLY"},
            "ROLL": {"body": "ROLL"},
            "SNIFF_PEE": {"body": "SNIFF_PEE", "pad": "BASE", "rate": 1.0019},
            "RETURN": {"mergeInto": "SNIFF_PEE"}},
        "limits": {"retimeRateBounds": [0.9, 1.12]},
        "frameRule": {"module": "runtime/phase_v2.mjs", "required": True, "window": "RUN", "stopEntrySourceFrame": 68,
                      "what": "порядок показа ячеек цикла RUN: 6 однокадровых пропусков, чтобы последним кадром перед STOP/FINISH был исходный #68; "
                              "RUN >= 155 кадров — принятый phase.mjs без изменений, короче — phase_v2 (схемы T1/T2/T3)"},
        "rateNote": "SNIFF_PEE 240 кадров против окна SNIFF_PEE+RETURN 239.55 кадра: ускорение x1.0019 (в пределах 0.9-1.12), "
                    "кадры и порядок не меняются."}
    W(contract, r, "contract", "rocky.contract.json")


# ------------------------------------------------------------------ Фрэнк, Пупс (только единый индекс атласа)
def frenk():
    import shutil
    src = os.path.join(ROOT, "frenk", "integration", "atlas")
    dst = os.path.join(ROOT, "frenk", "atlas")
    os.makedirs(dst, exist_ok=True)
    for f in os.listdir(src):
        if f.endswith(".png"):
            shutil.copyfile(os.path.join(src, f), os.path.join(dst, f))
    a = J("frenk", "integration", "atlas", "frenk_atlas.json")
    a.update({"schema": "bulldog-atlas/v1", "kind": "labelled", "dog": "frenk"})
    W(a, "frenk", "atlas", "atlas.json")


def pups():
    m = J("pups", "atlas", "manifest.json")
    clips = {k: {"sheet": "atlas/" + os.path.basename(v["file"]), "count": v["frames"]} for k, v in m["clips"].items()}
    W({"schema": "bulldog-atlas/v1", "kind": "clip-indexed", "dog": "pups", "cellWidth": 178, "cellHeight": 100, "columns": 24,
       "sprite": {"w": 207, "h": 116, "stretch": "x1.1629 / x1.16 (решение сохранено)"}, "clips": clips,
       "note": "SNIFF_PEE и RETURN — два клипа (229 + 109), как в dog4-v3-lab."}, "pups", "atlas", "atlas.json")


if __name__ == "__main__":
    print("Зефир: кадров в атласе", zefir())
    rocky()
    frenk()
    pups()
    print("Рокки, Фрэнк, Пупс: готово")
