#!/usr/bin/env python3
"""Reference image for the Luna RACE_STAND generation: Luna's own side view from RUN vs2 (alpha v2 frame, gathered legs) placed on a plain
plate of Luna's studio (row profile of the empty left edge of FRONT_STAND f0) at the race scale of the other dogs: paw line y=680, centre x=640,
height ~620 px of the 1276x720 frame. Only placement/scale — the dog's pixels are not changed. usage: make_reference.py RUN_ALPHA.png FRONT_f0.png OUT.png"""
import sys
import numpy as np
from PIL import Image
ra,f0,out=sys.argv[1:4]
F=np.asarray(Image.open(f0).convert('RGB')).astype(np.float32)
prof=F[:,20:140].mean(1)                                   # empty studio, per row
plate=np.repeat(prof[:,None,:],1276,axis=1)
dog=Image.open(ra).convert('RGBA');bb=dog.getchannel('A').getbbox();dog=dog.crop(bb)
a=np.asarray(dog)[...,3];ys,xs=np.nonzero(a>128);h=ys.max()-ys.min()+1
s=620/h;dog=dog.resize((round(dog.width*s),round(dog.height*s)),Image.LANCZOS)
a=np.asarray(dog)[...,3].astype(float);ys,xs=np.nonzero(a>128);cx=(a.sum(0)*np.arange(dog.width)).sum()/a.sum()
im=Image.fromarray(plate.round().astype(np.uint8)).convert('RGBA');im.alpha_composite(dog,(int(round(640-cx)),int(680-ys.max())))
im.convert('RGB').save(out);print('scale',round(s,3),'size',dog.size)
