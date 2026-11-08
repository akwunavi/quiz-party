#!/bin/bash
# Luna SNIFF_PEE leg-lift insert alpha: the Kling original (1284x724, audio dropped) is rescaled to 1276x720 losslessly, then the shared alpha pipeline (default settings). Resumable.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad;B=/home/user/wt-codex/bulldog5-luna
ffmpeg -v error -y -i $B/stage7_fix/sniff/DOG5_SNIFF_LEGLIFT_INSERT_G2K_kling_original.mp4 -an -vf scale=1276:720:flags=lanczos -c:v libx264rgb -crf 0 -r 24 $S/sniff_insert_1276.mp4
cd $S/alpha_pipeline && .venv/bin/python dog_alpha.py $S/sniff_insert_1276.mp4 --work $S/luna_aw_SNIFF_INSERT --out $B/stage7_fix/sniff/alpha/DOG5_SNIFF_LEGLIFT_INSERT_alpha_raw.webm && echo INSERT_DONE
