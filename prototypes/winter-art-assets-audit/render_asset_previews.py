"""Inspect downloaded GLBs as isolated studio thumbnails, not a race scene."""
import bpy
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parent
NAMES=('fir_sapling','pine_sapling_small','large_iron_gate','modular_urban_apartments_facade','lantern_01','wooden_lantern_01')
for name in NAMES:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene=bpy.context.scene
    bpy.ops.import_scene.gltf(filepath=str(ROOT/'downloads'/f'PolyHaven_{name}.glb'))
    objs=[o for o in bpy.data.objects if o.type=='MESH']
    pts=[o.matrix_world@Vector(c) for o in objs for c in o.bound_box]
    low=Vector(tuple(min(p[i] for p in pts) for i in range(3)))
    high=Vector(tuple(max(p[i] for p in pts) for i in range(3)))
    center=(low+high)/2;extent=high-low
    camera_data=bpy.data.cameras.new('Review camera');camera=bpy.data.objects.new('Review camera',camera_data);scene.collection.objects.link(camera)
    camera.location=center+Vector((extent.x*.23,-max(extent.x,extent.y,extent.z)*2,extent.z*.28))
    camera.rotation_euler=(center-camera.location).to_track_quat('-Z','Y').to_euler()
    camera_data.type='ORTHO';camera_data.ortho_scale=max(extent.x,extent.z,extent.y*.75)*1.28;scene.camera=camera
    for loc,power,size,color in ((center+Vector((-5,-6,8)),1300,8,(.78,.86,1)),(center+Vector((4,3,5)),800,8,(1,.74,.49))):
        data=bpy.data.lights.new('Review softbox','AREA');data.energy=power;data.size=size;data.color=color
        light=bpy.data.objects.new('Review softbox',data);scene.collection.objects.link(light);light.location=loc
        light.rotation_euler=(center-loc).to_track_quat('-Z','Y').to_euler()
    scene.world=bpy.data.worlds.new('Neutral review world')
    scene.world.color=(.12,.17,.23)
    scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=False
    scene.cycles.max_bounces=3;scene.render.threads_mode='FIXED';scene.render.threads=3
    scene.render.resolution_x=640;scene.render.resolution_y=640;scene.render.resolution_percentage=100
    scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA'
    scene.render.film_transparent=False
    scene.render.filepath=str(ROOT/'review'/f'PolyHaven_{name}_studio.png')
    bpy.ops.render.render(write_still=True)
    print('PREVIEW_OK',name,flush=True)
