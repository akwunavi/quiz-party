"""Общие функции сборщика библиотеки бульдогов.

Сборщик берёт файл из git по (ref, path), сверяет sha256 (если задан), кладёт в
bulldog-racing/assets/dogs/<dog>/<dest> и записывает в SOURCES.lock.json
ветку, КОММИТ и путь-источник. После сборки библиотека не зависит от веток.
"""
import hashlib, json, os, subprocess, sys

REPO = os.environ.get("BR_REPO", "/home/user/wt-codex")
OUT = os.path.join(REPO, "bulldog-racing", "assets", "dogs")


def git(*a, binary=False):
    r = subprocess.run(["git", "-C", REPO, *a], capture_output=True)
    if r.returncode:
        raise RuntimeError("git %s: %s" % (" ".join(a), r.stderr.decode()[:300]))
    return r.stdout if binary else r.stdout.decode().strip()


_commit_cache = {}


def commit_of(ref):
    if ref not in _commit_cache:
        _commit_cache[ref] = git("rev-parse", ref)
    return _commit_cache[ref]


def sha256(b):
    return hashlib.sha256(b).hexdigest()


class Dog:
    def __init__(self, key):
        self.key = key
        self.root = os.path.join(OUT, key)
        self.files = []  # записи lock
        self.missing = []  # то, что не удалось взять

    def add(self, dest, ref, path, expect_sha=None, role="", note=""):
        """Копирует git:ref:path -> <dog>/dest."""
        try:
            data = git("show", f"{ref}:{path}", binary=True)
        except RuntimeError as e:
            self.missing.append({"dest": dest, "ref": ref, "path": path, "error": str(e)[:200], "note": note})
            return False
        h = sha256(data)
        entry = {"dest": dest, "role": role, "bytes": len(data), "sha256": h,
                 "source": {"ref": ref, "commit": commit_of(ref), "path": path}}
        if expect_sha:
            entry["expectedSha256"] = expect_sha
            entry["shaMatchesApproved"] = (h == expect_sha)
            if h != expect_sha:
                self.missing.append({"dest": dest, "ref": ref, "path": path,
                                     "error": "sha256 не совпал с принятым", "got": h, "want": expect_sha, "note": note})
        if note:
            entry["note"] = note
        full = os.path.join(self.root, dest)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "wb") as f:
            f.write(data)
        # один dest — одна запись
        self.files = [x for x in self.files if x["dest"] != dest] + [entry]
        return True

    def write_lock(self):
        self.files.sort(key=lambda x: x["dest"])
        lock = {"dog": self.key, "files": self.files, "unresolved": self.missing}
        os.makedirs(self.root, exist_ok=True)
        with open(os.path.join(self.root, "SOURCES.lock.json"), "w") as f:
            json.dump(lock, f, ensure_ascii=False, indent=1)
        tot = sum(x["bytes"] for x in self.files)
        print(f"[{self.key}] файлов {len(self.files)}, {tot/1e6:.1f} МБ, не взято {len(self.missing)}")
        for m in self.missing:
            print("   !", m["dest"], m["error"][:100])


def walk_assets(obj, fn, path=""):
    """Обходит манифест: каждый dict с (path|file) и sha256 передаёт в fn(path_in_manifest, dict)."""
    if isinstance(obj, dict):
        p = obj.get("path") or obj.get("file")
        if isinstance(p, dict):
            p = None
        if isinstance(p, str) and obj.get("sha256"):
            fn(path, obj, p)
        for k, v in obj.items():
            walk_assets(v, fn, path + "/" + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_assets(v, fn, path + f"[{i}]")
