"""Render three art-direction maps for one continuous five-zone race route."""
from pathlib import Path
from math import sin, pi
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
OUT = ROOT / "maps"
OUT.mkdir(exist_ok=True)
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

STYLES = {
    "A_FESTIVAL": {"bg": "#193d46", "panel": "#25535a", "ice": "#bfdfe3", "snow": "#f4eee0", "accent": "#d5675b", "light": "#f3c982", "label": "ФЕСТИВАЛЬ"},
    "B_SPORT": {"bg": "#142d42", "panel": "#21465c", "ice": "#b6dce8", "snow": "#eaf2f0", "accent": "#e3a852", "light": "#f7d486", "label": "ЗИМНИЙ СПОРТ"},
    "C_TWILIGHT": {"bg": "#292743", "panel": "#454064", "ice": "#c3bde6", "snow": "#f1e7f1", "accent": "#e39bc2", "light": "#ffd894", "label": "СУМЕРКИ"},
}
ZONES = [
    (70, 290, "СТАРТ", "ворота · трибуны"),
    (370, 550, "ЛЕС", "зрительские настилы"),
    (670, 870, "ДЕРЕВНЯ", "главная трибуна"),
    (990, 1170, "ОЗЕРО", "открытый обзор"),
    (1300, 1515, "ФИНИШ", "арка · зрители"),
]

def f(size):
    return ImageFont.truetype(FONT, size)

def center_text(draw, xy, value, font, color):
    box = draw.textbbox((0, 0), value, font=font)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1]), value, font=font, fill=color)

def route_y(x, lane):
    return 398 + lane * 43 + 22 * sin((x - 40) / 1500 * 2 * pi) + 8 * sin((x - 40) / 1500 * 4 * pi)

def building(draw, x, y, color, light):
    draw.rectangle((x - 36, y - 47, x + 36, y), fill=color)
    draw.polygon([(x - 45, y - 47), (x, y - 80), (x + 45, y - 47)], fill="#f4eee2")
    for dx in (-24, 0, 24):
        draw.rectangle((x + dx - 6, y - 34, x + dx + 6, y - 18), fill=light)

def tree(draw, x, y, color):
    draw.rectangle((x - 3, y - 7, x + 3, y + 7), fill="#796054")
    for k, width in enumerate((29, 23, 16)):
        yy = y - k * 13
        draw.polygon([(x - width, yy), (x, yy - 35), (x + width, yy)], fill=color)
    draw.line((x - 12, y - 26, x + 12, y - 26), fill="#dbe7e2", width=3)

for name, c in STYLES.items():
    im = Image.new("RGB", (1600, 900), c["bg"])
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((36, 30, 1564, 864), 34, fill=c["panel"], outline="#789195", width=2)
    d.text((70, 62), "СНЕЖНЫЙ КУБОК", font=f(43), fill=c["snow"])
    d.text((72, 121), f"ОДИН МАРШРУТ  /  {c['label']}", font=f(21), fill=c["light"])
    d.text((72, 169), "Схема сверху · зоны сменяются слева направо · пять непрерывных дорожек", font=f(19), fill=c["snow"])

    # Landmark distribution is fixed across A/B/C; only the art direction changes.
    for x in (145, 213, 275, 745, 815, 873, 1375, 1450, 1510):
        building(d, x, 330, "#795846" if name != "B_SPORT" else "#526778", c["light"])
    for x in (355, 405, 450, 505, 558, 610):
        tree(d, x, 328, "#246861" if name != "C_TWILIGHT" else "#3b6670")
    d.ellipse((960, 250, 1220, 340), fill="#8ebdce" if name != "C_TWILIGHT" else "#827eb2", outline=c["snow"], width=3)
    for x in (1025, 1090, 1160):
        d.ellipse((x - 8, 276, x + 8, 292), fill=c["light"])

    # Five independently legible lanes, slight sweep only: no sharp turn is implied.
    xx = list(range(50, 1551, 8))
    for lane in range(5):
        upper = [(x, route_y(x, lane)) for x in xx]
        lower = [(x, route_y(x, lane + 1) - 3) for x in reversed(xx)]
        d.polygon(upper + lower, fill=c["ice"] if lane % 2 == 0 else "#d1e8e9" if name != "C_TWILIGHT" else "#d2c9e8")
        d.line(upper, fill=c["snow"], width=5)
        d.line([(x, route_y(x, lane) + 5) for x in xx], fill="#83b3bb" if name != "C_TWILIGHT" else "#998fc2", width=2)
    d.line([(x, route_y(x, 5) - 3) for x in xx], fill=c["snow"], width=7)
    d.line([(50, route_y(50, 0)), (50, route_y(50, 5) - 3)], fill=c["accent"], width=12)
    d.line([(1545, route_y(1545, 0)), (1545, route_y(1545, 5) - 3)], fill=c["accent"], width=12)

    # Station labels and audience locations remain above the course.
    for number, (x1, x2, title, subtitle) in enumerate(ZONES, 1):
        x = (x1 + x2) // 2
        d.rounded_rectangle((x - 28, 674, x + 28, 730), 18, fill=c["accent"])
        center_text(d, (x, 681), str(number), f(30), "#162c3a")
        center_text(d, (x, 754), title, f(24), c["snow"])
        center_text(d, (x, 790), subtitle, f(15), c["light"])
        if number < 5:
            d.line((x + 44, 703, x2 + 42, 703), fill=c["snow"], width=3)
            d.polygon([(x2 + 42, 703), (x2 + 30, 697), (x2 + 30, 709)], fill=c["snow"])
    d.text((68, 839), "КАМЕРА: боковое сопровождение · дальний план: зрители · ближний план: свободная дорожка", font=f(15), fill=c["snow"])
    im.save(OUT / f"{name}_ROUTE_MAP.png", optimize=True)
    print(OUT / f"{name}_ROUTE_MAP.png")
