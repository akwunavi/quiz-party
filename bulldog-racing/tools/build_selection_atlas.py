#!/usr/bin/env python3
"""Атласы экрана выбора (IDLE/SELECTED/RETURN) из утверждённых alpha 1276×720 — для покадрового проигрывания правил выхода из IDLE.
Все пять собак сняты одной студийной камерой (FRONT_STAND: лапы 683–690, макушка 32–41, центр x≈650): общий кроп и общий масштаб,
собаки остаются выровнены по лапам. Кадры не меняются, только кроп и один раз Lanczos. 24 колонки.
usage: build_selection_atlas.py [SCALE=0.4]"""
import json, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.path.join(HERE, "..", "assets", "dogs")
S = float(sys.argv[1]) if len(sys.argv) > 1 else 0.4
# собака -> клип -> (файл alpha, имя первого кадра файла в нумерации исходника, сколько кадров нужно как (от, до) в нумерации файла 0-based включительно)
SPEC = {
 "frenk": {"idle": ("alpha/DOG1_IDLE_v1_alpha_f8-f118.webm", 8, None), "sel": ("alpha/DOG1_SELECTED_v1_alpha_f20-f121.webm", 20, None), "ret": ("alpha/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm", 2, None)},
 "zefir": {"idle": ("alpha/DOG2_IDLE_alpha_f1-f121.webm", 1, (3, 108)), "sel": ("alpha/DOG2_SELECTED_alpha_f1-f121.webm", 1, (3, 120)), "ret": ("alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm", 1, None)},
 "rocky": {"idle": ("alpha/DOG3_IDLE_SOURCE_ALPHA_121.webm", 0, None), "sel": ("alpha/DOG3_SELECTED_ALPHA_121.webm", 0, None), "ret": ("alpha/DOG3_RETURN_D_ALPHA_97.webm", 0, None)},
 "pups": {"idle": ("alpha/DOG4_IDLE_v1_alpha_loop240.webm", 0, None), "sel": ("alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm", 0, None)},
 "luna": {"idle": ("alpha/DOG5_IDLE_alpha_f0-f120.webm", 0, (0, 48)), "sel": ("alpha/DOG5_SELECTED_alpha_s0-s120.webm", 0, None), "ret": ("alpha/DOG5_RETURN_TO_IDLE_G1_alpha_graded.webm", 0, None)},
}
tmp = tempfile.mkdtemp(prefix="selatlas_")
frames = {}   # (dog, clip) -> list of arrays RGBA
box = [10**9, 10**9, -1, -1]
for dog, clips in SPEC.items():
    for clip, (f, first, rng) in clips.items():
        d = os.path.join(tmp, dog + clip); os.makedirs(d)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", os.path.join(LIB, dog, f), "-pix_fmt", "rgba", "-vsync", "0", os.path.join(d, "f%03d.png")], check=True)
        n = len(os.listdir(d)); lo, hi = rng if rng else (0, n - 1)
        arr = [np.asarray(Image.open(os.path.join(d, "f%03d.png" % (i + 1))).convert("RGBA")) for i in range(lo, hi + 1)]
        frames[(dog, clip)] = (arr, lo)
        for a in arr:
            ys, xs = np.nonzero(a[..., 3] >= 8)
            if len(xs): box = [min(box[0], xs.min()), min(box[1], ys.min()), max(box[2], xs.max()), max(box[3], ys.max())]
x0, y0, x1, y1 = [int(v) for v in box]; x0 = max(0, x0 - 4); y0 = max(0, y0 - 4); x1 = min(1275, x1 + 4); y1 = min(719, y1 + 4)
cw, ch = int(round((x1 - x0 + 1) * S)), int(round((y1 - y0 + 1) * S))
print("общий кроп", (x0, y0, x1, y1), "→ ячейка", cw, ch)
C = 24
for dog, clips in SPEC.items():
    out = os.path.join(LIB, dog, "selection"); os.makedirs(out, exist_ok=True); meta = {"schema": "bulldog-selection-atlas/v1", "dog": dog, "cell": [cw, ch], "columns": C, "scale": S, "crop": [x0, y0, x1, y1], "frame": [1276, 720], "clips": {}}
    for clip, (f, first, rng) in clips.items():
        arr, lo = frames[(dog, clip)]
        rows = (len(arr) + C - 1) // C; sheet = Image.new("RGBA", (cw * min(C, len(arr)), ch * rows), (0, 0, 0, 0))
        for i, a in enumerate(arr):
            im = Image.fromarray(a[y0:y1 + 1, x0:x1 + 1]).resize((cw, ch), Image.LANCZOS); sheet.paste(im, ((i % C) * cw, (i // C) * ch))
        sheet.save(os.path.join(out, f"{clip}.png"), optimize=True)
        meta["clips"][clip] = {"sheet": f"selection/{clip}.png", "count": len(arr), "sourceFirstFrame": first + lo, "file": f}
    json.dump(meta, open(os.path.join(out, "selection_atlas.json"), "w"), ensure_ascii=False, indent=1)
    print(dog, {k: v["count"] for k, v in meta["clips"].items()})
