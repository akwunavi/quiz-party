#!/usr/bin/env python3
"""Игровой атлас Луны 207×116 из утверждённых alpha (тот же рецепт, что у Фрэнка:
декод ffmpeg libvpx-vp9 -> rgba, один раз Lanczos в 207×116, 24 колонки; cx = центроид alpha, bottom = нижний ряд alpha>128).
Метки — ровно те, что в contract/luna.contract.json.  Запуск: build_luna_atlas.py [OUTDIR]
Нужны: ffmpeg с libvpx-vp9, Pillow, numpy. В репозиторий пишет только OUTDIR (по умолчанию ../assets/dogs/luna/atlas)."""
import json, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
LUNA = os.path.join(HERE, "..", "assets", "dogs", "luna")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(LUNA, "atlas")
W, H, C = 207, 116, 24
contract = json.load(open(os.path.join(LUNA, "contract", "luna.contract.json")))
cl = contract["clips"]


def nums(labels, prefix):
    return [int(x[len(prefix):]) for x in labels]


tmp = tempfile.mkdtemp(prefix="luna_atlas_")


def decode(webm, tag):
    d = os.path.join(tmp, tag)
    os.makedirs(d)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-c:v", "libvpx-vp9", "-i", os.path.join(LUNA, "alpha", webm),
                    "-pix_fmt", "rgba", "-vsync", "0", os.path.join(d, "f%03d.png")], check=True)
    return d


def fr(d, i):  # i — нулевой индекс кадра файла
    return Image.open(os.path.join(d, "f%03d.png" % (i + 1))).convert("RGBA")


run = decode("DOG5_RUN_G1_alpha_f0-f120.webm", "run")
stop = decode("DOG5_STOP_G1_alpha.webm", "stop")
bf = decode("DOG5_BUTTERFLY_G1_alpha.webm", "bf")
roll = decode("DOG5_ROLL_R69_alpha_109f.webm", "roll")
sniff = decode("DOG5_SNIFF_PEE_RETURN_FIXED_alpha_193f.webm", "sniff")

groups = {}
# run: START-таблица run18..run71 + RACE_STAND (= кадр 0 RUN G1, MANIFEST.race.RACE_STAND.gameFrame)
groups["run"] = [("RACE_STAND", fr(run, 0))] + [(f"run{n}", fr(run, n)) for n in nums(cl["START"]["labels"], "run")]
stop_labels = list(dict.fromkeys(cl["STOP"]["labels"] + cl["STOP_TAIL"]["labels"]))
groups["stop"] = [(l, fr(stop, int(l[4:]))) for l in stop_labels]
groups["bf"] = [(l, fr(bf, int(l[2:]))) for l in cl["BUTTERFLY"]["labels"]]
# ROLL R69: файл = #6→#69→#24 (109 кадров); уникальные метки roll6..roll69 = кадры 0..63, остальное — повтор в обратном порядке
roll_unique = [n for n in range(6, 70)]
groups["roll"] = [(f"roll{n}", fr(roll, n - 6)) for n in roll_unique]
rev = cl["ROLL"]["labels"][64:]
# обратная часть в файле — те же изображения, но перекодированные VP9 (шум сжатия ~0.3/255): проверяем допуск, не побайтность
bad = [(i, l) for i, l in enumerate(rev)
       if np.abs(np.asarray(fr(roll, 64 + i)).astype(int) - np.asarray(fr(roll, int(l[4:]) - 6)).astype(int)).mean() > 1.0]
if bad:
    raise SystemExit(f"ROLL: обратная часть расходится с прямой (>1/255) в {len(bad)} кадрах: {bad[:3]}")
groups["sniff"] = [(l, fr(sniff, int(l[5:]) - 1)) for l in cl["SNIFF_PEE"]["labels"]]

os.makedirs(OUT, exist_ok=True)
atlas = {"schema": "bulldog-atlas/v1", "kind": "labelled", "dog": "luna", "cellWidth": W, "cellHeight": H, "columns": C,
         "sheets": {}, "frames": {},
         "recipe": "ffmpeg -c:v libvpx-vp9 -i <alpha.webm> -pix_fmt rgba -> Lanczos 1276x720 -> 207x116 -> 24 колонки (как у Фрэнка)"}
for g, items in groups.items():
    rows = (len(items) + C - 1) // C
    sheet = Image.new("RGBA", (W * min(C, len(items)), H * rows), (0, 0, 0, 0))
    for i, (lab, im) in enumerate(items):
        sm = im.resize((W, H), Image.LANCZOS)
        sheet.paste(sm, ((i % C) * W, (i // C) * H))
        a = np.asarray(sm)[..., 3].astype(float)
        ys, xs = np.nonzero(a > 128)
        atlas["frames"][lab] = {"sheet": g, "index": i, "cx": round(float((a.sum(0) * np.arange(W)).sum() / a.sum()), 3),
                                "bottom": int(ys.max())}
    sheet.save(os.path.join(OUT, f"luna_{g}.png"), optimize=True)
    atlas["sheets"][g] = f"atlas/luna_{g}.png"
json.dump(atlas, open(os.path.join(OUT, "atlas.json"), "w"), ensure_ascii=False, indent=0)
print({g: len(v) for g, v in groups.items()})
