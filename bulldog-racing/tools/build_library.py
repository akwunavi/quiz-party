#!/usr/bin/env python3
"""Собирает bulldog-racing/assets/dogs/<dog>/ из принятых версий.

Запуск: python3 bulldog-racing/tools/build_library.py [frenk pups luna zefir rocky]
Нужны git-ссылки origin/* (git fetch). Результат воспроизводим: источники
записаны в SOURCES.lock.json (ветка + коммит + путь + sha256).
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from libcommon import Dog, git, walk_assets, REPO

LUNA_REF = "origin/claude/dog5-luna-batch-20261108"


def role_of(dest):
    e = dest.rsplit(".", 1)[-1].lower()
    return {"webm": "alpha", "mp4": "kling_source", "png": "still", "json": "meta", "mjs": "runtime"}.get(e, "other")


def folder(dest):
    return {"webm": "alpha", "mp4": "sources", "png": "stills", "json": "meta", "mjs": "runtime"}.get(
        dest.rsplit(".", 1)[-1].lower(), "other")


# ---------------------------------------------------------------- Фрэнк
def build_frenk():
    d = Dog("frenk")
    ref = LUNA_REF
    base = "bulldog1-frenk/"
    man = json.loads(git("show", f"{ref}:{base}MANIFEST.json"))
    # принятый набор из approved_set
    seen = set()

    def fn(path, o, p):
        if p.startswith("git:"):
            return
        # "assets/approved/x" -> путь в репозитории, относительно bulldog1-frenk/
        rp = base + p
        if rp in seen:
            return
        seen.add(rp)
        name = os.path.basename(p)
        sub = folder(name)
        if "/atlas" in path:
            sub = "atlas"
        d.add(f"{sub}/{name}", ref, rp, o["sha256"], role_of(name), note="approved_set" + path)

    walk_assets(man["approved_set"], fn)
    # RUN alpha — лежит только на preview-ветке
    run = man["approved_set"]["RUN"]["alpha"]
    pref, rest = run["path"][4:].split("@")
    commit, fpath = rest.split(":")
    d.add("alpha/dog1-run-alpha.webm", commit, fpath, run["sha256"], "alpha",
          note="RUN alpha; ветка " + pref + " (коммит закреплён)")
    # пакет интеграции (атлас, контракт, рантайм, инструменты, результаты)
    for f in git("ls-tree", "-r", "--name-only", ref, base + "integration_v1/").split("\n"):
        rel = f[len(base + "integration_v1/"):]
        sub = rel.split("/")[0]
        if rel.endswith(".md"):
            sub = "docs"
        d.add(f"integration/{rel}", ref, f, None, sub)
    for f in git("ls-tree", "-r", "--name-only", ref, base + "library_v1/").split("\n"):
        d.add("library_v1/" + f[len(base + "library_v1/"):], ref, f, None, "frenk_library")
    for f in ("selection_anytime_v1/selection.mjs", "selection_anytime_v1/APPROVED.md",
              "selection_anytime_v1/alpha/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm"):
        d.add(("alpha/" if f.endswith("webm") else "runtime/" if f.endswith("mjs") else "docs/") + os.path.basename(f),
              ref, base + f, None, "selection_anytime")
    d.write_lock()
    return d


# ---------------------------------------------------------------- Пупс
def build_pups():
    d = Dog("pups")
    ref = "origin/claude/dog4-pups-integration-20261102"
    man = json.loads(git("show", f"{ref}:bulldog4-pups/MANIFEST.json"))

    def fn(path, o, p):
        name = os.path.basename(p)
        if p.startswith("dog4-v3-lab/") or p.startswith("race-v3-p3-lab/"):
            sub = "atlas" if p.endswith(".png") or p.endswith("manifest.json") or p.endswith("layout.json") else "contract"
            if p.startswith("race-v3-p3-lab/"):
                sub = "contract"
            d.add(f"{sub}/{name}", ref, p, o["sha256"], role_of(name), note="manifest" + path)
        else:
            d.add(f"{folder(name)}/{name}", ref, p, o["sha256"], role_of(name), note="manifest" + path)

    walk_assets(man, fn)
    # alpha-мастера гонки на других ветках: git "<ветка>:<файл>", коммит и sha в манифесте
    for st, v in man["race"]["states"].items():
        m = v.get("master")
        if isinstance(m, dict) and m.get("git"):
            br, fp = m["git"].split(":", 1)
            d.add(f"alpha/race_{st}__{os.path.basename(fp)}", m["commit"], fp, m["sha256"], "alpha",
                  note=f"мастер {st}; ветка {br}")
    # пакет интеграции: рантайм, реестр, инструменты, результаты (без демо-видео)
    for f in git("ls-tree", "-r", "--name-only", ref, "bulldog4-pups/integration_v1/").split("\n"):
        if "/demo/" in f:
            continue
        d.add("integration/" + f[len("bulldog4-pups/integration_v1/"):], ref, f, None, "integration")
    d.add("contract/dog4.layout.json", ref, "dog4-v3-lab/layout.json", None, "contract")
    d.write_lock()
    return d


# ---------------------------------------------------------------- Луна
def build_luna():
    d = Dog("luna")
    ref = LUNA_REF
    man = json.loads(git("show", f"{ref}:bulldog5-luna/MANIFEST.json"))
    seen = set()

    def fn(path, o, p):
        if p in seen:
            return
        seen.add(p)
        name = os.path.basename(p)
        if "insertAttempt" in path:
            return
        d.add(f"{folder(name)}/{name}", ref, p, o["sha256"], role_of(name), note="manifest" + path)

    walk_assets(man, fn)
    extra = [
        "bulldog5-luna/stage6_batch/alpha/DOG5_BUTTERFLY_G1_alpha.webm",
        "bulldog5-luna/stage6_batch/alpha/DOG5_STOP_G1_alpha.webm",
        "bulldog5-luna/sources/DOG5_IDLE_kling_original.mp4",
        "bulldog5-luna/sources/DOG5_SELECTED_kling_original.mp4",
        "bulldog5-luna/stage5_run/DOG5_RUN_G1_kling_original.mp4",
        "bulldog5-luna/stage6_batch/sources/DOG5_BUTTERFLY_G1_kling_original.mp4",
        "bulldog5-luna/stage6_batch/sources/DOG5_STOP_G1_kling_original.mp4",
        "bulldog5-luna/stage4_race_stand/DOG5_RACE_STAND_G1_kling_original.jpg",
        "bulldog5-luna/stage6_batch/alpha/RETURN_TO_IDLE_grade_offsets.json",
        "bulldog5-luna/stage4_race_stand/DOG5_RACE_STAND_G1_alpha_1276.png",
        "bulldog5-luna/stage7_fix/sniff/alpha/sniff_fixed_assembly.json",
        "bulldog5-luna/stage7_fix/roll/roll_reverse_meta.json",
        "bulldog5-luna/stage2/idle/idle_variants.json",
        "bulldog5-luna/stage3_run/loops/loops.json",
        "bulldog5-luna/stage6_batch/contract/check_contract.mjs",
        "bulldog5-luna/stage6_batch/contract/luna.contract.draft.json",
        "bulldog5-luna/MANIFEST.json", "bulldog5-luna/STATUS.md", "bulldog5-luna/DECISIONS.md",
    ]
    for p in extra:
        name = os.path.basename(p)
        sub = "docs" if name.endswith(".md") else folder(name)
        if name.startswith("MANIFEST"):
            name = "MANIFEST.source.json"
        d.add(f"{sub}/{name}" if not name.endswith("kling_original.mp4") else f"sources/{name}", ref, p, None, role_of(name))
    d.write_lock()
    return d


# ---------------------------------------------------------------- Зефир
def build_zefir():
    d = Dog("zefir")
    ref = LUNA_REF
    b = "bulldog2/"
    alpha = ["race_start_v1/alpha/DOG2_RUN_alpha_src28-100.webm", "stop_b_alpha/DOG2_STOP_v2_alpha_k27-k40.webm",
             "stop_b_alpha/DOG2_STOP_v1_alpha_k66-k73.webm", "roll_v3/alpha/DOG2_ROLL_v3_alpha_r1-r121.webm",
             "butterfly_v2/alpha/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm",
             "sniff_pee_v1/alpha/DOG2_SNIFF_PEE_v1_alpha_s1-s193.webm",
             "selection_alpha_v1/DOG2_IDLE_MAIN_L1_alpha_loop131.webm", "selection_alpha_v1/DOG2_IDLE_alpha_f1-f121.webm",
             "selection_alpha_v1/DOG2_SELECTED_alpha_f1-f121.webm",
             "return_to_idle_v1/alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm", "assets/sources/dog2-run-alpha.webm"]
    for a in alpha:
        d.add("alpha/" + os.path.basename(a), ref, b + a, None, "alpha", note="STATUS.md 22.10.2026")
    src = ["assets/sources/bulldog_02_run.mp4", "assets/sources/bulldog_2_idle.mp4", "assets/sources/bulldog_2_selected.mp4",
           "roll_v3/kling/DOG2_ROLL_v3_original.mp4", "butterfly_v2/kling/DOG2_BUTTERFLY_v2_original.mp4",
           "sniff_pee_v1/kling/DOG2_SNIFF_PEE_v1_original.mp4", "return_to_idle_v1/kling/DOG2_RETURN_TO_IDLE_v1_original.mp4",
           "stop_v1/kling/DOG2_STOP_kling_v1_original.mp4", "stop_v2/kling/DOG2_STOP_kling_v2_original.mp4"]
    for a in src:
        d.add("sources/" + os.path.basename(a), ref, b + a, None, "kling_source")
    # атласы (по лабораториям; в библиотеке — в одной папке)
    labs = {"lab_start_v1": ["assets/dog2_run28-100.png", "assets/dog2_atlas.json", "dog2.mjs", "tools/build_atlas.py"],
            "lab_stop_v1": ["assets/dog2_stopB.png", "assets/dog2_stopB_atlas.json", "assets/stopB_montage_list.json",
                            "dog2stop.mjs", "tools/build_stop_atlas.py"],
            "lab_roll_v1": ["assets/dog2_roll_v3.png", "assets/dog2_roll_atlas.json", "dog2roll.mjs", "tools/build_roll_atlas.py"],
            "lab_butterfly_v1": ["assets/dog2_butterfly_v2.png", "assets/dog2_butterfly_atlas.json", "dog2butterfly.mjs",
                                 "tools/build_butterfly_atlas.py"],
            "lab_sniff_v1": ["assets/dog2_sniff_pee_v1.png", "assets/dog2_sniff_atlas.json", "assets/rhythm_variants.json",
                             "dog2sniff.mjs", "tools/build_sniff_atlas.py"],
            "lab_select_v1": ["selection.mjs"]}
    for lab, fl in labs.items():
        for f in fl:
            name = os.path.basename(f)
            sub = "atlas" if f.startswith("assets/") else "runtime" if f.endswith(".mjs") else "tools"
            d.add(f"{sub}/{name}", ref, f"{b}{lab}/{f}", None, sub, note=lab)
    d.add("tools/compose_stopB_rgba.py", ref, b + "stop_b_alpha/compose_stopB_rgba.py", None, "tools")
    d.add("docs/STATUS.md", ref, b + "STATUS.md", None, "docs")
    d.write_lock()
    return d


# ---------------------------------------------------------------- Рокки
def build_rocky():
    d = Dog("rocky")
    ref = "origin/codex/dog3-idle-exit-lab-20261102"
    b = "bulldog3/"
    # игровые атласы (178×100) и alpha по состояниям
    items = [
        ("atlas/base.png", "stop-v3-lab/assets/base.png", "атлас RACE_STAND (1 кадр)"),
        ("atlas/start.png", "race-start-v3-lab/assets/rocky-start.png", "START 40"),
        ("atlas/run.png", "race-start-v3-lab/assets/rocky-run.png", "RUN, текущий (inventory 22.10; используется лабораторией фазировки)"),
        ("atlas/run_stoplab_variant.png", "stop-v3-lab/assets/run.png", "вариант RUN из STOP-лаборатории (НЕ основной)"),
        ("atlas/stop.png", "stop-v3-lab/assets/stop.png", "STOP 37"),
        ("atlas/butterfly.png", "butterfly-v3-lab/assets/rocky-butterfly.png", "BUTTERFLY 121"),
        ("atlas/sniff_pee.png", "sniff-pee-v3-lab/assets/rocky-sniff-pee.png", "SNIFF_PEE+RETURN 240"),
        ("atlas/roll.png", "roll-v3-rhythm-review/assets/rocky-roll-B.png", "ROLL B 145"),
        ("alpha/rocky-race-stand-alpha.png", "stop-v3-lab/assets/rocky-race-stand-alpha.png", "RACE_STAND alpha"),
        ("alpha/rocky-race-start-alpha-24.webm", "race-start-v3-lab/assets/rocky-race-start-alpha-24.webm", "START #18-41"),
        ("alpha/rocky-stop-alpha-37.webm", "stop-v3-lab/assets/rocky-stop-alpha-37.webm", "STOP 37"),
        ("alpha/rocky-butterfly-alpha-121.webm", "butterfly-v3-lab/assets/rocky-butterfly-alpha-121.webm", "BUTTERFLY 121"),
        ("alpha/DOG3_SNIFF_PEE_ALPHA_240.webm", "sniff-pee-v3-lab/assets/DOG3_SNIFF_PEE_ALPHA_240.webm", "SNIFF_PEE+RETURN 240"),
        ("alpha/DOG3_ROLL_V2_B_ALPHA_145.webm", "roll-v3-rhythm-review/assets/DOG3_ROLL_V2_B_ALPHA_145.webm", "ROLL B 145"),
        ("alpha/DOG3_IDLE_B_ALPHA_240.webm", "idle-alpha-lab/assets/DOG3_IDLE_B_ALPHA_240.webm", "IDLE B (принят 23.10)"),
        ("alpha/DOG3_IDLE_SOURCE_ALPHA_121.webm", "idle-alpha-lab/assets/DOG3_IDLE_SOURCE_ALPHA_121.webm", "IDLE исходные 121"),
        ("stills/DOG3_FRONT_STAND_ALPHA.png", "idle-alpha-lab/assets/DOG3_FRONT_STAND_ALPHA.png", "FRONT_STAND alpha (принят)"),
        ("alpha/DOG3_SELECTED_ALPHA_121.webm", "selected-alpha-lab/assets/DOG3_SELECTED_ALPHA_121.webm", "SELECTED (принят)"),
        ("alpha/DOG3_RETURN_D_ALPHA_97.webm", "return-montage-v2/assets/DOG3_RETURN_D_ALPHA_97.webm", "RETURN_TO_IDLE D (рабочий)"),
        ("sources/DOG3_RACE_START_KLING_V3_ORIGINAL.mp4", "race-start-v3-lab/assets/DOG3_RACE_START_KLING_V3_ORIGINAL.mp4", ""),
        ("sources/DOG3_BUTTERFLY_KLING_V3_ORIGINAL.mp4", "butterfly-v3-lab/assets/DOG3_BUTTERFLY_KLING_V3_ORIGINAL.mp4", ""),
        ("sources/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4", "roll-generation-v2/DOG3_ROLL_V2_KLING_V3_ORIGINAL.mp4", ""),
        ("sources/DOG3_SNIFF_PEE_CLIP1_STAND_TO_POSE_ORIGINAL.mp4", "sniff-pee-montage-review/assets/DOG3_SNIFF_PEE_CLIP1_STAND_TO_POSE_ORIGINAL.mp4", ""),
        ("sources/bulldog_3_run.mp4", "assets/incoming/bulldog_3_run.mp4", ""),
        ("sources/bulldog_3_idle.mp4", "assets/incoming/bulldog_3_idle.mp4", ""),
        ("sources/bulldog_3_selected.mp4", "assets/incoming/bulldog_3_selected.mp4", ""),
        ("stills/DOG3_RACE_STAND_GENERATED_01.png", "race-stand-generation-v1/DOG3_RACE_STAND_GENERATED_01.png", "RACE_STAND исходник"),
        ("runtime/phase.mjs", "run-phase-v3-lab/phase.mjs", "RUN-фазировка (принята); P3 это не выражает"),
        ("meta/retiming_start.json", "race-start-v3-lab/retiming.json", ""),
        ("meta/retiming_stop.json", "stop-v3-lab/retiming.json", ""),
        ("meta/retiming_butterfly.json", "butterfly-v3-lab/retiming.json", ""),
        ("meta/retiming_sniff.json", "sniff-pee-v3-lab/retiming.json", ""),
        ("meta/retiming_roll.json", "roll-v3-rhythm-review/retiming.json", ""),
        ("meta/idle_exit_DELAY_MAP.json", "idle-exit-lab/DELAY_MAP.json", "лаборатория, НЕ принята"),
        ("meta/idle_exit_ENTRY_METRICS.json", "idle-exit-lab/ENTRY_METRICS.json", "лаборатория, НЕ принята"),
        ("docs/STATUS.md", "STATUS.md", ""), ("docs/LIBRARY_INVENTORY_20261022.md", "LIBRARY_INVENTORY_20261022.md", ""),
        ("docs/MANIFEST.source.json", "MANIFEST.json", ""),
        ("docs/IDLE_APPROVED.md", "idle-alpha-lab/APPROVED.md", ""), ("docs/ROLL_APPROVED.md", "roll-v3-rhythm-review/APPROVED.md", ""),
        ("docs/RETURN_WORKING.md", "return-montage-v2/WORKING.md", ""), ("docs/RUN_PHASE_REPORT.md", "run-phase-v3-lab/REPORT.md", ""),
        ("docs/IDLE_EXIT_REPORT.md", "idle-exit-lab/REPORT.md", ""),
        ("tools/build_start_assets.py", "race-start-v3-lab/build_assets.py", ""), ("tools/build_stop_assets.py", "stop-v3-lab/build_assets.py", ""),
        ("tools/build_butterfly_assets.py", "butterfly-v3-lab/build_assets.py", ""), ("tools/build_sniff_assets.py", "sniff-pee-v3-lab/build_assets.py", ""),
        ("tools/build_roll_B.py", "roll-v3-rhythm-review/build_variant_b.py", ""),
    ]
    for dest, path, note in items:
        d.add(dest, ref, b + path, None, role_of(dest), note=note)
    # RUN alpha v2 лежит только на preview-ветке (коммит из MANIFEST)
    d.add("alpha/bulldog_03_run_alpha_v2.webm", "bbd913d3c153f50685be70db3b61ec4ab691201d",
          "prototypes/bulldog-racing/reviews/alpha-v2/bulldog_03_run_alpha_v2.webm",
          "66da682f1eb5b34e084ac502f7c13cfffd82844678b7391cdaa3c88651a6e58d", "alpha",
          note="RUN alpha v2; ветка preview/bulldog-03-05-alpha-v2-20261008")
    # исходник STOP: только на Claude-ветке
    d.add("sources/DOG3_STOP_KLING_V3_ORIGINAL.mp4", "origin/claude/nifty-johnson-assbj5",
          "bulldog3/stop-generation-v1/DOG3_STOP_KLING_V3_ORIGINAL.mp4",
          "29ff6aefcbb2dacdf402121c51316790df641e183ff9e07058f31e39b2d73d9f", "kling_source",
          note="восстановлен с ветки claude/nifty-johnson-assbj5 (inventory просил архивировать)")
    d.write_lock()
    return d


BUILDERS = {"frenk": build_frenk, "pups": build_pups, "luna": build_luna, "zefir": build_zefir, "rocky": build_rocky}

if __name__ == "__main__":
    for k in (sys.argv[1:] or list(BUILDERS)):
        BUILDERS[k]()
