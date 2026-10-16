#!/usr/bin/env bash
# Alpha for the approved BUTTERFLY v2 of Bulldog No.2: ONE pass of the validated pipeline (alpha_pipeline/dog_alpha.py, default
# settings incl. watermark exclusion) over all 121 frames of the unchanged Kling original, with --min-area 1500 (as Frenk's
# BUTTERFLY) so the small moth Kling drew in the air (separate from the dog) is dropped as an island. The far-ear frames
# b37-b42 are left as generated (user decision). usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/../.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$B/butterfly_v2/kling/DOG2_BUTTERFLY_v2_original.mp4" --work "$W/butterfly_v2" --out "$H/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm" --min-area 1500
echo ALL_DONE
