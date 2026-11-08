"""Assemble a small, offline review booklet from the static concept assets."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image

ROOT = Path(__file__).parent
OUT = ROOT / "WINTER_ARENA_CONCEPTS_A_B_C.pdf"
pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))

PAGES = [
    ("A · ЗИМНИЙ ФЕСТИВАЛЬ", "A_FESTIVAL", "Тёплая ярмарка, дерево, гирлянды и плотные зрительские зоны.", "Акцент: праздничность и уют. Риск: декор может отвлекать от гонки."),
    ("B · ЗИМНИЙ СПОРТИВНЫЙ КУБОК", "B_SPORT", "Чёткая трасса, северные материалы и ясно читаемое соревнование.", "Рекомендован как основа. Риск: холодный средний участок."),
    ("C · СКАЗОЧНЫЕ СУМЕРКИ", "C_TWILIGHT", "Тёплый свет посёлка, индиго и северное сияние над озером.", "Акцент: атмосфера. Риск: контраст тёмных собак на проекторе."),
]

c = canvas.Canvas(str(OUT), pagesize=(1600, 1200), pageCompression=1)
c.setTitle("Снежный кубок — три концепта одной новогодней арены")
for title, key, description, note in PAGES:
    c.setFillColorRGB(.065, .145, .19)
    c.rect(0, 0, 1600, 1200, stroke=0, fill=1)
    c.setFont("DejaVu", 31)
    c.setFillColorRGB(.96, .94, .86)
    c.drawString(40, 1154, title)
    art = ROOT / "art" / f"{key}_5_KEYFRAMES.png"
    source_w, source_h = Image.open(art).size
    board_w, board_h = 1520, 833
    scale = min(board_w / source_w, board_h / source_h)
    display_w, display_h = source_w * scale, source_h * scale
    c.drawImage(ImageReader(str(art)), 40 + (board_w - display_w) / 2,
                305 + (board_h - display_h) / 2,
                width=display_w, height=display_h, mask="auto")
    route = ROOT / "maps" / f"{key}_ROUTE_MAP.png"
    c.drawImage(ImageReader(str(route)), 40, 28, width=476, height=268, preserveAspectRatio=False, mask="auto")
    c.setFont("DejaVu", 19)
    c.setFillColorRGB(.98, .83, .53)
    c.drawString(545, 257, "ПЯТЬ КАДРОВ ОДНОГО МАРШРУТА")
    c.setFont("DejaVu", 16)
    c.setFillColorRGB(.9, .93, .9)
    for y, line in zip((218, 187, 156), ["1 Старт  ·  2 Лес  ·  3 Зрительская деревня", "4 Открытое озеро  ·  5 Финиш", description]):
        c.drawString(545, y, line)
    c.setFillColorRGB(.99, .75, .63)
    c.drawString(545, 111, note)
    c.setFillColorRGB(.76, .82, .83)
    c.setFont("DejaVu", 13)
    c.drawString(545, 58, "Концепт-арт: трасса и камера требуют отдельной геометрической проверки с реальными спрайтами.")
    c.showPage()
c.save()
print(OUT)
