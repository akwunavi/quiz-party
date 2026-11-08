#!/bin/bash
# Luna batch alpha, ONE clip at a time (memory), resumable (each clip has its own work dir; dog_alpha.py resumes from what is there).
# Shared pipeline bulldog1-frenk/alpha_pipeline, default settings, whole Kling originals. Originals are only read.
S=/tmp/claude-0/-home-user-quiz-party/32f8ecfe-7b77-5373-8c6d-c1e5a6cf01d8/scratchpad;B=/home/user/wt-codex/bulldog5-luna/stage6_batch
cd $S/alpha_pipeline
for n in STOP BUTTERFLY RETURN_TO_IDLE ROLL SNIFF_PEE_RETURN; do
  out=$B/alpha/DOG5_${n}_G1_alpha.webm
  [ -f "$out" ] && { echo "skip $n"; continue; }
  .venv/bin/python dog_alpha.py $B/sources/DOG5_${n}_G1_kling_original.mp4 --work $S/luna_aw_$n --out "$out" && echo "DONE $n" || echo "FAIL $n"
done
echo BATCH_DONE
