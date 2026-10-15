#!/usr/bin/env python3
"""Stage 4: render the chain timeline(s) on the real V3 arena at game scale (sprite 207x116 on 1920x1080, one lane),
with the WORKING ALPHA of every clip (no colour mattes). Offline re-implementation of dog4-v3-lab/app.mjs draw() for one lane
(arena, lane band, shadow ellipse, sprite anchor), the same as race-v3-stop-visual-test/render_stop_demo.py.
usage: render_chain.py TIMELINE.json OUTDIR --arena PNG --dec DIR [--crop]
  DIR must contain: run/f%03d.png (#n -> f(n-39)), v4/f%03d.png (STOP V4 alpha, k38 -> f001), stand.png (RACE_STAND alpha RGBA),
  sniff/f%03d.png (SNIFF_PEE V3.2 EVENT alpha), v1f/, g3f/ (RACE_START alphas), stop1/ (STOP v1 alpha, for the 'before' timeline)."""
import sys,os,json,re
from PIL import Image,ImageDraw,ImageFont
tl=json.load(open(sys.argv[1])); OUT=sys.argv[2]; os.makedirs(OUT,exist_ok=True)
arg=lambda n: sys.argv[sys.argv.index(n)+1]
D=arg('--dec'); L=tl['layout']; SW,SH,AX,TOP,LANE=L['spriteWidth'],L['spriteHeight'],L['spriteAnchorX'],L['spriteTopOffset'],L['laneTop']; SC=SW/1276
arena=Image.open(arg('--arena')).convert('RGBA').resize((L['width'],L['height'])); ov=Image.new('RGBA',arena.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
d.rectangle((0,0,L['width'],155),fill=(21,38,40,214))
for x in (L['startX'],L['finishX']): d.line([(x,170),(x,1006)],fill=(255,250,217,242),width=5)
d.rectangle((0,LANE-111,L['width'],LANE+40),fill=(20,39,40,82)); d.line([(L['startX'],LANE+19),(L['finishX'],LANE+19)],fill=(255,247,211,158),width=2)
scene=Image.alpha_composite(arena,ov); cache={}
def path(lab):
    if lab=='RACE_STAND': return f'{D}/stand.png'
    k,n=re.match(r'(run|v4k|sniffEv|v1f|g3f|stop|bf)(\d+)$',lab).groups(); n=int(n)
    return {'run':f'{D}/run/f{n-39:03d}.png','v4k':f'{D}/v4/f{n-37:03d}.png','sniffEv':f'{D}/sniff/f{n:03d}.png','v1f':f'{D}/v1f/f{n:03d}.png','g3f':f'{D}/g3f/f{n:03d}.png','stop':f'{D}/stop1/f{n:03d}.png','bf':f'{D}/bf/f{n:03d}.png'}[k]
def spr(lab):
    if lab not in cache: cache[lab]=Image.open(path(lab)).convert('RGBA').resize((SW,SH),Image.LANCZOS)
    return cache[lab]
font=ImageFont.load_default()
for i,r in enumerate(tl['ticks']):
    x=r['x']; xs=x+r['shiftSrc']*SC; img=scene.copy()   # shadow follows the sprite shift (proposal; see RESULT)
    sh=Image.new('RGBA',img.size,(0,0,0,0)); ImageDraw.Draw(sh).ellipse((xs-109,LANE-3,xs+9,LANE+7),fill=(28,45,35,94)); img=Image.alpha_composite(img,sh)
    img.alpha_composite(spr(r['label']),(int(round(x-AX+r['shiftSrc']*SC)),int(LANE-TOP)))
    im=img.convert('RGB'); ImageDraw.Draw(im).text((12,1050),f"t={r['t']:.2f}s  phys {r['phys']}  window {r['window']}  frame {r['label']}  shift {r['shiftSrc']:+.1f} src px",fill=(255,240,160),font=font)
    im.save(f'{OUT}/f{i:04d}.png')
print(len(tl['ticks']),'frames')
