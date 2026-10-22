#!/usr/bin/env bash
# Alpha for Zefir's RETURN_TO_IDLE v1 montage (r2-r28, r33-r71, r75-r117 with the constant tone correction, ../montage/make_montage.py,
# lossless RGB input): ONE pass of the validated pipeline, default settings (watermark exclusion, no floor-ribbon cleanup).
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh MONTAGE_LOSSLESS_MP4 WORKROOT
set -e
IN="${1:?montage mp4}"; W="${2:?workroot}"; H="$(cd "$(dirname "$0")" && pwd)"; B="$(cd "$H/../.." && pwd)"; PIPE="${PIPE:-$B/../bulldog1-frenk/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$IN" --work "$W/return_v1" --out "$H/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm"
echo ALL_DONE
