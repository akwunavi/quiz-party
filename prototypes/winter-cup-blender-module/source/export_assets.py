"""Render separate transparent browser props from the saved Blender scene."""
import bpy
import os
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets';OUT.mkdir(exist_ok=True)
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.use_denoising=False
scene.render.film_transparent=True
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
scene.render.threads_mode='FIXED';scene.render.threads=5
cols={n:bpy.data.collections[n] for n in ('GRANDSTAND','CHALET','TREES','LAMPS','TRACK','SET_DRESSING')}
cam=scene.camera

def isolate(name):
    for key,col in cols.items():col.hide_render=key!=name
    for ob in cols['LAMPS'].objects:
        ob.hide_render=(name=='LAMPS' and ob.name.startswith('Low snow curb'))

exports=(
    ('GRANDSTAND',0,13.6,16,1200,760,64),
    ('CHALET',9.1,16.4,8.5,980,760,64),
    ('TREES',-9.6,16.2,12,1150,760,64),
    ('LAMPS',0,10.9,10.5,1000,760,64),
    ('TRACK',0,0,65,4096,900,48),
)
for name,cx,cy,ortho,w,h,samples in exports:
    if os.environ.get('WINTER_EXPORT_ONLY') and name!=os.environ['WINTER_EXPORT_ONLY']:
        continue
    isolate(name)
    cam.location=(cx,cy-43.4,22)
    cam.rotation_euler=(Vector((cx,cy,1.5))-cam.location).to_track_quat('-Z','Y').to_euler()
    cam.data.ortho_scale=ortho
    scene.render.resolution_x=w;scene.render.resolution_y=h;scene.render.resolution_percentage=100
    scene.cycles.samples=samples
    scene.render.filepath=str(OUT/f'{name.lower()}_alpha.png')
    bpy.ops.render.render(write_still=True)
    print('EXPORTED',name,scene.render.filepath,flush=True)
print('ASSET_EXPORT_DONE',flush=True)
