#!/usr/bin/env bash
# Alpha for the approved selection-screen animations of Frenk with the existing validated pipeline (alpha_pipeline/dog_alpha.py),
# default settings. No AI re-render, no motion change. Sources stay where they are; outputs go to this folder.
#   IDLE      bulldog_01_idle.mp4      f8..f118 (0-based 7..117)  -> DOG1_IDLE_v1_alpha_f8-f118.webm   (loop is played f8->f118->f9)
#   SELECTED  bulldog_01_selected.mp4  f20..f121 (0-based 19..120) -> DOG1_SELECTED_v1_alpha_f20-f121.webm
#   RETURN    approved graded frames r2..r121 (return_to_idle_v1/make_graded_frames.py), lossless x264rgb -> DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm
# IDLE/SELECTED sources carry the KlingAI watermark bottom-right: default --exclude-rect removes it. RETURN source has none: --exclude-rect none.
# usage: PIPE=<alpha_pipeline copy with .venv and models/> run_alpha.sh WORKROOT
set -e
W="${1:?workroot}"; O="$(cd "$(dirname "$0")" && pwd)"; H="$(cd "$O/.." && pwd)"; PIPE="${PIPE:-$H/alpha_pipeline}"; PY="${PY:-$PIPE/.venv/bin/python}"
mkdir -p "$W/retg/seq"
python3 "$H/return_to_idle_v1/make_graded_frames.py" "$W/retg"
for n in $(seq 2 121); do ln -sf "$W/retg/r$(printf %03d $n).png" "$W/retg/seq/s$(printf %04d $((n-2))).png"; done
ffmpeg -v error -y -framerate 24 -i "$W/retg/seq/s%04d.png" -c:v libx264rgb -crf 0 -preset veryslow "$W/ret_graded_r2-r121_lossless.mp4"
cd "$PIPE"
$PY dog_alpha.py "$H/assets/sources/bulldog_01_idle.mp4"     --work "$W/idle" --out "$O/DOG1_IDLE_v1_alpha_f8-f118.webm"     --start 7  --end 117
$PY dog_alpha.py "$H/assets/sources/bulldog_01_selected.mp4" --work "$W/sel"  --out "$O/DOG1_SELECTED_v1_alpha_f20-f121.webm" --start 19 --end 120
$PY dog_alpha.py "$W/ret_graded_r2-r121_lossless.mp4"        --work "$W/ret"  --out "$O/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm" --exclude-rect none
echo ALL_DONE
