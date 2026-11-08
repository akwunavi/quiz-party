#!/bin/bash
# Luna IDLE and SELECTED alpha: shared pipeline (bulldog1-frenk/alpha_pipeline), default settings, on the untouched Kling originals
# (tone already matches FRONT_STAND f0 within 1.3/255 — no grade). Work dirs in the session scratchpad.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad;B=/home/user/wt-codex/bulldog5-luna
cd $S/alpha_pipeline
.venv/bin/python dog_alpha.py $B/sources/DOG5_IDLE_kling_original.mp4 --work $S/luna_aw_idle --out $B/stage2/alpha/DOG5_IDLE_alpha_f0-f120.webm && echo IDLE_DONE
.venv/bin/python dog_alpha.py $B/sources/DOG5_SELECTED_kling_original.mp4 --work $S/luna_aw_sel --out $B/stage2/alpha/DOG5_SELECTED_alpha_s0-s120.webm && echo SEL_DONE
