#!/usr/bin/env python3
"""Writes LIBRARY.json: the reproducible index of ALL approved Frenk animations (race package frenk-integration-1.0.0 by reference,
unchanged, + selection-screen IDLE / SELECTED / RETURN_TO_IDLE alpha) with SHA-256 of every file. usage: make_library.py"""
import json,hashlib,os,subprocess
H=os.path.dirname(os.path.abspath(__file__));B=os.path.dirname(H);R=os.path.relpath
sha=lambda p:hashlib.sha256(open(p,'rb').read()).hexdigest()
def f(rel,**kw): p=os.path.join(B,rel);return {'path':rel,'sha256':sha(p),'bytes':os.path.getsize(p),**kw}
def frames(rel): return int(subprocess.run(['ffprobe','-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=nb_read_frames','-of','csv=p=0',os.path.join(B,rel)],capture_output=True,text=True,check=True).stdout.strip())
I='integration_v1/';S='selection_alpha_v1/'
race={'package':I,'contractVersion':'frenk-integration-1.0.0','status':'approved, unchanged by this library','readme':I+'README.md',
 'states':['RACE_STAND','RUN','RACE_START','STOP (V4)','SNIFF_PEE (V3.2)','BUTTERFLY','ROLL','FINISH (= STOP V4)'],
 'files':[f(I+'contract/frenk.contract.integration.json'),f(I+'contract/frenk_start_shift_arrays.json'),f(I+'contract/frenk_stop_v4_shift_arrays.json'),
   f(I+'atlas/frenk_atlas.json')]+[f(I+f'atlas/frenk_{k}.png') for k in ['run','start','stop','sniff','bf','roll']]+[f(I+'runtime/frenk_visual.mjs')],
 'check':'node integration_v1/tools/check_package.mjs; integration_v1/tools/rebuild_atlas.sh'}
sel={
 'canvas':'1276x720, 24 fps, VP9 + alpha (alpha_mode=1, decode with libvpx-vp9), same studio camera for all three clips; the dog is not repositioned or scaled between clips',
 'sequence':'IDLE (loop, any number of cycles) -> SELECTED (once) -> RETURN_TO_IDLE (once) -> IDLE loop resumed at index 1 (source f9), forever. RETURN r121 takes the place of IDLE f8 (index 0).',
 'IDLE':{'status':'approved v1','file':f(S+'DOG1_IDLE_v1_alpha_loop220.webm',frames=frames(S+'DOG1_IDLE_v1_alpha_loop220.webm')),'loop':True,
   'order':'source f8..f118 then f117..f9 (ping-pong); after the last frame comes the first one','builtFrom':f(S+'DOG1_IDLE_v1_alpha_f8-f118.webm',frames=frames(S+'DOG1_IDLE_v1_alpha_f8-f118.webm')),
   'source':f('assets/sources/bulldog_01_idle.mp4'),'build':S+'build_idle_loop.sh','montage':'idle_selected_v1/labels.json'},
 'SELECTED':{'status':'approved v1','file':f(S+'DOG1_SELECTED_v1_alpha_f20-f121.webm',frames=frames(S+'DOG1_SELECTED_v1_alpha_f20-f121.webm')),'loop':False,
   'order':'source f20..f121','source':f('assets/sources/bulldog_01_selected.mp4'),'montage':'idle_selected_v1/labels.json'},
 'RETURN_TO_IDLE':{'status':'approved v1 (commit ef37006, montage + grade)','file':f(S+'DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm',frames=frames(S+'DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm')),'loop':False,
   'order':'Kling r2..r121 with the approved per-channel brightness grade (return_to_idle_v1/make_graded_frames.py)','source':f('return_to_idle_v1/DOG1_RETURN_TO_IDLE_v1_kling_source.mp4'),
   'next':'IDLE loop index 1'},
 'alpha':{'pipeline':'alpha_pipeline/dog_alpha.py (default settings)','run':S+'run_alpha.sh'}}
other={'FRONT_STAND':'approved still with alpha (assets/approved/DOG1_FRONT_STAND_alpha_frame0.png); not part of any sequence',
 'FIRST_START':'accepted-as-working alpha (assets/approved/DOG1_FIRST_START_alpha_src25-63.webm); not part of any sequence',
 'selectionToRace':'not designed (out of scope)'}
lib={'libraryVersion':'frenk-library-1.0.0','character':'bulldog1-frenk','race':race,'selection':sel,'notInSequences':other,
 'verify':'python3 library_v1/verify_library.py  (hashes, containers, alpha, rebuild of the IDLE loop and the RETURN grade, race package check)'}
json.dump(lib,open(os.path.join(H,'LIBRARY.json'),'w'),ensure_ascii=False,indent=1);print('ok')
