#!/usr/bin/env bash
# DOG2_IDLE_MAIN_L1_alpha_loop131.webm = the APPROVED IDLE loop MAIN_L1 (f15..f58, f57..f40, f41..f109; 131 frames = 5.46 s), assembled
# from DOG2_IDLE_alpha_f1-f121.webm (decoded with libvpx-vp9 to RGBA, re-encoded with the pipeline's VP9 alpha settings). Played with
# loop=true it repeats as approved (after f109 comes f15). No audio. usage: build_idle_loop.sh [WORKDIR] [OUT.webm]
set -euo pipefail
O=$(cd "$(dirname "$0")" && pwd); W=${1:-$(mktemp -d)}; OUT=${2:-$O/DOG2_IDLE_MAIN_L1_alpha_loop131.webm}; mkdir -p "$W/d" "$W/seq"
ffmpeg -v error -y -c:v libvpx-vp9 -i "$O/DOG2_IDLE_alpha_f1-f121.webm" -pix_fmt rgba -vsync 0 "$W/d/a%03d.png"   # a001 = f1 ... a121 = f121
k=0; for i in $(seq 15 58) $(seq 57 -1 40) $(seq 41 109); do ln -sf "$W/d/a$(printf %03d $i).png" "$W/seq/s$(printf %04d $k).png"; k=$((k+1)); done
ffmpeg -v error -y -framerate 24 -i "$W/seq/s%04d.png" -an -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 14 -auto-alt-ref 0 -row-mt 1 -cpu-used 1 -deadline good -r 24 -metadata:s:v:0 alpha_mode=1 "$OUT"
echo "frames: $k"
