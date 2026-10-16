#!/usr/bin/env python3
"""Copy Rocky's approved stand byte for byte into Kling first/tail references."""
from pathlib import Path
from shutil import copyfile
from hashlib import sha256
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SOURCE = ROOT / 'race-stand-generation-v1/DOG3_RACE_STAND_GENERATED_01.png'
GAME = ROOT / 'stop-v3-lab/assets/rocky-race-stand-alpha.png'
FIRST = HERE / 'DOG3_BUTTERFLY_FIRST_RACE_STAND.png'
LAST = HERE / 'DOG3_BUTTERFLY_LAST_RACE_STAND.png'
SHEET = HERE / 'DOG3_BUTTERFLY_REFERENCE_COMPARISON.png'

def digest(path):
    return sha256(path.read_bytes()).hexdigest()

for target in (FIRST, LAST):
    copyfile(SOURCE, target)
    assert digest(target) == digest(SOURCE)

approved = Image.open(SOURCE).convert('RGBA')
game = Image.open(GAME).convert('RGBA')
font = ImageFont.load_default()
panels = [
    ('FIRST · exact copy', approved),
    ('APPROVED RACE_STAND', approved),
    ('LAST · exact copy', approved),
    ('GAME ALPHA · same stand', game),
]
width, height = 1680, 300
sheet = Image.new('RGB', (width, height), '#23312d')
draw = ImageDraw.Draw(sheet)
for i, (label, image) in enumerate(panels):
    x = i * 420
    plate = Image.new('RGB', (400, 235), '#ded7c8')
    view = image.copy()
    view.thumbnail((400, 235), Image.Resampling.LANCZOS)
    plate.paste(view, ((400-view.width)//2, (235-view.height)//2), view)
    sheet.paste(plate, (x+10, 43))
    draw.text((x+12, 15), label, fill='#fff7df', font=font)
sheet.save(SHEET)
print('Reference SHA-256:', digest(SOURCE))
print('Reference size:', approved.size)
print('Game alpha size:', game.size)
