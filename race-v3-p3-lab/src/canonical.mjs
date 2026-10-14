// Canonical V3 windows, PARSED (read-only) from dog4-v3-lab/model.mjs. The lab never owns these numbers: if V3 changes, the validator fails.
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../../dog4-v3-lab/model.mjs',import.meta.url),'utf8');
const ev=e=>{if(!/^[0-9+\-*/(). ]+$/.test(e))throw new Error('unsafe expr '+e);return Function('return ('+e+')')();};
const grab=name=>{const m=src.match(new RegExp('(?:const|let)\\s[^;]*?\\b'+name+'=([^,;\\n]+)'));if(!m)throw new Error('constant '+name+' not found in model.mjs');return ev(m[1]);};
const bases=[...src.matchAll(/add\([^\n]*'BASE',\s*([0-9.]+)/g)].map(m=>+m[1]);
const fpsM=src.match(/export const FPS=(\d+)/);if(!fpsM)throw new Error('FPS not found');
export const FPS=+fpsM[1];
export const CANON=Object.freeze({FPS,START:grab('START'),STOP:grab('STOP'),RUN_JOIN:grab('RUN_JOIN'),LOOP:grab('LOOP'),
  BUTTERFLY:grab('BUTTERFLY'),ROLL:grab('ROLL'),SNIFF:grab('SNIFF'),RETURN:grab('RETURN'),
  BASE_START:bases[0],BASE_FINISH:bases[bases.length-1]});
export const ACTION_WINDOW_FRAMES=Object.freeze({BUTTERFLY:CANON.BUTTERFLY*FPS,ROLL:CANON.ROLL*FPS,SNIFF_PEE:(CANON.SNIFF+CANON.RETURN)*FPS});
