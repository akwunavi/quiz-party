#!/bin/sh
# Reproducibility check: re-cuts 3 frames (70-72) of the approved Kling STOP source and compares the middle one
# with the approved WebM. Run after ./setup.sh from a fresh clone (needs ../assets/approved/*).
# Expected: mask IoU >= 0.99, no stray islands, VP9+alpha_mode, Chromium shows no background box.
set -e
cd "$(dirname "$0")"
. .venv/bin/activate
python dog_alpha.py ../assets/approved/DOG1_STOP_v1_kling_source.mp4 --work work/smoke --out work/smoke.webm \
    --start 70 --end 72 --exclude-rect none
python verify_alpha.py work/smoke.webm --out work/smoke_verify \
    --ref ../assets/approved/DOG1_STOP_v1_alpha.webm --ref-offset 70 > work/smoke_verify.log
python - <<'PY'
import json
r = json.load(open("work/smoke_verify/report.json"))
row = r["vs_reference_per_frame(idx,iou,mean|dAlpha|,rgb_err_opaque,area_new,area_ref)"][1]
chromium_ok = bool(r["chromium"].get("corners_are_magenta"))
ok = row[1] >= 0.99 and not r["frames_with_extra_islands_over_20px"] and r["container_ok"] and chromium_ok
print("frame 71: IoU %.4f  mean|dAlpha| %.2f/255  islands %s  container_ok %s  chromium_ok %s"
      % (row[1], row[2], r["frames_with_extra_islands_over_20px"], r["container_ok"], chromium_ok))
print("SMOKE TEST", "PASSED" if ok else "FAILED")
raise SystemExit(0 if ok else 1)
PY
