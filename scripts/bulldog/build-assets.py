#!/usr/bin/env python3
"""Собирает public/bulldog/ — рантайм-ассеты пяти собак для раунда «Скачки бульдогов» — из ЕДИНОЙ библиотеки (ветка интеграции
bulldog-racing/assets/dogs/*). Ничего не рисует заново: PNG-атласы гонки → WebP без потерь (пиксель в пиксель), атласы экрана выбора
→ WebP q92 (+ alpha 100; они уже получены ресайзом из VP9-видео), стойки для телефона — кадры FRONT_STAND/IDLE в том же кропе.
Пишет public/bulldog/MANIFEST.json (коммит библиотеки, sha256 каждого выходного файла).
usage: build-assets.py <каталог bulldog-racing/assets/dogs> <коммит библиотеки>"""
import hashlib, json, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
SRC, COMMIT = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public", "bulldog")
DOGS = ["frenk", "zefir", "rocky", "pups", "luna"]
STILL = {"frenk": "stills/DOG1_FRONT_STAND_alpha_frame0.png", "rocky": "stills/DOG3_FRONT_STAND_ALPHA.png", "pups": "stills/G0_FRONT_STAND_alpha_1276.png",
         "luna": "stills/DOG5_FRONT_STAND_alpha_f0_1276.png"}
files = {}
def sha(p): return hashlib.sha256(open(p, "rb").read()).hexdigest()
def put(p):
    files[os.path.relpath(p, OUT)] = {"bytes": os.path.getsize(p), "sha256": sha(p)}
def J(*p): return json.load(open(os.path.join(SRC, *p)))
for dog in DOGS:
    d = os.path.join(OUT, dog); os.makedirs(os.path.join(d, "race"), exist_ok=True); os.makedirs(os.path.join(d, "select"), exist_ok=True)
    # ---- гонка
    A = J(dog, "atlas", "atlas.json"); rewrite = {}
    rels = sorted(set(A["sheets"].values()) if A["kind"] == "labelled" else {c["sheet"] for c in A["clips"].values()})
    for rel in rels:
        name = os.path.splitext(os.path.basename(rel))[0] + ".webp"
        im = Image.open(os.path.join(SRC, dog, rel)).convert("RGBA"); out = os.path.join(d, "race", name)
        im.save(out, "WEBP", lossless=True, quality=80, method=4)
        back = np.asarray(Image.open(out).convert("RGBA")); orig = np.asarray(im); vis = orig[..., 3] > 0   # RGB под полностью прозрачными пикселями WebP не хранит — на картинку это не влияет
        assert np.array_equal(back[..., 3], orig[..., 3]) and np.array_equal(back[vis], orig[vis]), "WebP без потерь не совпал: " + rel
        rewrite[rel] = "race/" + name; put(out)
    if A["kind"] == "labelled": A["sheets"] = {k: rewrite[v] for k, v in A["sheets"].items()}
    else:
        for c in A["clips"].values(): c["sheet"] = rewrite[c["sheet"]]
    C = J(dog, "contract", dog + ".contract.json"); extras = {}
    if dog == "frenk": extras = {"startArrays": J(dog, "contract", "frenk_start_shift_arrays.json"), "stopMeta": J(dog, "contract", "frenk_stop_v4_shift_arrays.json")}
    if dog == "zefir": extras = {"stopList": J(dog, "atlas", "stopB_montage_list.json")}
    if dog == "luna": extras = {"stopShift": J(dog, "contract", "stop_shift.json")}
    for nm, obj in (("atlas.json", A), ("contract.json", C), ("extras.json", extras)):
        p = os.path.join(d, "race", nm); json.dump(obj, open(p, "w"), ensure_ascii=False, separators=(",", ":")); put(p)
    # ---- выбор
    S = J(dog, "selection", "selection_atlas.json")
    for clip, c in S["clips"].items():
        out = os.path.join(d, "select", clip + ".webp")
        Image.open(os.path.join(SRC, dog, c["sheet"])).convert("RGBA").save(out, "WEBP", quality=92, alpha_quality=100, method=4); c["sheet"] = f"select/{clip}.webp"; put(out)
    if dog == "pups": g = os.path.join(d, "select", "gates.json"); json.dump(J(dog, "selection", "gates.json")["gates"], open(g, "w")); put(g)          # ворота выхода из IDLE Пупса
    if dog == "rocky": g = os.path.join(d, "select", "delay_map.json"); json.dump(J(dog, "selection", "idle_exit_DELAY_MAP.json"), open(g, "w"), separators=(",", ":")); put(g)   # карта выхода Рокки
    p = os.path.join(d, "select", "atlas.json"); json.dump(S, open(p, "w"), ensure_ascii=False, separators=(",", ":")); put(p)
    # ---- стойка для телефона: общий кроп 356..923 × 0..707, масштаб 0.5
    if dog in STILL: fr = Image.open(os.path.join(SRC, dog, STILL[dog])).convert("RGBA")
    else:  # у Зефира отдельного файла нет: кадр f4 IDLE (= FRONT_STAND, STATUS.md)
        t = tempfile.mkdtemp(); subprocess.run(["ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", os.path.join(SRC, dog, "alpha/DOG2_IDLE_alpha_f1-f121.webm"), "-pix_fmt", "rgba", "-vsync", "0", "-frames:v", "4", t + "/f%02d.png"], check=True)
        fr = Image.open(t + "/f04.png").convert("RGBA")
    x0, y0, x1, y1 = S["crop"]; st = fr.crop((x0, y0, x1 + 1, y1 + 1)); st = st.resize((round(st.width * .5), round(st.height * .5)), Image.LANCZOS)
    out = os.path.join(d, "still.webp"); st.save(out, "WEBP", quality=92, alpha_quality=100); put(out)
    print(dog, sum(v["bytes"] for k, v in files.items() if k.startswith(dog + "/")) // 1024, "KB")
json.dump({"schema": "bulldog-product-assets/v1", "libraryCommit": COMMIT, "source": "bulldog-racing/assets/dogs (ветка claude/bulldog-round-lab-20261109)", "files": files},
          open(os.path.join(OUT, "MANIFEST.json"), "w"), ensure_ascii=False, indent=1)
print("всего", sum(v["bytes"] for v in files.values()) // 1048576, "МБ,", len(files), "файлов")
