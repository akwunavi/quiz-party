#!/usr/bin/env bash
# DOG1_IDLE_v1_alpha_loop220.webm = the approved IDLE loop order f8..f118, f117..f9 (220 frames, 9.17 s) assembled from
# DOG1_IDLE_v1_alpha_f8-f118.webm (decoded with libvpx-vp9 to RGBA, re-encoded with the pipeline's VP9 alpha settings).
# Played with loop=true it repeats seamlessly (after f9 comes f8). usage: build_idle_loop.sh [WORKDIR] [OUT.webm]
set -euo pipefail
O=$(cd "$(dirname "$0")" && pwd); W=${1:-$(mktemp -d)}; OUT=${2:-$O/DOG1_IDLE_v1_alpha_loop220.webm}; mkdir -p "$W/d" "$W/seq"
ffmpeg -v error -y -c:v libvpx-vp9 -i "$O/DOG1_IDLE_v1_alpha_f8-f118.webm" -pix_fmt rgba -vsync 0 "$W/d/a%03d.png"   # a001 = f8 ... a111 = f118
k=0; for i in $(seq 1 111) $(seq 110 -1 2); do ln -sf "$W/d/a$(printf %03d $i).png" "$W/seq/s$(printf %04d $k).png"; k=$((k+1)); done
ffmpeg -v error -y -framerate 24 -i "$W/seq/s%04d.png" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 14 -auto-alt-ref 0 -row-mt 1 -cpu-used 1 -deadline good -r 24 -metadata:s:v:0 alpha_mode=1 "$OUT"
echo "frames: $k"
