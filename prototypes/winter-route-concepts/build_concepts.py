"""Crop three generated environment storyboards and overlay existing alpha dogs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

HERE=Path(__file__).resolve().parent
OLD=HERE.parent/'winter-arena-lab'/'assets'
SOURCES={
  'A':Path('/workspace/generated_images/exec-f71507fe-32d2-4b4f-8959-9deed448f136.png'),
  'B':Path('/workspace/generated_images/exec-66a1934c-fd30-4ec8-a194-d88a038025cc.png'),
  'C':Path('/workspace/generated_images/exec-5d04c45d-157a-4b36-8b00-d59d1ef50efb.png'),
}
NAMES=['START','LANDSCAPE','SPECTATORS','FINISH']
DOGS=['frank','zephyr','dog4','frank','zephyr']
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
OUT=HERE/'concepts';OUT.mkdir(parents=True,exist_ok=True)

def frame(name,index):
  atlas=Image.open(OLD/f'{name}-run-atlas.png').convert('RGBA')
  part=atlas.crop(((index%4)*384,(index//4)*216,(index%4+1)*384,(index//4+1)*216))
  return part.crop(part.getchannel('A').getbbox())

for concept,source in SOURCES.items():
  if not source.exists():source=OUT/f'{concept}_ENVIRONMENT_BOARD.jpg'
  board=Image.open(source).convert('RGB')
  board.save(OUT/f'{concept}_ENVIRONMENT_BOARD.jpg',quality=93,subsampling=0)
  w,h=board.size
  assert 1.7 < w/h < 1.9,(source,board.size)
  images=[]
  for n,title in enumerate(NAMES):
    # One pixel white gutters are discarded before 16:9 enlargement.
    x0=(n%2)*w//2+5;x1=((n%2)+1)*w//2-5
    y0=(n//2)*h//2+5;y1=((n//2)+1)*h//2-5
    im=board.crop((x0,y0,x1,y1)).resize((1920,1080),Image.Resampling.LANCZOS).convert('RGBA')
    # Position spread deliberately communicates overtaking; all five lanes
    # stay individually readable. The sprites are unmodified approved pixels.
    xs=[450,790,1040,620,1250]
    ys=[600,680,760,840,920]
    if n==0:xs=[440,530,620,710,800]
    if n==3:xs=[1070,870,1120,970,1220]
    for i,dog in enumerate(DOGS):
      sprite=frame(dog,(n*3+i*2)%12)
      target_h=125 if i<3 else 132
      sprite.thumbnail((300,target_h),Image.Resampling.LANCZOS)
      im.alpha_composite(sprite,(xs[i],ys[i]-sprite.height))
    draw=ImageDraw.Draw(im)
    draw.rounded_rectangle((36,28,445,87),radius=14,fill=(7,29,40,218))
    draw.text((56,38),f'CONCEPT {concept}  /  {title}',font=ImageFont.truetype(FONT,24),fill='#fff8e5')
    path=OUT/f'{concept}_{n+1:02d}_{title}.jpg';im.convert('RGB').save(path,quality=94,subsampling=0)
    images.append(im.convert('RGB').resize((960,540),Image.Resampling.LANCZOS))
  contact=Image.new('RGB',(1920,1080))
  for n,im in enumerate(images):contact.paste(im,((n%2)*960,(n//2)*540))
  contact.save(OUT/f'{concept}_CONTACT.jpg',quality=94,subsampling=0)
  print(concept,board.size)
