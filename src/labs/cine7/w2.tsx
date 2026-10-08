// ═══ 02 · Библиотека — «написанное становится вещественным» ═══
// A: сверху, вплотную — раскрытая рукопись под лампой, перо лежит на странице.
// B: чернила оживают: строки рукописи стекают в корешок книги, а отдельные
//    буквы остаются на бумаге, поднимаются и отрываются от неё.
// C: камера опускается с вида сверху до уровня стола — книга ложится вниз,
//    оторванные буквы висят в воздухе над ней, их тени лежат на бумаге.
// D: буквы встают в вопрос и «высыхают» из рукописи в печать; перо само
//    вписывает четыре варианта на страницы. E: всё замирает, чернильница считает.
import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { QUESTION, QNO, ROUND_NAME, seeded, phaseOf, Letters, css, type SceneProps } from './kit'

const PROSE = [
  'Был тихий вечер, и в библиотеке горела одна лампа.',
  'Книги стояли так плотно, что казалось, будто',
  'они слушают друг друга. Старый переплётчик',
  'говорил, что ночью они переписывают себя,',
  'если на столе забыли открытую страницу.',
  'Никто не верил ему, пока однажды утром',
  'на полях не нашлась строка чужой рукой.',
  'С тех пор страницы не оставляли пустыми.',
]
const PROSE_R = [
  'Чернила здесь помнят каждое слово, которое',
  'ими писали, и не любят молчать. Если долго',
  'смотреть на строку, она начинает дышать,',
  'буквы чуть приподнимаются над бумагой и',
  'ищут, кому бы ответить. Читатель, будь',
  'внимателен: книга тоже задаёт вопросы,',
  'и отвечать на них надо до того, как',
  'в чернильнице кончатся чернила.',
]

export function Scene({ onReady }: SceneProps) {
  const root = useRef<HTMLDivElement>(null)
  const tnum = useRef<HTMLSpanElement>(null)
  const ink = useRef<SVGRectElement>(null)
  const chars = useMemo(() => QUESTION.text.split('').filter(c => c !== ' '), [])
  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    // где буквы вопроса стоят в итоговой раскладке (меряем невидимый вопрос)
    const qp = root.current!.querySelector('.l-q') as HTMLElement
    const finals = Array.from(qp.querySelectorAll<HTMLElement>('.split')).map(el => ({ x: qp.offsetLeft + el.offsetLeft, y: qp.offsetTop + el.offsetTop }))
    const fly = q('.l-fly')
    const rnd = seeded(77)
    // старт — среди строк рукописи (в координатах страницы при виде сверху)
    fly.forEach((el, i) => {
      const left = i % 2 === 0, line = Math.floor(rnd() * 8)
      const sx = (left ? 250 : 1010) + rnd() * 600, sy = 300 + line * 70
      gsap.set(el, { x: sx, y: sy, rotation: 0 })
      ;(el as HTMLElement).dataset.fx = String(finals[i].x); (el as HTMLElement).dataset.fy = String(finals[i].y)
    })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    tl.addLabel('A', 0)
      .fromTo(q('.l-cam'), { scale: 1.12, y: 30 }, { scale: 1.0, y: 0, duration: 3.6, ease: 'sine.inOut' }, 0)
      .fromTo(q('.l-pen'), { x: 0, rotation: 0 }, { x: -18, rotation: -3, duration: 3.6, ease: 'sine.inOut' }, 0)
      .addLabel('B', 3.4)
      // предвосхищение: буквы, которым суждено стать вопросом, вздрагивают
      .to(fly, { y: '-=6', duration: 0.18, stagger: { each: 0.008, from: 'random' }, ease: 'power2.out' }, 'B')
      .to(fly, { y: '+=6', duration: 0.3, stagger: { each: 0.008, from: 'random' }, ease: 'power2.in' }, 'B+=0.2')
      // рукопись стекает в корешок: строки сжимаются к шву и теряют цвет
      .to(q('.l-line.l'), { x: (i: number) => 360 - i * 6, scaleX: 0.05, opacity: 0, duration: 1.4, stagger: 0.07, ease: 'power3.in' }, 'B+=0.7')
      .to(q('.l-line.r'), { x: (i: number) => -360 + i * 6, scaleX: 0.05, opacity: 0, duration: 1.4, stagger: 0.07, ease: 'power3.in' }, 'B+=0.7')
      .fromTo(q('.l-gutter'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'B+=1.6')
      .to(q('.l-pen'), { x: 260, y: 260, rotation: 10, duration: 1.6, ease: 'power2.inOut' }, 'B+=0.8')
      // буквы отрываются от бумаги: тень отделяется от буквы
      .to(fly, { '--lift': 1, duration: 1.0, stagger: { each: 0.01, from: 'random' }, ease: 'power2.out' }, 'B+=2.0')
      .addLabel('C', 6.6)
      // камера: с вида сверху — к уровню стола; книга уходит вниз и ложится
      .to(q('.l-book'), { rotationX: 52, y: 330, scale: 0.86, duration: 2.6, ease: 'power3.inOut' }, 'C')
      .to(q('.l-desk'), { backgroundPositionY: '-180px', duration: 2.6, ease: 'power3.inOut' }, 'C')
      .to(q('.l-lamp'), { y: -220, opacity: 0.8, duration: 2.6, ease: 'power3.inOut' }, 'C')
      // буквы летят к своим местам по дугам (через подъём), каждая со своей массой
      .to(fly, { x: (_: number, el: HTMLElement) => Number(el.dataset.fx), y: (_: number, el: HTMLElement) => Number(el.dataset.fy), duration: 2.4,
        ease: 'power3.inOut', stagger: { each: 0.012, from: 'random' } }, 'C+=0.3')
      .to(fly, { rotation: (i: number) => (i % 2 ? 8 : -8), duration: 1.2, ease: 'sine.out', stagger: { each: 0.012, from: 'random' } }, 'C+=0.3')
      .to(fly, { rotation: 0, duration: 1.2, ease: 'sine.inOut', stagger: { each: 0.012, from: 'random' } }, 'C+=1.5')
      .addLabel('D', 9.8)
      // рукописные буквы «высыхают» в печать — по слову, слева направо
      .to(q('.l-fly .hw'), { opacity: 0, duration: 0.5, stagger: 0.02, ease: 'power1.in' }, 'D')
      .fromTo(q('.l-fly .pr'), { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.02, ease: 'power1.out' }, 'D')
      .to(fly, { '--lift': 0.55, duration: 1.0 }, 'D+=0.4')
      .fromTo(q('.l-opt i'), { clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% -2% -20% 0)', duration: 0.9, stagger: 0.45, ease: 'power1.inOut' }, 'D+=0.8')
      .fromTo(q('.l-opt b'), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.5, stagger: 0.45, ease: 'back.out(2)' }, 'D+=0.75')
      .fromTo(q('.l-well'), { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 'D+=0.2')
      .fromTo(q('.l-meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 'D+=1.8')
      .addLabel('E', 12.8)
      .to(q('.l-cam'), { y: -6, duration: 4, ease: 'sine.inOut' }, 'E')
      .to({}, { duration: 4 }, 'E')
    onReady({
      tl,
      setTimer: n => {
        if (tnum.current) tnum.current.textContent = String(n)
        ink.current?.setAttribute('transform', `translate(0 ${(1 - n / QUESTION.total) * 70}) scale(1 ${Math.max(0.001, n / QUESTION.total)})`)
        root.current?.setAttribute('data-ph', phaseOf(n))
      },
    })
    return () => { tl.kill() }
  }, [onReady])

  return (
    <div className="l-root" ref={root} data-ph="normal">
      <div className="l-desk" />
      <div className="l-cam lay">
        <div className="l-lamp" />
        <div className="l-stage">
          <div className="l-book">
            <div className="l-page left">
              {PROSE.map((t, i) => <div key={i} className="l-line l" style={css({ top: 230 + i * 70 })}>{t}</div>)}
              <div className="l-opt" style={css({ top: 210 })}><b>А</b><i>{QUESTION.options[0].text}</i></div>
              <div className="l-opt" style={css({ top: 400 })}><b>Б</b><i>{QUESTION.options[1].text}</i></div>
            </div>
            <div className="l-page right">
              {PROSE_R.map((t, i) => <div key={i} className="l-line r" style={css({ top: 230 + i * 70 })}>{t}</div>)}
              <div className="l-opt" style={css({ top: 210 })}><b>В</b><i>{QUESTION.options[2].text}</i></div>
              <div className="l-opt" style={css({ top: 400 })}><b>Г</b><i>{QUESTION.options[3].text}</i></div>
            </div>
            <div className="l-gutter" />
          </div>
        </div>
        <svg className="l-pen" viewBox="0 0 1920 1080" aria-hidden><g transform="translate(1440 760) rotate(-32)"><path d="M 0 0 L 300 -12 L 310 0 L 300 12 Z" fill="#1d1712" /><path d="M 0 0 L 40 -7 L 40 7 Z" fill="#c9a24a" /><circle cx="310" cy="0" r="10" fill="#7a2a1e" /></g></svg>
        <p className="l-q" aria-hidden><Letters text={QUESTION.text} /></p>
        {chars.map((ch, i) => <span key={i} className="l-fly"><span className="hw">{ch}</span><span className="pr">{ch}</span></span>)}
        <div className="l-well">
          <svg viewBox="0 0 140 150" aria-hidden><defs><clipPath id="l-wellc"><path d="M 26 50 C 10 70 10 130 30 140 L 110 140 C 130 130 130 70 114 50 Z" /></clipPath></defs>
            <g clipPath="url(#l-wellc)"><rect ref={ink} className="l-inkv" x="0" y="70" width="140" height="70" style={{ transformOrigin: '0px 140px' }} /></g>
            <path d="M 26 50 C 10 70 10 130 30 140 L 110 140 C 130 130 130 70 114 50 Z" className="l-glass" /><rect x="46" y="28" width="48" height="24" rx="5" className="l-neck" /></svg>
          <span className="l-tn" ref={tnum}>30</span>
        </div>
        <div className="l-meta"><span>{ROUND_NAME}</span><span>{QNO}</span></div>
      </div>
    </div>
  )
}
