#!/usr/bin/env bash
# Alpha for Bulldog No.2 RACE_STAND (#30), RACE_START (B: #30-#71 -> #96; reserve A: #30-#87) and the RUN loop #88-#99:
# ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py, default settings incl. the KlingAI watermark exclusion)
# over source frames #28..#100 (0-based) of the unchanged RUN source. No re-render, no motion change.
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")/.." && pwd)"; B="$(cd "$H/.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/assets/sources/bulldog_02_run.mp4" --work "$W/run28-100" --out "$H/alpha/DOG2_RUN_alpha_src28-100.webm" --start 28 --end 100
echo ALL_DONE
