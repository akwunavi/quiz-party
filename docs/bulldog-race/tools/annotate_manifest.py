#!/usr/bin/env python3
"""Add evidence-based status and decoded alpha checks to the inventory."""
import json
import subprocess
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "ASSET_MANIFEST.json"
RUN_SHA = "1a26ccd66ed780b75564a9fdb2fab5fc5cd0cd0b8b4d0e24e7d169d84fec045f"
STAND_SHA = "b4588f89232be9181fb856cde572f87bb80d49bd86664a303d0d9be41e9eb659"
SNIFF_SOURCE_SHA = "a3763aa5d1ac69c994f4a82f416249f8a9a74980a984d9e42bb92a73e5cfb7df"


def alpha_check(path, width, height):
    if not Path(path).is_file() or not width or not height:
        return None
    try:
        raw = subprocess.check_output([
            "ffmpeg", "-v", "error", "-c:v", "libvpx-vp9", "-i", path,
            "-frames:v", "1", "-vf", "scale=64:64", "-pix_fmt", "rgba",
            "-f", "rawvideo", "-"
        ], timeout=30)
        alpha = raw[3::4]
        return bool(alpha and min(alpha) < 255)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return None


def category(item):
    path = item["originalPath"].lower()
    suffix = item["type"]
    if suffix in (".mp4", ".webm"):
        return "source video" if item["source"] == "user-upload" or "kling" in path else "animation or diagnostic video"
    if suffix in (".png", ".jpg", ".jpeg", ".webp"):
        return "source/reference image" if "reference" in path or "stand" in path else "animation frame or diagnostic image"
    if suffix == ".zip":
        return "historical bundle"
    if suffix in (".py", ".mjs", ".js", ".sh"):
        return "processing, playback, or validation script"
    if suffix in (".md", ".txt"):
        return "report, prompt, or source instruction"
    return "historical Bulldog Race material"


def main():
    data = json.loads(MANIFEST.read_text())
    for item in data["entries"]:
        item["purpose"] = category(item)
        sha = item.get("sha256")
        path = item["originalPath"].lower()
        if sha == RUN_SHA:
            item["approvalStatus"] = "APPROVED"
            item["statusEvidence"] = "User explicitly identified this exact alpha RUN as approved for dog #4; identical SHA-256 across copies."
        elif sha == STAND_SHA:
            item["approvalStatus"] = "REFERENCE"
            item["statusEvidence"] = "DOG4_BASE_STAND is the specified common pose in the user-approved transition workflow."
        elif sha == SNIFF_SOURCE_SHA:
            item["approvalStatus"] = "APPROVED"
            item["statusEvidence"] = "User explicitly approved visual behavior of kling_20261009_VIDEO_Animate_th_144_0.mp4."
        elif "/sniff-pee-lab/transition-rework/" in path and item["type"] in (".mp4", ".webm"):
            item["approvalStatus"] = "REJECTED"
            item["statusEvidence"] = "User rejected direct RUN→SNIFF_PEE→RUN joins; see transition-rework/REPORT.md."
            item["knownDefects"] = ["Visible change of angle/pose at transition; crossfade can produce double limbs."]
        elif "/sniff-pee-lab/" in path and "v1" in Path(path).name and item["type"] in (".mp4", ".webm"):
            item["approvalStatus"] = "SUPERSEDED"
            item["statusEvidence"] = "Initial SNIFF_PEE take was replaced by explicitly approved 2026-10-09 Kling source; see REPORT-v2.md."
        elif item["type"] in (".py", ".mjs", ".js", ".sh") or any(x in path for x in ("/qc/", "/masks/", "/frames/", "diagnostic", "comparison", "contact_sheet")):
            item["approvalStatus"] = "EXPERIMENTAL"
            item["statusEvidence"] = "Processing or diagnostic material; no per-file visual approval established."
        else:
            item["approvalStatus"] = "UNKNOWN"
            item["statusEvidence"] = "No explicit per-file approval or rejection found in available reports and user instructions."
        if item["type"] == ".webm":
            check = alpha_check(item["originalPath"], item.get("width"), item.get("height"))
            if check is not None:
                item["alpha"] = check
                item["alphaEvidence"] = "Decoded first frame with libvpx-vp9 to RGBA; alpha min < 255" if check else "Decoded first frame with libvpx-vp9 to RGBA; all sampled alpha values 255"

    missing = [
        ("Original Kling prompts and generation settings for DOG4 RUN/STOP/START/SNIFF_PEE/RETURN/BUTTERFLY/ROLL", "PROMPT_ARCHIVE.md; source filenames in DOG4_ASSETS.md", "Original text and settings were not present in accessible reports or uploads."),
        ("BONE source animation and exact rejection record", "dog4-run-reference/REPORT.md and user archive request section 5", "BONE is mentioned as historical idea, but no matching original clip was found."),
        ("Bulldog #4 MASTER original if separate from DOG4_BASE_STAND.png", "User STAND architecture request and DOG4_ASSETS.md", "A distinct master source could not be verified."),
    ]
    for name, source, reason in missing:
        if any(x["name"] == name and x["approvalStatus"] == "MISSING" for x in data["entries"]):
            continue
        data["entries"].append({
            "id": f"missing-{len(data['entries']) + 1:06}", "name": name, "type": "missing", "purpose": "historical source",
            "dog": 4, "state": None, "source": source, "sourceBranch": None, "sourceCommit": None,
            "originalPath": None, "archive": None, "sha256": None, "gitBlob": None, "sizeBytes": None,
            "approvalStatus": "MISSING", "statusEvidence": reason, "knownDefects": [], "relatedFiles": [], "relatedPrompts": [],
            "physicalCopy": False, "recoverable": False, "actionRequired": "Supply original if available; do not reconstruct as an original."
        })
    data["countsByType"] = dict(Counter(x["type"] for x in data["entries"]))
    data["countsByStatus"] = dict(Counter(x["approvalStatus"] for x in data["entries"]))
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print("entries", len(data["entries"]), "statuses", data["countsByStatus"])


if __name__ == "__main__":
    main()
