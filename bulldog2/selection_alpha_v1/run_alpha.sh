#!/usr/bin/env bash
# Alpha for Bulldog No.2 selection screen: ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py, default settings incl.
# watermark exclusion, no floor-ribbon cleanup) over ALL frames of the unchanged user sources:
#   IDLE     assets/sources/bulldog_2_idle.mp4     -> DOG2_IDLE_alpha_f1-f121.webm     (the approved MAIN_L1 loop is assembled from it, build_idle_loop.sh)
#   SELECTED assets/sources/bulldog_2_selected.mp4 -> DOG2_SELECTED_alpha_f1-f121.webm (LAB ONLY: the SELECTED candidate is not approved yet)
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/assets/sources/bulldog_2_idle.mp4" --work "$W/idle" --out "$H/DOG2_IDLE_alpha_f1-f121.webm"
echo IDLE_DONE
$PY dog_alpha.py "$B/assets/sources/bulldog_2_selected.mp4" --work "$W/selected" --out "$H/DOG2_SELECTED_alpha_f1-f121.webm"
echo ALL_DONE
