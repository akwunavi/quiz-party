# PNG пустого разворота (tools/capture-bg.cjs) -> JPEG q90 в assets/ (подложка макетов).
# usage: python3 -I make-bg.py <каталог с bg-*.png> <куда>
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for n in ('medium', 'dense'):
    Image.open(f'{src}/bg-{n}.png').convert('RGB').save(f'{dst}/bg-{n}.jpg', quality=90)
