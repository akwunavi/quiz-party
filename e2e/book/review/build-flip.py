#!/usr/bin/env python3
"""Два варианта перелистывания страницы «Книги» на кадрах НАСТОЯЩИХ экранов (shots/redesign): A — жёсткая страница на корешке,
B — страница с изгибом (16 полос). Self-contained HTML. usage: python3 -I e2e/book/review/build-flip.py"""
import base64, io, os
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
D = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', 'redesign')
def b64(name):
    im = Image.open(os.path.join(D, name)).convert('RGB'); im = im.resize((1280, 720), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=62, method=6); return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()
A, B = b64('05-q-1img-1920x1080.webp'), b64('06-q-2img-1920x1080.webp')
html = '''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Перелистывание страницы — два варианта</title>
<style>
:root{--bg:#1c1410;--ink:#f1e4c6;--gold:#c9a14a;--red:#7a1f2b}
@media (prefers-color-scheme:light){:root{--bg:#f3ead6;--ink:#2a1a12}}
html,body{margin:0;background:var(--bg);color:var(--ink);font:15px system-ui}
main{max-width:1100px;margin:0 auto;padding:16px}
.bar{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
button{background:var(--red);color:#fff;border:1px solid var(--gold);border-radius:6px;padding:8px 14px;cursor:pointer;font:inherit}
button.on{background:var(--gold);color:#2a1a12}
#view{position:relative;width:100%;aspect-ratio:16/9;perspective:2200px;perspective-origin:50% 38%;background:#000;overflow:hidden;border-radius:6px}
.layer{position:absolute;inset:0;background-size:100% 100%}
#under-l,#under-r{position:absolute;top:0;bottom:0;background-size:200% 100%}
#under-l{left:0;width:50%}#under-r{left:50%;width:50%}
#flip{position:absolute;left:50%;top:0;width:50%;height:100%;transform-style:preserve-3d}
.strip{position:absolute;top:0;height:100%;transform-style:preserve-3d;transform-origin:0 50%}
.face{position:absolute;inset:0;backface-visibility:hidden;overflow:hidden}
.face i{position:absolute;top:0;height:100%;display:block;background-size:auto 100%}
.back{transform:rotateY(180deg)}
.shade{position:absolute;inset:0;pointer-events:none}
#gutter{position:absolute;left:calc(50% - 14px);width:28px;top:0;bottom:0;background:linear-gradient(90deg,transparent,rgba(40,20,5,.35),transparent);pointer-events:none}
small{opacity:.8}
</style></head><body><main>
<h2>Перелистывание страницы — два варианта</h2>
<p>Кадры — настоящие экраны «Книги» (вопрос 2 → вопрос 3). Это концепт на готовых кадрах, в игру не подключён: решение о том, какой вариант переносить на живые компоненты, — за ведущим.</p>
<div class="bar"><button id="va" class="on">A · жёсткая страница на корешке</button><button id="vb">B · страница с изгибом</button><button id="go">Листнуть →</button><button id="back">← Обратно</button><button id="slow">Медленно ×2</button></div>
<div id="view"><div id="under-l"></div><div id="under-r"></div><div id="gutter"></div><div id="flip"></div></div>
<p><small>Уважает prefers-reduced-motion: при включённом «уменьшении движения» страница не поворачивается, а плавно сменяется (0.25 с). Длительность 1.1 с; A — страница жёсткая, B — страница гнётся: середина отстаёт от края, на изгибе тень гуще.</small></p>
</main>
<script>
const IMG=["__A__","__B__"];let cur=0,variant='A',slow=1,busy=false;
const view=document.getElementById('view'),flip=document.getElementById('flip'),ul=document.getElementById('under-l'),ur=document.getElementById('under-r');
const rm=matchMedia('(prefers-reduced-motion: reduce)');
function setUnder(){ul.style.backgroundImage=`url(${IMG[cur]})`;ul.style.backgroundPosition='0 0';ur.style.backgroundImage=`url(${IMG[cur]})`;ur.style.backgroundPosition='100% 0'}
function build(N,from,to){flip.innerHTML='';const W=view.clientWidth/2,H=view.clientHeight,sw=W/N,strips=[];let parent=flip;
 for(let i=0;i<N;i++){const s=document.createElement('div');s.className='strip';s.style.width=sw+'px';s.style.left=(i?sw:0)+'px';
  const f=document.createElement('div');f.className='face';const fi=document.createElement('i');fi.style.cssText=`left:0;width:${sw}px;background-image:url(${IMG[from]});background-size:${W*2}px ${H}px;background-position:${-(W+i*sw)}px 0`;f.append(fi);
  const b=document.createElement('div');b.className='face back';const bi=document.createElement('i');bi.style.cssText=`left:0;width:${sw}px;background-image:url(${IMG[to]});background-size:${W*2}px ${H}px;background-position:${-(W-(i+1)*sw)}px 0`;b.append(bi);
  const sh=document.createElement('div');sh.className='shade';f.append(sh);const sh2=document.createElement('div');sh2.className='shade';b.append(sh2);
  s.append(f,b);parent.append(s);parent=s;strips.push({s,sh,sh2})}
 return strips}
function setUnderTo(i){ul.style.backgroundImage=`url(${IMG[i]})`;ur.style.backgroundImage=`url(${IMG[i]})`}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function run(dir){if(busy)return;const from=cur,to=dir>0?1:0;if(from===to)return;busy=true;
 if(rm.matches){view.animate([{opacity:1},{opacity:.0},{opacity:1}],{duration:250}).onfinish=()=>{};setTimeout(()=>{cur=to;setUnder(); busy=false},125);return}
 const N=variant==='A'?1:16;let strips;
 // под страницей: слева — старая левая половина, справа — НОВАЯ правая (при листании вперёд); назад — зеркально
 if(dir>0){ul.style.backgroundImage=`url(${IMG[from]})`;ul.style.backgroundPosition='0 0';ur.style.backgroundImage=`url(${IMG[to]})`;ur.style.backgroundPosition='100% 0';strips=build(N,from,to)}
 else{ul.style.backgroundImage=`url(${IMG[to]})`;ul.style.backgroundPosition='0 0';ur.style.backgroundImage=`url(${IMG[from]})`;ur.style.backgroundPosition='100% 0';strips=build(N,to,from)}
 const dur=1100*slow,t0=performance.now();
 (function tick(now){let t=Math.min(1,(now-t0)/dur);let p=ease(t);const total=dir>0?-180*p:-180*(1-p);
  const bend=variant==='B'?1.3*Math.sin(Math.PI*t):0;
  strips.forEach((o,i)=>{const w=N>1?(0.5-i/(N-1)):0;let a=total/N*(1+bend*w*(dir>0?1:-1)*(dir>0?1:-1));o.s.style.transform=`rotateY(${a}deg)`;
   const ang=Math.abs(total);const dark=Math.sin(Math.PI*Math.min(1,ang/180))*.55+(variant==='B'?Math.abs(bend)*.12*(1-i/N):0);
   const g=dark*(0.75+0.5*i/N);o.sh.style.background=`rgba(30,15,5,${g})`;o.sh2.style.background=`rgba(30,15,5,${g})`});
  if(t<1)requestAnimationFrame(tick);else{cur=to;setUnder();flip.innerHTML='';busy=false}})(t0)}
document.getElementById('go').onclick=()=>run(1);document.getElementById('back').onclick=()=>run(-1);
document.getElementById('va').onclick=e=>{variant='A';va.className='on';vb.className=''};document.getElementById('vb').onclick=e=>{variant='B';vb.className='on';va.className=''};
document.getElementById('slow').onclick=e=>{slow=slow===1?2:1;e.target.className=slow===2?'on':''};
setUnder();
</script></body></html>'''
html = html.replace('__A__', A).replace('__B__', B)
out = os.path.join(ROOT, 'docs-dev', 'book-redesign', 'review', 'page-flip.html')
open(out, 'w', encoding='utf-8').write(html); print(out, len(html) // 1024, 'КБ')
