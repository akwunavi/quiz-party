#!/usr/bin/env python3
"""manifest.json каждой собаки: состояния, файлы, кадры/длительность (считаются декодом alpha), статус приёмки, источники.
Статусы — из решений пользователя и STATUS/MANIFEST собак (источник указан в statusSource); новых решений не принимает.
usage: make_manifests.py"""
import json, os, subprocess, re

HERE = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(HERE, "..", "assets", "dogs")
FPS = 24
ACC = "accepted"        # принято пользователем
ACCW = "accepted_working"  # принято как рабочее (в игровом масштабе)
PROV = "provisional"    # предварительно, финальная проверка в общей гонке
NOT = "not_accepted"
MISSING = "missing"

_cache = {}


def frames_of(dog, rel):
    k = (dog, rel)
    if k in _cache: return _cache[k]
    p = os.path.join(LIB, dog, rel)
    if rel.endswith(".png"): n = 1
    else:
        r = subprocess.run(["ffmpeg", "-v", "info", "-c:v", "libvpx-vp9", "-i", p, "-f", "null", "-"], capture_output=True, text=True)
        m = re.findall(r"frame=\s*(\d+)", r.stderr); n = int(m[-1]) if m else None
    _cache[k] = n; return n


def S(status, src, files=(), clip=None, note="", frames_play=None):
    return {"status": status, "statusSource": src, "files": list(files), "contractClip": clip, "note": note, "framesPlay": frames_play}


SPEC = {
 "frenk": dict(name="Фрэнк", number=1, techId="bulldog1-frenk", states={
   "FRONT_STAND": S(ACC, "MANIFEST approved_set", ["stills/DOG1_FRONT_STAND_alpha_frame0.png"], note="вне контракта V3"),
   "IDLE": S(ACC, "MANIFEST approved_set (v1, 2026-10-15)", ["alpha/DOG1_IDLE_v1_alpha_loop220.webm"], note="петля 220 кадров"),
   "SELECTED": S(ACC, "MANIFEST approved_set", ["alpha/DOG1_SELECTED_v1_alpha_f20-f121.webm", "alpha/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm"], note="вход из любого кадра IDLE: runtime/selection.mjs (entry A, ожидание до 106 кадров)"),
   "RETURN_TO_IDLE": S(ACC, "MANIFEST approved_set", ["alpha/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm"]),
   "RACE_STAND": S(ACC, "MANIFEST approved_set (v3)", ["alpha/DOG1_RACE_STAND_v3_alpha_1276.webm", "stills/DOG1_RACE_STAND_v3_2720x1536.png"], "RACE_STAND"),
   "START": S(ACCW, "MANIFEST approved_set", ["alpha/DOG1_RACE_START_v1_alpha.webm", "alpha/DOG1_RACE_START_gen3_alpha.webm"], "START", "lead 3"),
   "RUN": S(ACC, "MANIFEST approved_set", ["alpha/dog1-run-alpha.webm"], "START", "цикл run87..run98 (12 кадров)"),
   "STOP": S(ACCW, "MANIFEST approved_set (STOP V4)", ["alpha/DOG1_STOP_v4_alpha_k38-k73.webm"], "STOP"),
   "FINISH": S(ACCW, "MANIFEST approved_set", [], "FINISH_DECELERATE", "= STOP V4 (решение 2026-10-15)"),
   "SNIFF_PEE+RETURN": S(ACCW, "MANIFEST approved_set (V3.2 EVENT)", ["alpha/DOG1_SNIFF_PEE_V3_2_EVENT_alpha_v3_ribbonfix.webm"], "SNIFF_PEE", "RETURN слит в клип"),
   "ROLL": S(ACCW, "MANIFEST approved_set", ["alpha/DOG1_ROLL_v1_alpha.webm"], "ROLL"),
   "BUTTERFLY": S(ACCW, "MANIFEST approved_set", ["alpha/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm"], "BUTTERFLY", "бабочку рисует игра; траектория — только предложение")}),
 "zefir": dict(name="Зефир", number=2, techId="bulldog2", states={
   "FRONT_STAND": S(ACC, "STATUS.md: FRONT_STAND = RUN #0 = IDLE f1 = SELECTED f1", [], note="отдельного файла нет: кадр f1 из IDLE-alpha (в цепочке используется f4); PNG не создавался"),
   "IDLE": S(ACC, "STATUS.md", ["alpha/DOG2_IDLE_MAIN_L1_alpha_loop131.webm", "alpha/DOG2_IDLE_alpha_f1-f121.webm"], note="MAIN_L1 петля 131 кадр; f1-f121 — путь выхода"),
   "SELECTED": S(ACC, "STATUS.md", ["alpha/DOG2_SELECTED_alpha_f1-f121.webm"], note="играется s4–s121 (118 кадров)"),
   "RETURN_TO_IDLE": S(ACC, "STATUS.md", ["alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm"]),
   "RACE_STAND": S(ACC, "STATUS.md", ["alpha/DOG2_RUN_alpha_src28-100.webm"], "RACE_STAND", "кадр RUN #30 со сдвигом стойки"),
   "START": S(ACC, "STATUS.md (START B)", ["alpha/DOG2_RUN_alpha_src28-100.webm"], "START", "lead 0; кадры #30–#71 → #96"),
   "RUN": S(ACC, "STATUS.md", ["alpha/DOG2_RUN_alpha_src28-100.webm"], "START", "цикл #88–#99"),
   "STOP": S(ACC, "STATUS.md (STOP B, stop_montage_v2/APPROVED.md)", ["alpha/DOG2_STOP_v2_alpha_k27-k40.webm", "alpha/DOG2_STOP_v1_alpha_k66-k73.webm"], "STOP", "монтаж 37 кадров: RUN #89-#96 + v2 k27-k40 + v1 k66-k73 + стойка"),
   "FINISH": S(ACC, "STATUS.md", [], "FINISH_DECELERATE", "= STOP B"),
   "SNIFF_PEE+RETURN": S(ACC, "STATUS.md (V1S_SHORT_HOLD)", ["alpha/DOG2_SNIFF_PEE_v1_alpha_s1-s193.webm"], "SNIFF_PEE", "один клип 199 кадров на оба окна"),
   "ROLL": S(ACC, "STATUS.md (ROLL v3)", ["alpha/DOG2_ROLL_v3_alpha_r1-r121.webm"], "ROLL"),
   "BUTTERFLY": S(ACC, "STATUS.md (BUTTERFLY v2)", ["alpha/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm"], "BUTTERFLY", "бабочку рисует игра")}),
 "rocky": dict(name="Рокки", number=3, techId="bulldog3", states={
   "FRONT_STAND": S(ACC, "STATUS.md 23.10.2026 (idle-alpha-lab/APPROVED.md)", ["stills/DOG3_FRONT_STAND_ALPHA.png"]),
   "IDLE": S(ACC, "STATUS.md 23.10.2026 (IDLE B, 240 кадров)", ["alpha/DOG3_IDLE_B_ALPHA_240.webm"], note="выход из IDLE: лаборатория idle-exit-lab (макс. 3,79 с) — НЕ принята для production, модуля выбора в библиотеке нет"),
   "SELECTED": S(ACC, "STATUS.md 23.10.2026 (коммит f401530)", ["alpha/DOG3_SELECTED_ALPHA_121.webm"]),
   "RETURN_TO_IDLE": S(ACCW, "STATUS.md (вариант D, рабочий)", ["alpha/DOG3_RETURN_D_ALPHA_97.webm"]),
   "RACE_STAND": S(ACCW, "STATUS.md (рабочая боковая стойка)", ["alpha/rocky-race-stand-alpha.png", "stills/DOG3_RACE_STAND_GENERATED_01.png"], "BASE"),
   "START": S(ACC, "STATUS.md (игровая версия принята)", ["alpha/rocky-race-start-alpha-24.webm"], "START", "кадры Kling #18–#41, 40 ячеек"),
   "RUN": S(ACC, "STATUS.md (петля #61–72; фазировка #68 принята)", ["alpha/bulldog_03_run_alpha_v2.webm"], "RUN", "кадр перед STOP (#68): runtime/phase_v2.mjs (до 155 кадров — новая схема, ждёт глазной приёмки; от 155 — принятый phase.mjs)"),
   "STOP": S(ACC, "STATUS.md", ["alpha/rocky-stop-alpha-37.webm", "sources/DOG3_STOP_KLING_V3_ORIGINAL.mp4"], "STOP", "исходник восстановлен с ветки claude/nifty-johnson-assbj5"),
   "FINISH": S(ACC, "STATUS.md", [], "FINISH_DECELERATE", "= STOP"),
   "SNIFF_PEE+RETURN": S(PROV, "STATUS.md (предварительно; финал в общей гонке)", ["alpha/DOG3_SNIFF_PEE_ALPHA_240.webm"], "SNIFF_PEE", "240 кадров на оба окна; ускорение ×1.0019"),
   "ROLL": S(ACC, "STATUS.md (монтаж B)", ["alpha/DOG3_ROLL_V2_B_ALPHA_145.webm"], "ROLL"),
   "BUTTERFLY": S(ACC, "STATUS.md", ["alpha/rocky-butterfly-alpha-121.webm"], "BUTTERFLY")}),
 "pups": dict(name="Пупс", number=4, techId="bulldog4 / dog4", states={
   "FRONT_STAND": S(ACC, "MANIFEST (G0)", ["stills/G0_FRONT_STAND_alpha_1276.png"]),
   "IDLE": S(ACC, "MANIFEST (G1)", ["alpha/DOG4_IDLE_v1_alpha_loop240.webm"], note="выход: integration/runtime/dog4_selection.mjs (до 3,62 с)"),
   "SELECTED": S(ACC, "MANIFEST (v4)", ["alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm"]),
   "RETURN_TO_IDLE": S("not_needed", "MANIFEST: SELECTED кончается в G0", []),
   "RACE_STAND": S(ACC, "MANIFEST", ["alpha/race_RACE_STAND__DOG4_BASE_STAND.png"], "BASE", "мастер без alpha (RGB)"),
   "START": S(ACC, "MANIFEST (тайминг рабочий)", ["alpha/race_START__dog4-start-alpha.webm"], "START"),
   "RUN": S(ACC, "MANIFEST (цикл #11–22 рабочий)", ["alpha/race_RUN__dog4-run-alpha.webm"], "RUN"),
   "STOP": S(ACC, "MANIFEST", ["alpha/race_STOP__dog4_stop_alpha.webm"], "STOP"),
   "FINISH": S(ACCW, "MANIFEST (рабочий)", [], "FINISH_DECELERATE", "= STOP, затем BASE"),
   "SNIFF_PEE+RETURN": S(ACCW, "MANIFEST (движение принято, тайминг рабочий)", ["alpha/race_SNIFF_PEE__dog4_sniff_pee_optimized_alpha.webm", "alpha/race_RETURN__dog4_return_A_alpha.webm"], "SNIFF_PEE+RETURN", "два клипа 229 + 109"),
   "ROLL": S(ACCW, "MANIFEST (хореография принята, стыки рабочие)", ["alpha/race_ROLL__dog4_roll_alpha.webm"], "ROLL"),
   "BUTTERFLY": S(ACCW, "MANIFEST (рабочий; бабочка вырезана маской)", ["alpha/race_BUTTERFLY__dog4_butterfly_alpha.webm"], "BUTTERFLY")}),
 "luna": dict(name="Луна", number=5, techId="bulldog5-luna / dog5", states={
   "FRONT_STAND": S(ACC, "пользователь 2026-11-09", ["stills/DOG5_FRONT_STAND_alpha_f0_1276.png"]),
   "IDLE": S(ACC, "пользователь 2026-11-09 (IDLE A)", ["alpha/DOG5_IDLE_alpha_f0-f120.webm"], note="вариант A: f0→f48→f1 (96 кадров), ворота f0–f3; модуль выхода не написан"),
   "SELECTED": S(ACC, "пользователь 2026-11-09", ["alpha/DOG5_SELECTED_alpha_s0-s120.webm"]),
   "RETURN_TO_IDLE": S(ACC, "пользователь 2026-11-09", ["alpha/DOG5_RETURN_TO_IDLE_G1_alpha_graded.webm"]),
   "RACE_STAND": S(ACC, "пользователь 2026-11-09", ["stills/DOG5_RACE_STAND_G1_alpha_1276.png"], "RACE_STAND", "игровой кадр = кадр 0 RUN G1"),
   "START": S(ACC, "пользователь 2026-11-09 (из RUN)", ["alpha/DOG5_RUN_G1_alpha_f0-f120.webm"], "START", "lead 7, кадры #18–#71"),
   "RUN": S(ACC, "пользователь 2026-11-09", ["alpha/DOG5_RUN_G1_alpha_f0-f120.webm"], "START", "цикл #60–#71"),
   "STOP": S(ACC, "пользователь 2026-11-09", ["alpha/DOG5_STOP_G1_alpha.webm", "contract/stop_shift.json"], "STOP", "37 + хвост 22"),
   "FINISH": S(ACC, "пользователь 2026-11-09", [], "FINISH_DECELERATE", "= STOP + хвост"),
   "SNIFF_PEE+RETURN": S(ACC, "пользователь 2026-11-09 (исправленная вставка)", ["alpha/DOG5_SNIFF_PEE_RETURN_FIXED_alpha_193f.webm"], "SNIFF_PEE", "193 кадра"),
   "ROLL": S(ACC, "пользователь 2026-11-09 (R69 с реверсом)", ["alpha/DOG5_ROLL_R69_alpha_109f.webm"], "ROLL", "109 кадров"),
   "BUTTERFLY": S(ACC, "пользователь 2026-11-09", ["alpha/DOG5_BUTTERFLY_G1_alpha.webm"], "BUTTERFLY", "бабочку рисует игра")}),
}
SELECTION_LOGIC = {"frenk": "runtime/selection.mjs (anytime, entry A)", "zefir": "runtime/selection.mjs (0,46–2,42 с)",
                   "rocky": None, "pups": "integration/runtime/dog4_selection.mjs", "luna": None}

for dog, sp in SPEC.items():
    lock = json.load(open(os.path.join(LIB, dog, "SOURCES.lock.json")))
    refs = {}
    for f in lock["files"]:
        s = f["source"]; refs.setdefault(s["ref"], {"commit": s["commit"], "files": 0}); refs[s["ref"]]["files"] += 1
    A = json.load(open(os.path.join(LIB, dog, "atlas", "atlas.json")))
    disp = json.load(open(os.path.join(LIB, dog, "display.json")))
    states = {}
    for name, st in sp["states"].items():
        st = dict(st); fr = {}
        for rel in st["files"]:
            if rel.endswith((".webm", ".png")) and not rel.startswith("contract/"):
                n = frames_of(dog, rel); fr[rel] = {"frames": n, "seconds": round(n / FPS, 3) if rel.endswith(".webm") and n else None}
        st["media"] = fr; states[name] = st
    mf = {"schema": "bulldog-library-dog/v1", "dog": dog, "name": sp["name"], "number": sp["number"], "technicalId": sp["techId"],
          "fps": FPS, "alphaFormat": "VP9 WebM alpha_mode=1, 1276x720 (PNG-стойки — RGBA 1276x720 или 2720x1536)",
          "states": states,
          "race": {"contract": f"contract/{dog}.contract.json", "atlas": "atlas/atlas.json", "atlasKind": A["kind"], "cell": [A["cellWidth"], A["cellHeight"]],
                   "columns": A["columns"], "sprite": disp["layout"]["sprite"], "scale": disp["scale"], "display": "display.json"},
          "selectionLogic": SELECTION_LOGIC[dog],
          "provenance": {"lock": "SOURCES.lock.json", "refs": refs, "unresolved": len(lock["unresolved"]), "filesInLock": len(lock["files"])}}
    json.dump(mf, open(os.path.join(LIB, dog, "manifest.json"), "w"), ensure_ascii=False, indent=1)
    print(dog, "ok", sum(len(s["media"]) for s in states.values()), "медиа")
