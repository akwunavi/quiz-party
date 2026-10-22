#!/usr/bin/env bash
# Alpha for the approved SNIFF_PEE v1 of Bulldog No.2 (Kling 4.0): ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py,
# default settings incl. watermark exclusion, no floor-ribbon cleanup) over all 193 frames, with --min-area 1500 (as BUTTERFLY v2 / Frenk).
# Input = the original normalised to 1276x720 by ../game_source/normalise.py (uniform scale 0.99375, +0.25 px y, audio dropped, lossless).
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh NORMALISED_MP4 WORKROOT
set -e
IN="${1:?normalised mp4}"; W="${2:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/../.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$IN" --work "$W/sniff_pee_v1" --out "$H/DOG2_SNIFF_PEE_v1_alpha_s1-s193.webm" --min-area 1500
echo ALL_DONE
