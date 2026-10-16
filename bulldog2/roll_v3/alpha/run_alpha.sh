#!/usr/bin/env bash
# Alpha for the approved ROLL v3 of Bulldog No.2: ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py, default
# settings incl. watermark exclusion) over all 121 frames of the unchanged Kling original. No floor-ribbon cleanup (on Frenk's
# ROLL it cut the back lying on the floor). usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/../.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/roll_v3/kling/DOG2_ROLL_v3_original.mp4" --work "$W/roll_v3" --out "$H/DOG2_ROLL_v3_alpha_r1-r121.webm"
echo ALL_DONE
