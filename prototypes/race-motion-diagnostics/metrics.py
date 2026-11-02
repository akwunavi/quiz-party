"""Write the same test trajectory and camera speeds as main.js at 24 Hz."""
import csv
import math
from pathlib import Path

OUT=Path(__file__).resolve().parent/'review/MOTION_TRACE_24HZ.csv'
def x(t,i):
    speed=[4.7,4.9,5.1][i];lead=[0,.3,-.2][i]
    pause=max(0,min(t-6,1.2)) if i==2 else 0
    return lead+speed*(t-pause)+min(t,1.2)*.4
def median(t):return sorted(x(t,i) for i in range(3))[1]
old=[1.5]
for k in range(1,18*60+2):
    t=k/60;d=(median(t)+1-old[-1])*(1-math.exp(-1/60/.85))
    old.append(old[-1]+max(-5.5/60,min(5.5/60,d)))
def old_at(t):
    u=t*60;k=min(len(old)-2,int(u));return old[k]+(old[k+1]-old[k])*(u-k)
def new_at(t):return 13+.7*median(t)
with OUT.open('w',newline='') as f:
    w=csv.writer(f);w.writerow(['time_s','dog','world_x','world_speed_u_s','old_camera_x','old_camera_speed_u_s','old_screen_speed_u_s','new_camera_x','new_camera_speed_u_s','new_screen_speed_u_s','run_frame_0_11'])
    for n in range(18*24):
        t=n/24;lo=max(0,t-.02);hi=min(18,t+.02)
        ov=(old_at(hi)-old_at(lo))/(hi-lo);nv=(new_at(hi)-new_at(lo))/(hi-lo)
        for i,name in enumerate(('Frank','Zephyr','Pups')):
            v=(x(hi,i)-x(lo,i))/(hi-lo)
            w.writerow([f'{t:.6f}',name,f'{x(t,i):.6f}',f'{v:.6f}',f'{old_at(t):.6f}',f'{ov:.6f}',f'{v-ov:.6f}',f'{new_at(t):.6f}',f'{nv:.6f}',f'{v-nv:.6f}',n%12])
print(OUT)
