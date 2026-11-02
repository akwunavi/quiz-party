#!/usr/bin/env python3
"""Short demo of the Pups selection screen built ONLY from the package: MANIFEST.json paths + runtime/dog4_selection.mjs.
IDLE from f0, the player picks on IDLE f40 (between gates), IDLE plays forward to the gate f74, SELECTED s0-s120, IDLE from f1 for 2 s.
Card 638×360 (scale 0.5) whose TOP EDGE = TOP EDGE OF THE IMAGE (required layout: the ears of s63-s70 leave the card).
usage: python3 tools/demo_selection.py WORKDIR OUT.mp4"""
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H);R=os.path.dirname(P)
W,O=sys.argv[1],sys.argv[2];M=json.load(open(os.path.join(P,'MANIFEST.json')));sel=M['selection']
seq=json.loads(subprocess.run(['node','-e',f"""import('{H}/runtime/dog4_selection.mjs').then(({{createSelection}})=>{{
 const m=createSelection({json.dumps(sel['policy']['gates'])},0),o=[];
 for(let t=0;t<41;t++)o.push({{...m.next(),pick:false}});m.pick();o[o.length-1].pick=true;
 let after=0;while(after<48){{const c=m.next();o.push({{...c,pick:false}});if(o.length>45&&c.clip==='IDLE'&&c.mode==='IDLE'&&o.some(x=>x.clip==='SELECTED'))after++;}}
 console.log(JSON.stringify(o));}})"""],capture_output=True,text=True,check=True).stdout)
for st in ('IDLE','SELECTED'):
    d=f'{W}/{st}';os.makedirs(d,exist_ok=True)
    if len(os.listdir(d))<sel['states'][st]['frames']:
        subprocess.run(['ffmpeg','-v','error','-y','-c:v','libvpx-vp9','-i',os.path.join(R,sel['states'][st]['asset']['path']),'-pix_fmt','rgba','-start_number','0',f'{d}/%03d.png'],check=True)
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
PAGE,CARD=(28,30,38),(222,203,164);cw,chh=638,360;X,Y=41,70
os.makedirs(f'{W}/out',exist_ok=True);picked=False
for n,s in enumerate(seq):
    im=Image.new('RGB',(720,500),PAGE);g=ImageDraw.Draw(im)
    card=Image.new('RGB',(cw,chh),CARD);d=Image.open(f"{W}/{s['clip']}/{s['frame']:03d}.png").resize((cw,chh),Image.LANCZOS);card.paste(d,(0,0),d)
    mask=Image.new('L',(cw,chh),0);ImageDraw.Draw(mask).rounded_rectangle([0,0,cw-1,chh-1],18,fill=255);im.paste(card,(X,Y),mask)
    picked=picked or s['pick']
    g.text((X,22),'Пупс (dog4) · экран выбора · карточка 638×360, верх кадра = верх карточки',font=f2,fill=(200,200,210))
    if s['clip']=='SELECTED': lab,col=f"SELECTED s{s['frame']}",(255,214,120)
    elif picked and not any(x['clip']=='SELECTED' for x in seq[:n]): lab,col=f"IDLE f{s['frame']} · ждём стойку (вперёд)",(140,200,255)
    else: lab,col=f"IDLE f{s['frame']}",(230,230,230)
    if s['frame'] in sel['policy']['gates'] and s['clip']=='IDLE': lab+=' · ворота'
    g.text((X,Y+chh+20),lab+('   ◀ ВЫБОР' if s['pick'] else ''),font=F,fill=col)
    g.text((X,Y+chh+52),f"{n/24:5.2f} с",font=f2,fill=(160,160,170))
    im.save(f'{W}/out/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{W}/out/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',O],check=True)
json.dump(seq,open(O.replace('.mp4','_timeline.json'),'w'))
print(len(seq),'frames',[ (i,x['clip'],x['frame']) for i,x in enumerate(seq) if i and (x['clip']!=seq[i-1]['clip'] or x['pick'])])
