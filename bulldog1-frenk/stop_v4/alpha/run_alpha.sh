#!/usr/bin/env bash
# Working alpha for STOP V4 (source k38-k73), SNIFF_PEE V3.2 EVENT (200 frames) and RACE_STAND v3 (1276x720 still) with the
# existing validated pipeline (bulldog1-frenk/alpha_pipeline, BiRefNet-lite + temporal mix + closed-form matting). No AI re-render.
# usage: run_alpha.sh WORKROOT   (needs alpha_pipeline/.venv and the model, see alpha_pipeline/README.md)
set -e
W="${1:?workroot}"; H="$(cd "$(dirname "$0")/../.." && pwd)"; P="$H/alpha_pipeline"; PIPE="${PIPE:-$P}"   # a copy of alpha_pipeline with .venv and models/ (same dog_alpha.py)
PY="${PY:-$PIPE/.venv/bin/python}"
cd "$PIPE"
$PY dog_alpha.py "$H/stop_v4/DOG1_STOP_v4_kling_source.mp4" --work "$W/stop_v4" --out "$H/stop_v4/alpha/DOG1_STOP_v4_alpha_k38-k73.webm" --start 37 --end 72 --exclude-rect none
$PY dog_alpha.py "$H/butterfly_prep/DOG1_BUTTERFLY_START_END_racestand.png" --work "$W/race_stand" --out "$H/stop_v4/alpha/DOG1_RACE_STAND_v3_alpha_1276.webm" --exclude-rect none --strength 0
$PY dog_alpha.py "$H/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT.mp4" --work "$W/sniff_v32" --out "$H/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT_alpha.webm" --exclude-rect none
echo ALL_DONE
# v2 of the SNIFF_PEE alpha (15.10.2026): the first pass kept a floor-shadow ribbon between the paws (e.g. EVENT frame 70);
# same cached masks, the pipeline's own --floor-shadow geometric clean-up, re-stabilise/matte/encode. v1 is kept for comparison.
if [ "${SNIFF_V2:-0}" = 1 ]; then
$PY dog_alpha.py "$H/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT.mp4" --work "$W/sniff_v32_fs" --out "$H/sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT_alpha_v2_floorshadow.webm" --exclude-rect none --floor-shadow --stages stabilise,matte,encode
fi
