// ═══ Переход лобби → правила: общий финал ═══
// Каждый концепт сначала по-своему «отпускает» поляну (корни втягивают свет, фонари уходят в ворота, озеро поднимается
// туманом), а последним кадром становится ровно то, с чего начинается экран правил: чистый лес, заголовок «Правила игры»
// на своём месте (как в Rules.tsx) и лоза у левого края.
import { RULES } from '../../labs/forest/stage5Data'

export function HandoffTitle() {
  return <>
    <svg className="ru-svg ho-svg" viewBox="0 0 1920 1080" aria-hidden><path className="ru-vine ho-vine" d="M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010" /></svg>
    <h1 className="ru-title ho-title" aria-label={RULES.title}>{RULES.title.split('').map((c, i) => <span key={i} className="ch">{c}</span>)}</h1>
  </>
}
export function handoffTl(tl: gsap.core.Timeline, q: (s: string) => Element[], at: number) {
  tl.fromTo(q('.ho-title .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.8)' }, at)
    .fromTo(q('.ho-vine'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, at + 0.1)
}
