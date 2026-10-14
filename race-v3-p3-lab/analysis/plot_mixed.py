#!/usr/bin/env python3
"""Timeline chart of a mixed-race demo json: five physical lanes (V3, unchanged) + the Frenk visual items under lane 1. Data chart, no imagery."""
import sys,json
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
d=json.load(open(sys.argv[1]))
PC={'BASE':'#bbbbbb','START':'#6fbf73','RUN':'#dfeccf','STOP':'#e8a33d','FINISH_DECELERATE':'#d9822b','BUTTERFLY':'#4a90d9','ROLL':'#8e6bbf','SNIFF_PEE':'#d94a8c','RETURN':'#e7a0c3'}
VC={'body':'#2e7d32','tail':'#f9a825','pad':'#90a4ae','hold':'#cfd8dc','move':'#e65100','missing':'#000000'}
fig,ax=plt.subplots(figsize=(17,6.4))
y=0
for L in d['lanes']:
    for s in L['segments']:
        ax.barh(y,s['t1']-s['t0'],left=s['t0'],height=.55,color=PC.get(s['kind'],'#999'),edgecolor='white',linewidth=.4)
    ax.text(-0.5,y,f"lane {L['lane']} {L['character']}",ha='right',va='center',fontsize=9)
    if L.get('items'):
        for it in L['items']:
            c='#d32f2f' if it['overflow'] else VC.get(it['role'],'#666')
            ax.barh(y-.45,it['t1']-it['t0'],left=it['t0'],height=.28,color=c,hatch='//' if it['overflow'] or it['role']=='missing' else None,edgecolor='white',linewidth=.3)
        y-=.55
    y-=1
ax.set_yticks([]);ax.set_xlabel('time, s (physical V3 timeline; visual items under lane 1)')
ax.set_title(f"{d['tag']}  seed {d['effectiveSeed']}   physical segments (top bar per lane) | Frenk visual: green body, amber tail, grey pad, orange STOP window, red hatched = truncated")
import matplotlib.patches as mp
ax.legend(handles=[mp.Patch(color=c,label=k) for k,c in PC.items() if k not in ('RUN','RETURN')]+[mp.Patch(color=VC['tail'],label='visual tail'),mp.Patch(color='#d32f2f',label='visual OVERFLOW')],ncol=8,fontsize=8,loc='lower center',bbox_to_anchor=(.5,-.2))
fig.tight_layout();fig.savefig(sys.argv[2],dpi=90)
