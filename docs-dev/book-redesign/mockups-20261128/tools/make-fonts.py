# Выбирает из 00-fonts.css только шрифты «Книги» (Cormorant Garamond, PT Serif, EB Garamond) и пишет fonts.css
# с относительными путями на public/fonts — макеты открываются прямо из репозитория, без сервера.
# usage: python3 -I make-fonts.py <корень репозитория>
import re, sys, pathlib
root = pathlib.Path(sys.argv[1])
src = (root / 'src/styles/parts/00-fonts.css').read_text(encoding='utf8')
blocks = re.findall(r'@font-face\s*\{.*?\}', src, flags=re.S)
keep = [b for b in blocks if re.search(r"font-family:\s*'(Cormorant Garamond|PT Serif|EB Garamond)'", b)]
out = '\n'.join(b.replace('/quiz-party/fonts/', '../../../public/fonts/') for b in keep)
(root / 'docs-dev/book-redesign/mockups-20261128/fonts.css').write_text('/* сгенерировано tools/make-fonts.py */\n' + out + '\n', encoding='utf8')
print(len(keep), 'font-face')
