#!/usr/bin/env python3
"""Проверка: библиотека воспроизводится из ЗАФИКСИРОВАННЫХ источников. Для каждой записи SOURCES.lock.json берёт файл из git по КОММИТУ
(не по имени ветки, не из рабочих папок), сверяет sha256 с записью и с файлом, лежащим в каталоге.
usage: rebuild_from_lock.py [REPO] — REPO по умолчанию корень этого репозитория; код читает только git-объекты и каталог библиотеки."""
import hashlib, json, os, subprocess, sys
REPO = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LIB = os.path.join(REPO, "bulldog-racing", "assets", "dogs")
bad = 0; total = 0; dogs = {}
for dog in sorted(os.listdir(LIB)):
    lock = json.load(open(os.path.join(LIB, dog, "SOURCES.lock.json")))
    n = 0; problems = []
    for f in lock["files"]:
        s = f["source"]; total += 1; n += 1
        r = subprocess.run(["git", "-C", REPO, "show", f"{s['commit']}:{s['path']}"], capture_output=True)
        if r.returncode: problems.append(f"{f['dest']}: коммит {s['commit'][:8]} не содержит {s['path']}"); continue
        h = hashlib.sha256(r.stdout).hexdigest()
        if h != f["sha256"]: problems.append(f"{f['dest']}: sha из коммита ≠ записи")
        if hashlib.sha256(open(os.path.join(LIB, dog, f["dest"]), "rb").read()).hexdigest() != f["sha256"]: problems.append(f"{f['dest']}: файл в каталоге ≠ записи")
    dogs[dog] = {"entries": n, "problems": problems}; bad += len(problems)
    print(f"{dog:6} записей {n}, проблем {len(problems)}", *problems[:3])
res = {"repo": REPO, "totalEntries": total, "problems": bad, "dogs": dogs}
if len(sys.argv) > 2: json.dump(res, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
sys.exit(1 if bad else 0)
