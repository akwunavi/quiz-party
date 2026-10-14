#!/usr/bin/env bash
# Throw-away patched COPY of dog4-v3-lab/model.mjs + scenario.mjs in $1 (per-lane overrides of STOP / BUTTERFLY durations). Measurement only; originals are not touched.
set -e
SRC="$(cd "$(dirname "$0")/../dog4-v3-lab" && pwd)"; DST="${1:?usage: prepare.sh <empty tmp dir>}"; mkdir -p "$DST"
cp "$SRC/model.mjs" "$SRC/scenario.mjs" "$DST/"; cp "$(dirname "$0")/export_timelines.mjs" "$DST/"
python3 - "$DST" <<'PY'
import sys; p=sys.argv[1]+'/model.mjs'; m=open(p).read()
def rep(a,b):
    global m; assert a in m, a; m=m.replace(a,b)
rep("const STOP=37/24, BUTTERFLY=121/24, ROLL=145/24;","let STOP=37/24, BUTTERFLY=121/24, ROLL=145/24;")
rep("const SNIFF=48/24+82/48+20/24+55/32+24/24;","let SNIFF=48/24+82/48+20/24+55/32+24/24;")
rep("const RETURN=16/48+68/40+8/24+17/48, START=1;","let RETURN=16/48+68/40+8/24+17/48, START=1;")
rep("const RUN_JOIN=23/24, LOOP=12/24, EPS=1e-9;","let RUN_JOIN=23/24; const LOOP=12/24, EPS=1e-9;\nconst D0={BUTTERFLY:121/24,ROLL:145/24,STOP:37/24,SNIFF:48/24+82/48+20/24+55/32+24/24,RETURN:16/48+68/40+8/24+17/48,START:1,RUN_JOIN:23/24};")
rep("const speedAt=(dog,p,base=dog.base)=>BASE_SPEED*base*dog.variations[band(p)];","const speedAt=(dog,p,base=dog.base)=>BASE_SPEED*base*dog.variations[band(p)]*(dog.kScale??1);")
rep("export function buildDog(preset,index){","export function buildDog(preset,index){\n  const C=globalThis.__CFG?.[index]||{};STOP=C.STOP??D0.STOP;BUTTERFLY=C.BUTTERFLY??D0.BUTTERFLY;ROLL=C.ROLL??D0.ROLL;SNIFF=C.SNIFF??D0.SNIFF;RETURN=C.RETURN??D0.RETURN;START=C.START??D0.START;RUN_JOIN=C.RUN_JOIN??D0.RUN_JOIN;")
rep("const dog={index,preset,...config,segments:[],eventsActual:[]};","const dog={index,preset,...config,segments:[],eventsActual:[],kScale:C.k??1};")
open(p,'w').write(m)
PY
echo "ready: cd $DST && REPO=<repo root> [SEED=n] node export_timelines.mjs"
