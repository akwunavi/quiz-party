#!/usr/bin/env python3
"""Restore one manifest entry to a user-selected output file, verifying SHA-256."""
import argparse
import hashlib
import json
import subprocess
import tarfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
MANIFEST = REPO / "docs/bulldog-race/ASSET_MANIFEST.json"


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("asset_id", help="Unique ID from ASSET_MANIFEST.json")
    p.add_argument("output", type=Path, help="Destination file (will not be overwritten)")
    args = p.parse_args()
    manifest = json.loads(MANIFEST.read_text())
    entry = next((x for x in manifest["entries"] if x["id"] == args.asset_id), None)
    if entry is None or not entry.get("archive"):
        p.error("Asset ID missing or has no recoverable payload")
    if args.output.exists():
        p.error(f"Destination exists: {args.output}")
    a = entry["archive"]
    if a["kind"] == "git-blob":
        raw = subprocess.check_output(["git", "cat-file", "blob", a["gitBlob"]], cwd=REPO)
    else:
        with tarfile.open(REPO / a["path"]) as tar:
            member = tar.getmember(a["member"])
            if not member.isfile():
                p.error("Archived entry is not a regular file")
            with tar.extractfile(member) as f:
                raw = f.read()
    if hashlib.sha256(raw).hexdigest() != entry["sha256"]:
        p.error("SHA-256 mismatch; output was not written")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_bytes(raw)
    print(args.output, len(raw), entry["sha256"])


if __name__ == "__main__":
    main()
