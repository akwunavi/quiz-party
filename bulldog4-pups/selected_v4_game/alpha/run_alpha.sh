#!/bin/bash
# Pups SELECTED v4 alpha: shared pipeline (bulldog1-frenk/alpha_pipeline), default settings, on the graded lossless clip s0..s120.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad
cd $S/alpha_pipeline && .venv/bin/python dog_alpha.py $S/sel_graded_lossless.mp4 --work $S/alpha_work_pups_sel --out /home/user/wt-codex/bulldog4-pups/selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm && .venv/bin/python verify_alpha.py /home/user/wt-codex/bulldog4-pups/selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm --out $S/pups_sel_verify && echo ALL_DONE
