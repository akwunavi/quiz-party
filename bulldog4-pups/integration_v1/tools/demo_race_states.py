#!/usr/bin/env python3
"""Short demo of the Pups race states IN PLACE (no track movement, no Race V3 integration), built only from the game atlas
(dog4-v3-lab/manifest.json + assets) and the V3 frame mapping dog4-v3-lab/model.mjs frameFor. Order as V3 builds a race with all three events:
BASE 0.5 s → START → RUN → STOP → SNIFF_PEE → RETURN → START → RUN → STOP → BUTTERFLY → START → RUN → STOP → ROLL → START → RUN →
FINISH_DECELERATE (= STOP) → BASE 1.5 s. Left: game scale (sprite 207×116 on the arena), right: ×2.5 with the paw line (laneY).
BUTTERFLY shows the dog's reaction only — the butterfly object is drawn by the game. usage: python3 tools/demo_race_states.py WORKDIR OUT.mp4"""
import sys,os,json,subprocess
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H);R=os.path.dirname(P)
W,O=sys.argv[1],sys.argv[2];os.makedirs(f'{W}/out',exist_ok=True)
RUN=11/24+3*12/24
SEG=[('BASE',.5),('START',1),('RUN',RUN),('STOP',37/24),('SNIFF_PEE',48/24+82/48+20/24+55/32+24/24),('RETURN',16/48+68/40+8/24+17/48),('START',1),('RUN',RUN),
     ('STOP',37/24),('BUTTERFLY',121/24),('START',1),('RUN',RUN),('STOP',37/24),('ROLL',145/24),('START',1),('RUN',RUN),('FINISH_DECELERATE',37/24),('BASE',1.5)]
seq=json.loads(subprocess.run(['node','-e',f"""import('{R}/dog4-v3-lab/model.mjs').then(m=>{{const seg={json.dumps(SEG)},o=[];let T=0,n=0;
 for(const [k,d] of seg){{const t0=T;T+=d;while((n+.5)/24<T-1e-9){{const t=(n+.5)/24;const [c,f]=m.frameFor({{kind:k,t0}},t);o.push([k,c,f,t]);n++;}}}}console.log(JSON.stringify(o));}})"""],capture_output=True,text=True,check=True).stdout)
man=json.load(open(f'{R}/dog4-v3-lab/manifest.json'));lay=json.load(open(f'{R}/dog4-v3-lab/layout.json'))
cw,ch,cols=man['cellWidth'],man['cellHeight'],man['columns'];sw,sh,ax,ay=lay['spriteWidth'],lay['spriteHeight'],lay['spriteAnchorX'],lay['spriteTopOffset']
sheets={k:Image.open(f"{R}/dog4-v3-lab/{v['file']}").convert('RGBA') for k,v in man['clips'].items()}
arena=Image.open(f'{R}/dog4-v3-lab/assets/arena.png').convert('RGB').resize((lay['width'],lay['height']))
laneY=lay['laneTop'];X=700                                   # lane 1, a fixed course point (no movement)
bg=arena.crop((X-260,laneY-170,X+140,laneY+60))             # 400×230 window of the real arena around the anchor
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
for n,(seg,clip,f,t) in enumerate(seq):
    cell=sheets[clip].crop(((f%cols)*cw,(f//cols)*ch,(f%cols+1)*cw,(f//cols+1)*ch)).resize((sw,sh),Image.LANCZOS)
    im=Image.new('RGB',(1080,420),(26,28,34));g=ImageDraw.Draw(im)
    a=bg.copy();a.paste(cell,(260-ax,170-ay),cell);im.paste(a,(20,60))                     # game scale
    big=Image.new('RGB',(600,330),(214,222,206));gb=ImageDraw.Draw(big);k=2.5
    c2=cell.resize((int(sw*k),int(sh*k)),Image.LANCZOS);px,py=300-int(ax*k)+int(sw*k*0.2),300
    gb.line([0,py,600,py],fill=(120,90,60),width=2);big.paste(c2,(px,py-int(ay*k)),c2);im.paste(big,(450,60))
    g.text((20,18),'Пупс (dog4) · гоночные состояния на месте (без движения по трассе) · атлас + V3 frameFor',font=f2,fill=(200,200,210))
    g.text((20,305),'масштаб игры (спрайт 207×116, арена V3, дорожка 1)',font=f2,fill=(170,170,180));g.text((450,395),'×2,5 · коричневая линия = laneY (якорь лап)',font=f2,fill=(170,170,180))
    name={'FINISH_DECELERATE':'FINISH (= STOP)','BASE':'RACE_STAND (BASE)'}.get(seg,seg)
    g.text((20,335),name,font=F,fill=(255,214,120));g.text((20,365),f'{clip} кадр {f}   {t:6.2f} с',font=f2,fill=(220,220,230))
    if seg=='BUTTERFLY': g.text((20,388),'реакция собаки; бабочку рисует игра',font=f2,fill=(255,214,120))
    im.save(f'{W}/out/{n:04d}.png')
subprocess.run(['ffmpeg','-v','error','-y','-framerate','24','-i',f'{W}/out/%04d.png','-c:v','libx264','-crf','18','-pix_fmt','yuv420p',O],check=True)
json.dump(seq,open(O.replace('.mp4','_timeline.json'),'w'))
print(len(seq),'frames',round(len(seq)/24,2),'s')
