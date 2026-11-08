#!/bin/bash
# Luna RUN G1 alpha: shared pipeline (bulldog1-frenk/alpha_pipeline), default settings, whole Kling original 0..120. Work dir in the scratchpad.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad;B=/home/user/wt-codex/bulldog5-luna/stage5_run
cd $S/alpha_pipeline && .venv/bin/python dog_alpha.py $B/DOG5_RUN_G1_kling_original.mp4 --work $S/luna_aw_run --out $B/alpha/DOG5_RUN_G1_alpha_f0-f120.webm && echo RUN_DONE
