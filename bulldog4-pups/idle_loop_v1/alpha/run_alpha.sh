#!/bin/bash
# Pups IDLE loop v1 alpha: shared pipeline (bulldog1-frenk/alpha_pipeline), default settings, on the graded lossless loop f0..f239.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad
cd $S/alpha_pipeline && .venv/bin/python dog_alpha.py $S/g1/idle_loop_graded_lossless.mp4 --work $S/alpha_work_pups_idle --out /home/user/wt-codex/bulldog4-pups/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm && .venv/bin/python verify_alpha.py /home/user/wt-codex/bulldog4-pups/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm --out $S/pups_idle_verify && echo ALL_DONE
