#!/usr/bin/env python3
"""Index and preserve locally available Bulldog Race materials without editing sources."""
import hashlib
import json
import re
import subprocess
import tarfile
from collections import Counter
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[3]
DOC = REPO / "docs" / "bulldog-race"
ART = Path("/workspace/artifacts/bulldog-racing")
UP = Path("/workspace/attachments")
PARTS = DOC / "archive" / "parts"
LIMIT = 75_000_000
MEDIA = {".png", ".jpg", ".jpeg", ".webp", ".mp4", ".webm"}
REF_FILTER = re.compile(r"bulldog|dog[1-5]|race|sniff|butterfly|roll|return|stand|stop|start|alpha|kling|preview|loop|finish", re.I)
STATE_FILTER = re.compile(r"FRONT_STAND|RACE_STAND|BASE_STAND|IDLE|SELECTED|SNIFF_PEE|BUTTERFLY|RETURN|ROLL|FINISH|START|STOP|RUN|BONE", re.I)


def git(*args):
    return subprocess.check_output(["git", *args], cwd=REPO)


def git_index():
    refs = git("for-each-ref", "--format=%(refname:short)", "refs/remotes/origin/codex", "refs/remotes/origin/preview").decode().splitlines()
    refs.append("origin/main")
    by_oid = {}
    relevant = []
    for ref in refs:
        commit = git("rev-parse", ref).decode().strip()
        for item in git("ls-tree", "-r", "-z", ref).split(b"\0"):
            if not item:
                continue
            head, raw_path = item.split(b"\t", 1)
            oid = head.split()[2].decode()
            path = raw_path.decode("utf-8", "replace")
            if path.startswith("docs/bulldog-race/"):
                # Do not recursively index this archive on a later rebuild.
                continue
            source = {"branch": ref, "commit": commit, "path": path, "gitBlob": oid}
            by_oid.setdefault(oid, []).append(source)
            if REF_FILTER.search(path) and (ref != "origin/main" or "race" in path.lower()):
                relevant.append(source)
    return by_oid, relevant


def hashes(path):
    size = path.stat().st_size
    a = hashlib.sha256()
    b = hashlib.sha1(f"blob {size}\0".encode())
    with path.open("rb") as f:
        while chunk := f.read(1024 * 1024):
            a.update(chunk)
            b.update(chunk)
    return size, a.hexdigest(), b.hexdigest()


def metadata(path):
    ext = path.suffix.lower()
    if ext in {".png", ".jpg", ".jpeg", ".webp"}:
        try:
            with Image.open(path) as im:
                return {"width": im.width, "height": im.height, "alpha": "A" in im.getbands() or "transparency" in im.info}
        except Exception:
            return {"probeError": "Pillow could not decode image"}
    if ext in {".mp4", ".webm"}:
        try:
            data = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name,pix_fmt,width,height,avg_frame_rate,nb_frames:format=duration", "-of", "json", str(path)], timeout=20))
            stream = data.get("streams", [{}])[0]
            rate = stream.get("avg_frame_rate", "0/1")
            num, den = map(int, rate.split("/"))
            duration = float(data.get("format", {}).get("duration", 0))
            fps = num / den if den else None
            frames = int(stream.get("nb_frames") or round(duration * fps)) if fps else None
            return {"width": stream.get("width"), "height": stream.get("height"), "fps": fps, "frames": frames,
                    "durationSeconds": duration, "codec": stream.get("codec_name"),
                    "alpha": "unknown (requires decode check)" if ext == ".webm" else False,
                    "pixelFormat": stream.get("pix_fmt")}
        except Exception as exc:
            return {"probeError": type(exc).__name__}
    return {}


def status_for(rel):
    return "UNKNOWN", "No verified per-file approval record; run annotate_manifest.py for evidence-based statuses."


def classification(rel):
    low = rel.lower()
    dog = None
    m = re.search(r"(?:dog|bulldog)[_ -]?0?([1-5])", low)
    if m:
        dog = int(m.group(1))
    elif "dog4" in low or "bulldog4" in low:
        dog = 4
    m = STATE_FILTER.search(rel)
    return dog, m.group(0).upper() if m else None


def sources():
    for p in sorted(ART.rglob("*")):
        if not p.is_file() or any(x in p.parts for x in (".git", "__pycache__", "delivery-repo")) or p.suffix == ".pyc":
            continue
        yield p, "workspace-artifact", "artifacts/" + p.relative_to(ART).as_posix()
    for p in sorted(UP.rglob("*")):
        if p.is_file():
            yield p, "user-upload", "uploads/" + p.relative_to(UP).as_posix()


class Shards:
    def __init__(self):
        PARTS.mkdir(parents=True, exist_ok=True)
        self.index = -1
        self.used = 0
        self.tar = None
        self.map = {}
        self.summary = []

    def add(self, source, sha, size):
        if sha in self.map:
            return self.map[sha]
        if self.tar is None or (self.used and self.used + size + 10240 > LIMIT):
            if self.tar:
                self.tar.close()
            self.index += 1
            target = PARTS / f"part-{self.index:03}.tar"
            # Archive all paths as independent content-addressed regular files.
            # Python tarfile otherwise emits hardlink entries to source absolute
            # paths, which cannot be extracted from a clean clone.
            self.tar = tarfile.open(target, "w", dereference=True)
            self.used = 0
            self.summary.append({"path": target.relative_to(REPO).as_posix(), "members": 0, "payloadBytes": 0})
        member = f"sha256/{sha[:2]}/{sha}"
        self.tar.add(source, arcname=member, recursive=False)
        self.used += size + 1024
        self.summary[-1]["members"] += 1
        self.summary[-1]["payloadBytes"] += size
        pointer = {"kind": "tar-member", "path": self.summary[-1]["path"], "member": member}
        self.map[sha] = pointer
        return pointer

    def close(self):
        if self.tar:
            self.tar.close()
        for part in self.summary:
            part["sizeBytes"] = (REPO / part["path"]).stat().st_size
            part["sha256"] = hashlib.file_digest((REPO / part["path"]).open("rb"), "sha256").hexdigest()


def main():
    DOC.mkdir(parents=True, exist_ok=True)
    by_oid, git_only = git_index()
    shards = Shards()
    entries = []
    seen_git = set()
    for index, (path, origin, logical) in enumerate(sources(), 1):
        size, sha, oid = hashes(path)
        refs = by_oid.get(oid, [])
        if refs:
            chosen = refs[0]
            archive = {"kind": "git-blob", **chosen}
            seen_git.add(oid)
        else:
            archive = shards.add(path, sha, size)
        dog, state = classification(logical)
        status, reason = status_for(logical)
        item = {"id": f"asset-{index:06}", "name": path.name, "type": path.suffix.lower() or "none", "purpose": logical,
                "dog": dog, "state": state, "source": origin, "sourceBranch": archive.get("branch"), "sourceCommit": archive.get("commit"),
                "originalPath": str(path), "archive": archive, "sha256": sha, "gitBlob": oid, "sizeBytes": size,
                "approvalStatus": status, "statusEvidence": reason, "knownDefects": [], "relatedFiles": [], "relatedPrompts": [],
                "physicalCopy": True, "recoverable": True, "actionRequired": None}
        item.update(metadata(path))
        entries.append(item)
        if index % 1000 == 0:
            print("indexed", index, "files", flush=True)
    shards.close()
    # Git-only paths remain recoverable from their original commit. SHA-256 is
    # computed from the Git blob for files absent from this workspace snapshot.
    for source in git_only:
        oid = source["gitBlob"]
        if oid in seen_git:
            continue
        seen_git.add(oid)
        try:
            raw = git("cat-file", "blob", oid)
            sha = hashlib.sha256(raw).hexdigest()
            size = len(raw)
        except Exception:
            sha = None
            size = None
        dog, state = classification(source["path"])
        entries.append({"id": f"asset-{len(entries)+1:06}", "name": Path(source["path"]).name, "type": Path(source["path"]).suffix.lower() or "none",
                        "purpose": source["path"], "dog": dog, "state": state, "source": "git-history", "sourceBranch": source["branch"],
                        "sourceCommit": source["commit"], "originalPath": source["path"], "archive": {"kind": "git-blob", **source},
                        "sha256": sha, "gitBlob": oid, "sizeBytes": size, "approvalStatus": "UNKNOWN",
                        "statusEvidence": "Historical Git blob; approval requires evidence from report or user.", "knownDefects": [],
                        "relatedFiles": [], "relatedPrompts": [], "physicalCopy": sha is not None, "recoverable": sha is not None,
                        "actionRequired": None if sha else "Git blob unavailable; recover from remote"})
    counts = Counter(x["type"] for x in entries)
    output = {"schemaVersion": 1, "scope": "Bulldog Race only; nested project clones and active Claude working tree excluded",
              "sourceRoots": [str(ART), str(UP)], "countsByType": dict(counts), "shards": shards.summary, "entries": entries}
    (DOC / "ASSET_MANIFEST.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n")
    (DOC / "ARCHIVE_SHARDS.json").write_text(json.dumps(shards.summary, ensure_ascii=False, indent=2) + "\n")
    print("entries", len(entries), "shards", len(shards.summary), "tar bytes", sum(x["sizeBytes"] for x in shards.summary))


if __name__ == "__main__":
    main()
