#!/usr/bin/env python3
"""Verify every archived unique payload and every logical manifest reference."""
import hashlib
import json
import subprocess
import tarfile
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
DOC = REPO / "docs" / "bulldog-race"


def digest(stream):
    h = hashlib.sha256()
    while chunk := stream.read(1024 * 1024):
        h.update(chunk)
    return h.hexdigest()


def main():
    manifest = json.loads((DOC / "ASSET_MANIFEST.json").read_text())
    checked = {}
    errors = []
    for shard in manifest["shards"]:
        path = REPO / shard["path"]
        if not path.is_file():
            errors.append(f"missing shard {path}")
            continue
        with path.open("rb") as f:
            if digest(f) != shard["sha256"]:
                errors.append(f"shard checksum {path}")
    for shard in manifest["shards"]:
        path = REPO / shard["path"]
        if not path.is_file():
            continue
        with tarfile.open(path) as tar:
            for member in tar:
                if not member.isfile():
                    continue
                with tar.extractfile(member) as f:
                    checked[("tar-member", shard["path"], member.name)] = digest(f)
    git_oids = {e["archive"]["gitBlob"] for e in manifest["entries"] if e.get("archive") and e["archive"]["kind"] == "git-blob"}
    for oid in sorted(git_oids):
        try:
            raw = subprocess.check_output(["git", "cat-file", "blob", oid], cwd=REPO)
            checked[("git-blob", oid)] = hashlib.sha256(raw).hexdigest()
        except Exception:
            errors.append(f"missing Git blob {oid}")
    for entry in manifest["entries"]:
        a = entry["archive"]
        if a is None and entry["approvalStatus"] == "MISSING":
            continue
        if a is None:
            errors.append(f"{entry['id']}: no archive location")
            continue
        key = ("tar-member", a["path"], a["member"]) if a["kind"] == "tar-member" else ("git-blob", a["gitBlob"])
        if checked.get(key) != entry["sha256"]:
            errors.append(f"{entry['id']}: content mismatch or unavailable: {entry['originalPath']}")
    result = {"logicalEntries": len(manifest["entries"]), "uniquePayloadsChecked": len(checked),
              "shardsChecked": len(manifest["shards"]), "statusCounts": dict(Counter(e["approvalStatus"] for e in manifest["entries"])),
              "errors": errors, "ok": not errors}
    (DOC / "ARCHIVE_VERIFICATION.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
