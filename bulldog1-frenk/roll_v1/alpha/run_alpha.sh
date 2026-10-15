#!/usr/bin/env bash
# Working alpha for ROLL v1 (all 121 source frames) with the existing validated pipeline (alpha_pipeline/dog_alpha.py). No AI re-render.
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")/../.." && pwd)"; PIPE="${PIPE:-$H/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"; cd "$PIPE"
$PY dog_alpha.py "$H/roll_v1/DOG1_ROLL_v1_kling_source.mp4" --work "$W/roll_v1" --out "$H/roll_v1/alpha/DOG1_ROLL_v1_alpha.webm" --exclude-rect none
echo ALL_DONE
