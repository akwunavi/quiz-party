#!/usr/bin/env bash
# Alpha of the EARLY frames f1-f24 of Frenk's approved SELECTED source (assets/sources/bulldog_01_selected.mp4), needed only for entry
# variant B (IDLE f8-f13 -> SELECTED f4-f9 ... f19 -> approved SELECTED f20-f121). One pass of the validated pipeline, default settings.
# The approved DOG1_SELECTED_v1_alpha_f20-f121.webm is NOT changed; f20-f24 are included only to compare with it.
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha_selected_entry.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/../.." && pwd)"; PIPE="${PIPE:-$B/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/assets/sources/bulldog_01_selected.mp4" --work "$W/frenk_sel_entry" --out "$H/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm" --start 0 --end 23
echo ALL_DONE
