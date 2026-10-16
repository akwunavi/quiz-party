#!/usr/bin/env bash
# Alpha for the approved STOP B of Bulldog No.2 (stop_montage_v2, commit 5c14b58):
# ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py, default settings incl. watermark exclusion) over the
# unchanged Kling originals: STOP v2 k27..k40 (0-based 26..39) and STOP v1 k66..k73 (0-based 65..72).
# RUN #89..#96 and RACE_STAND #30 come from the approved race_start_v1 alpha (#28..#100); nothing is re-matted there.
# Montage order, timing and sprite shifts stay in stop_montage_v2/montage_list.json (applied at draw time, not baked).
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/stop_v2/kling/DOG2_STOP_kling_v2_original.mp4" --work "$W/v2_k27-40" --out "$H/DOG2_STOP_v2_alpha_k27-k40.webm" --start 26 --end 39
$PY dog_alpha.py "$B/stop_v1/kling/DOG2_STOP_kling_v1_original.mp4" --work "$W/v1_k66-73" --out "$H/DOG2_STOP_v1_alpha_k66-k73.webm" --start 65 --end 72
echo ALL_DONE
