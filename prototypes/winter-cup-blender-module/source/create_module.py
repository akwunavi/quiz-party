"""Author and render one modular winter-cup spectator section in Blender 4.3.

All meshes and procedural materials are created locally; no purchased or third
party graphics are used. Collections can be rendered independently with alpha.
"""
import bpy
import math
import random
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
ASSETS.mkdir(exist_ok=True)
R = random.Random(12841)

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for material in list(bpy.data.materials): bpy.data.materials.remove(material)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 40
scene.cycles.use_denoising = False
scene.cycles.max_bounces = 3
scene.render.resolution_x = 1400
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.film_transparent = True
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.render.image_settings.color_depth = '8'
scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.035,.055,.12,1)
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.34
scene.render.threads_mode = 'FIXED'
scene.render.threads = 5

def collection(name):
    c = bpy.data.collections.new(name)
    scene.collection.children.link(c)
    return c

COL = {n: collection(n) for n in ('GRANDSTAND','CHALET','TREES','LAMPS','TRACK','SET_DRESSING')}

def move_to(obj, group):
    for c in list(obj.users_collection): c.objects.unlink(obj)
    group.objects.link(obj)
    return obj

def principled(name, color, rough=.78, metallic=0, emission=None, bump=.0, noise_scale=9):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    nodes=m.node_tree.nodes;bs=nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(*color,1)
    bs.inputs['Roughness'].default_value=rough;bs.inputs['Metallic'].default_value=metallic
    if emission:
        bs.inputs['Emission Color'].default_value=(*emission[0],1)
        bs.inputs['Emission Strength'].default_value=emission[1]
    if bump:
        tex=nodes.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=noise_scale
        tex.inputs['Detail'].default_value=4;tex.inputs['Roughness'].default_value=.72
        b=nodes.new('ShaderNodeBump');b.inputs['Strength'].default_value=bump;b.inputs['Distance'].default_value=.045
        m.node_tree.links.new(tex.outputs['Fac'],b.inputs['Height']);m.node_tree.links.new(b.outputs['Normal'],bs.inputs['Normal'])
    return m

SNOW=principled('Powder snow · blue shadow',(.78,.87,.91),.93,bump=.18,noise_scale=22)
SNOW_LIT=principled('Fresh snow · warm light',(.95,.95,.91),.88,bump=.12,noise_scale=25)
ICE=principled('Blue ice · crystalline',(.28,.56,.65),.23,.08,bump=.11,noise_scale=34)
ICE_LIGHT=principled('Ice scratches',(.66,.84,.86),.3,.06,bump=.05,noise_scale=52)
TIMBER=principled('Weathered timber',(.27,.14,.12),.84,bump=.26,noise_scale=16)
TIMBER_EDGE=principled('Warm fresh timber',(.55,.30,.19),.78,bump=.18,noise_scale=18)
DARK=principled('Iron blue',(.09,.17,.23),.53,.35)
COPPER=principled('Aged copper',(.45,.23,.18),.37,.46)
GOLD=principled('Brushed brass',(.67,.44,.19),.4,.65)
PINE=principled('Midnight pine',(.055,.23,.22),.91,bump=.11,noise_scale=24)
PINE_LIGHT=principled('Frost pine',(.10,.34,.31),.92,bump=.12,noise_scale=24)
GLASS=principled('Amber window glass',(.52,.24,.075),.23,emission=((1,.50,.16),3.2))
LAMP=principled('Lantern glow',(.9,.62,.25),.2,emission=((1,.62,.24),4.5))
RED=principled('Festival cranberry',(.41,.065,.095),.86,bump=.08,noise_scale=22)
IVORY=principled('Wool ivory',(.8,.77,.66),.93,bump=.17,noise_scale=28)
SCARF=principled('Scarf gold',(.70,.37,.15),.91,bump=.17,noise_scale=29)
COATS=[principled(f'Coat {i}',c,.88,bump=.13,noise_scale=26) for i,c in enumerate(((.47,.07,.11),(.08,.29,.38),(.49,.29,.12),(.23,.25,.48),(.08,.34,.27),(.48,.23,.28),(.45,.40,.24)))]
SKINS=[principled(f'Skin {i}',c,.83) for i,c in enumerate(((.83,.55,.37),(.56,.29,.22),(.94,.71,.51)))]

def cube(name,loc,scale,material,col,bevel=.025):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc)
    o=bpy.context.object;o.name=name;o.dimensions=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(material);move_to(o,col)
    if bevel:
        mod=o.modifiers.new('Soft machined edge','BEVEL');mod.width=bevel;mod.segments=2
        mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');mod.keep_sharp=True
    return o

def ico(name,loc,r,material,col,subdiv=2,scale=None):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=subdiv,radius=r,location=loc)
    o=bpy.context.object;o.name=name;o.data.materials.append(material);move_to(o,col)
    if scale:o.scale=scale
    return o

def cyl(name,loc,r,depth,material,col,vertices=12,r2=None):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices,radius1=r,radius2=r if r2 is None else r2,depth=depth,location=loc)
    o=bpy.context.object;o.name=name;o.data.materials.append(material);move_to(o,col)
    return o

def beam_between(name,a,b,diameter,material,col):
    middle=(Vector(a)+Vector(b))/2;d=Vector(b)-Vector(a)
    o=cube(name,middle,(diameter,diameter,d.length),material,col,diameter*.14)
    o.rotation_euler=d.to_track_quat('Z','Y').to_euler()
    return o

def tube(name,points,r,material,col,res=18):
    cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.resolution_u=res;cu.bevel_depth=r;cu.bevel_resolution=3
    sp=cu.splines.new('BEZIER');sp.bezier_points.add(len(points)-1)
    for bp,p in zip(sp.bezier_points,points):bp.co=p;bp.handle_left_type='AUTO';bp.handle_right_type='AUTO'
    ob=bpy.data.objects.new(name,cu);col.objects.link(ob);cu.materials.append(material);return ob

def text(name,value,loc,size,mat,col):
    cu=bpy.data.curves.new(name,'FONT');cu.body=value;cu.size=size;cu.extrude=.004;cu.bevel_depth=.002
    cu.align_x='CENTER';cu.align_y='CENTER'
    font_path='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
    if Path(font_path).exists():cu.font=bpy.data.fonts.load(font_path)
    ob=bpy.data.objects.new(name,cu);col.objects.link(ob);ob.location=loc;ob.rotation_euler=(math.pi/2,0,0);cu.materials.append(mat);return ob

def grandstand():
    c=COL['GRANDSTAND'];width=13.2;back_y=1.9
    # Three distinct stepped decks, risers and side trusses.
    for row in range(3):
        y=back_y+row*.88;z=.55+row*.62
        cube(f'Deck {row}',(0,y,z),(width,1.15,.19),TIMBER,c,.055)
        cube(f'Riser {row}',(0,y+.53,z-.28),(width,.14,.65),TIMBER_EDGE,c,.018)
        for x in (-6.15,6.15):
            beam_between(f'Side truss {row}',(x,y-.54,z-.44),(x,y+.52,z+.22),.10,DARK,c)
    cube('Stand fascia',(0,1.23,.38),(13.5,.22,.76),TIMBER,c,.08)
    for x in (-6.5,6.5):
        cube('Canopy column',(x,1.62,2.75),(.24,.25,5.5),TIMBER_EDGE,c,.055)
        beam_between('Canopy knee brace',(x,1.62,2.2),(x-math.copysign(.7,x),1.62,3.02),.11,DARK,c)
    for x in (-6.7,6.7):
        beam_between('Roof diagonal', (x,1.25,3.55),(x-math.copysign(.82,x),3.3,4.48),.13,TIMBER_EDGE,c)
    roof=cube('Broad shingled roof',(0,1.65,4.46),(14.4,4.3,.32),TIMBER,c,.07)
    roof.rotation_euler[0]=math.radians(-11)
    roof_snow=cube('Deep roof snow',(0,1.61,4.67),(14.7,4.48,.24),SNOW_LIT,c,.11)
    roof_snow.rotation_euler[0]=math.radians(-11)
    cube('Front copper gutter',(0,-.53,4.04),(14.6,.10,.17),COPPER,c,.025)
    for x in [i*.6-6.8 for i in range(24)]:
        depth=.09+.22*R.random()
        cyl('Icicle',(x,-.56,3.96-depth/2),.045,depth,SNOW_LIT,c,vertices=7,r2=.003)
    # Snow-covered side signage and inset lettering give the building a clear identity.
    cube('Main race plaque',(0,-.57,3.52),(6.8,.18,.68),DARK,c,.08)
    text('Cup name','СНЕЖНЫЙ КУБОК',(0,-.686,3.53),.39,IVORY,c)
    for x in (-6.4,6.4):
        ico('Pine wreath',(x,-.52,3.50),.28,PINE,c,subdiv=2,scale=(1,.22,1))
        ico('Wreath berry',(x,-.78,3.28),.06,RED,c)
    # Snowbank at rear of the safety fence; it also bakes useful contact shadows.
    for i in range(26):
        x=-6.9+i*.55
        ico('Irregular snow curb',(x,-.67,.1),.25+R.random()*.13,SNOW,c,subdiv=1,scale=(1,.65,.42))
    # Guardrail and decorative pennants are behind the lanes.
    for x in [i*1.13-6.55 for i in range(13)]:
        cube('Guardrail post',(x,-.85,.79),(.11,.15,1.56),DARK,c,.015)
    for z in (.62,1.20):cube('Guardrail rail',(0,-.85,z),(13.4,.13,.10),TIMBER_EDGE,c,.02)
    for i in range(15):
        x=-6.6+i*.94
        beam_between('Bunting lead',(x,-.78,3.81),(x+.89,-.78,3.77),.012,DARK,c)
        flag=cube('Woven pennant',(x+.45,-.86,3.63),(.38,.07,.29),RED if i%3==0 else SCARF if i%3==1 else PINE_LIGHT,c,.015)
        flag.rotation_euler[1]=math.radians((i%3-1)*7)
    # Warm festoon bulbs along the full eave.
    pts=[(-6.5+i*.52,-.67,3.87-.16*math.sin(i*.34)) for i in range(26)]
    tube('Festoon cable',pts,.016,DARK,c)
    for i,p in enumerate(pts):
        ico('Amber globe',p,.062,LAMP if i%4 else SCARF,c,subdiv=1)
    # Varied spectators on all three decks, facing the race.
    for row in range(3):
        y=back_y+row*.88
        for j in range(18):
            x=-6.15+j*.72+(R.random()-.5)*.12
            person(x,y-.04,.74+row*.62,j+row*31,c)

def person(x,y,z,k,c):
    height=.76+R.random()*.20
    coat=COATS[k%len(COATS)];skin=SKINS[k%len(SKINS)]
    cyl('Wool coat',(x,y,z+height*.35),.16,height*.57,coat,c,vertices=9,r2=.11)
    ico('Head',(x,y-.01,z+height*.78),.128,skin,c,subdiv=2,scale=(1,.88,1.05))
    cyl('Knitted hat',(x,y,z+height*.93),.14,.18,COATS[(k+3)%len(COATS)],c,vertices=10,r2=.095)
    ico('Hat pompom',(x,y,z+height*1.06),.052,IVORY,c,subdiv=1)
    cyl('Scarf',(x,y-.04,z+height*.59),.145,.10,IVORY if k%4 else SCARF,c,vertices=10)
    for s in (-1,1):
        raised=(k+s)%4==0
        a=(x+s*.13,y,z+height*.53)
        b=(x+s*(.27 if raised else .22),y-.06,z+height*(.91 if raised else .29))
        beam_between('Cheering sleeve',a,b,.085,coat,c)
        ico('Mitten',b,.07,COATS[(k+1)%len(COATS)],c,subdiv=1)
    for s in (-1,1):
        ico('Eye',(x+s*.047,y-.135,z+height*.81),.017,DARK,c,subdiv=1)

def fir(x,y,h,c):
    cyl('Rough trunk',(x,y,h*.23),.13,h*.46,TIMBER,c,vertices=9,r2=.09)
    for layer in range(5):
        z=h*(.31+layer*.14);reach=h*(.33-layer*.047)
        for j in range(7):
            a=j*math.tau/7+layer*.29
            end=(x+math.cos(a)*reach,y+math.sin(a)*reach,z-.11)
            beam_between('Radiating branch',(x,y,z+.10),end,.065,PINE,c)
            cone=cyl('Dense needle fan',(x+math.cos(a)*reach*.58,y+math.sin(a)*reach*.58,z+.10),reach*.31,reach*.82,PINE if j%2 else PINE_LIGHT,c,vertices=7,r2=.015)
            cone.rotation_euler[1]=math.radians(9)
            ico('Branch snow',(end[0],end[1],end[2]+.08),reach*.23,SNOW_LIT,c,subdiv=1,scale=(1,.8,.28))
    ico('Frosted tip',(x,y,h*.99),.11,SNOW_LIT,c,subdiv=1)

def trees():
    c=COL['TREES']
    for x,y,h in ((-3.8,1.0,3.1),(-1.7,2.2,4.8),(.7,1.6,3.8),(3.2,2.4,5.2)):
        fir(x,y,h,c)
    for i in range(22):
        x=-5+i*.49;ico('Snow drift',(x,-.5,.1),.18+R.random()*.22,SNOW,c,subdiv=1,scale=(1,.8,.5))

def chalet():
    c=COL['CHALET']
    cube('Chalet wall',(0,0,1.50),(5.4,3.15,3.0),TIMBER,c,.08)
    for x in (-2.65,2.65):cube('Timber corner',(x,-1.62,1.58),(.20,.16,3.2),TIMBER_EDGE,c,.025)
    for z in (.30,1.31,2.65):cube('Facade beam',(0,-1.63,z),(5.5,.18,.15),TIMBER_EDGE,c,.025)
    for x in (-1.9,-.92,.92,1.9):
        cube('Window embrasure',(x,-1.68,1.83),(.72,.10,1.0),DARK,c,.03)
        cube('Window amber',(x,-1.74,1.83),(.53,.05,.77),GLASS,c,.02)
        cube('Window sash',(x,-1.79,1.83),(.065,.04,.76),TIMBER_EDGE,c,.015)
        cube('Window sill',(x,-1.83,1.38),(.71,.13,.12),SNOW_LIT,c,.02)
    cube('Door',(0,-1.73,.73),(.76,.11,1.42),DARK,c,.04)
    ico('Door wreath',(0,-1.82,1.16),.20,PINE_LIGHT,c,subdiv=2,scale=(1,.15,1))
    # Intersecting pitched roofs with sculpted snow lip and heavy timber gables.
    for s in (-1,1):
        roof=cube('Sloping slate',(s*1.50,0,3.66),(3.85,3.7,.23),DARK,c,.06)
        roof.rotation_euler[1]=s*math.radians(36)
        cap=cube('Thick snow roof',(s*1.50,0,3.83),(3.87,3.75,.16),SNOW_LIT,c,.075)
        cap.rotation_euler[1]=s*math.radians(36)
        for i in range(10):
            x=s*(.18+i*.31)
            ico('Roof snow pillow',(x,-1.32,4.78-abs(x)*.47),.20+R.random()*.09,SNOW,c,subdiv=1,scale=(1,.95,.42))
    cube('Chimney',(1.38,.72,4.39),(.62,.60,1.22),TIMBER,c,.055)
    cube('Chimney snow',(1.38,.72,5.05),(.82,.83,.17),SNOW_LIT,c,.07)
    for i in range(20):
        x=-2.45+i*.26
        ico('Window garland', (x,-1.86,2.82+.06*math.sin(i*.4)),.05,PINE_LIGHT,c,subdiv=1)
        if i%3==0:ico('Fairy light',(x,-1.93,2.78),.055,LAMP,c,subdiv=1)

def lantern(x,y,c):
    cyl('Turned lantern post',(x,y,1.34),.07,2.68,DARK,c,vertices=10)
    cyl('Lantern base',(x,y,.12),.20,.24,COPPER,c,vertices=12,r2=.14)
    cube('Lantern lower',(x,y,2.72),(.45,.45,.10),GOLD,c,.03)
    cube('Glowing glass',(x,y,2.98),(.32,.32,.38),LAMP,c,.035)
    cube('Lantern snow cap',(x,y,3.24),(.55,.55,.16),SNOW_LIT,c,.06)
    for s in (-1,1):cube('Glass rim',(x+s*.19,y-.19,2.98),(.04,.05,.42),DARK,c,.01)

def lamps():
    c=COL['LAMPS']
    for x in (-4.1,0,4.1):lantern(x,0,c)
    for i in range(16):
        x=-4.5+i*.60
        ico('Low snow curb',(x,.24,.10),.20+R.random()*.08,SNOW_LIT,c,subdiv=1,scale=(1,.7,.45))

def track():
    c=COL['TRACK']
    cube('Ground snow',(0,0,-.20),(66,46,.32),SNOW,c,.08)
    for i in range(5):
        y=-8+i*4
        cube(f'Ice lane {i+1}',(0,y,.03),(66,3.80,.10),ICE,c,.025)
        for x in range(-30,31,3):
            scar=cube('Thin ice wear',(x,y+(R.random()-.5)*1.9,.09),(1.0,.025,.008),ICE_LIGHT,c,.003)
            scar.rotation_euler[2]=(R.random()-.5)*.10
    for i in range(6):
        y=-10+i*4
        for j in range(75):
            x=-33.3+j*.9
            ico('Wind-built lane ridge',(x,y,.17),.28+R.random()*.10,SNOW_LIT,c,subdiv=1,scale=(1.1,.65,.47))

grandstand();chalet();trees();lamps();track()

# The source .blend is a real arranged spectator module, not overlapping prop
# collections. Track lanes run along X; architectural objects stand behind the
# far rail at positive Y. The collections stay independent for alpha export.
for name,dx,dy in (('GRANDSTAND',0,13.6),('CHALET',9.1,16.4),('TREES',-9.6,16.2),('LAMPS',0,10.9)):
    for ob in COL[name].objects:
        ob.location.x+=dx;ob.location.y+=dy

def area(name,loc,power,size,color):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color
    ob=bpy.data.objects.new(name,data);scene.collection.objects.link(ob);ob.location=loc
    ob.rotation_euler=(Vector((0,0,1.2))-ob.location).to_track_quat('-Z','Y').to_euler()

area('Blue moon key',(-8,-9,17),2500,13,(.55,.74,1.0))
area('Lantern amber fill',(7,-2,10),1850,8,(1,.61,.30))
area('Soft sky bounce',(0,14,13),1150,14,(.57,.70,1.0))

def camera(name,loc,target,scale):
    cam_data=bpy.data.cameras.new(name);ob=bpy.data.objects.new(name,cam_data);scene.collection.objects.link(ob)
    ob.location=loc;ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler()
    cam_data.type='ORTHO';cam_data.ortho_scale=scale;scene.camera=ob;return ob

cam=camera('Sprite camera',(0,-42,22),(0,5.0,1.5),28)
scene.render.filepath=str(ROOT/'review/BLENDER_MODULE_PREVIEW.png')
scene.render.film_transparent=False

def visible_only(names):
    for name,col in COL.items():col.hide_render=name not in names

visible_only(set(COL));scene.render.resolution_x=1400;scene.render.resolution_y=900
scene.cycles.samples=48
bpy.ops.render.render(write_still=True)

# Save source after the full preview setup; all collections remain selectable.
visible_only(set(COL))
scene.render.film_transparent=True
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/WINTER_CUP_SPECTATOR_MODULE.blend'))
print('WINTER_MODULE_SOURCE_OK',ROOT)
