// ═══ Лобби «Полуночный праздник»: анимация сцены ═══
// Куски таймлайна по событиям. Лаборатория складывает их в один перематываемый таймлайн, игра запускает по одному на событие
// (вход на экран, прибытие команды, отключение, подсветка QR, закрытие состава, уход к правилам). Анимация только показывает —
// ни счёта, ни сроков, ни состава команд она не определяет.
import { GATE, litFor } from './geom'

type TL = gsap.core.Timeline
export type Q = (s: string) => Element[]
const T = (id: string) => `.b-team[data-id="${CSS.escape(id)}"]`

/** вход в лобби: ночь проявляется, ворота зажигаются, логотип на гирлянде, стенд с QR; осевшие команды проявляются */
export function introFx(tl: TL, q: Q, o: { settled: boolean; wait: boolean }, at = 0) {
  tl.fromTo(q('.b-bg'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, at)
    .fromTo(q('.b-moon'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 0.2)
    .fromTo(q('.b-ringg'), { opacity: 0 }, { opacity: 1, duration: 1.0 }, at + 0.5)
    .fromTo(q('.b-rb'), { opacity: 0, scale: 0 }, { opacity: (i: number) => (q('.b-rb')[i]?.classList.contains('on') ? 1 : 0.28), scale: 1, duration: 0.4, stagger: { each: 0.045, from: 'start' }, ease: 'back.out(3)', transformOrigin: '0px 0px' }, at + 0.8)
    .fromTo(q('.b-swag, .b-cordL'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, at + 1.0)
    .fromTo(q('.b-letter'), { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.6)' }, at + 1.2)
    .fromTo(q('.b-letter-glow'), { opacity: 0.2 }, { opacity: 1, duration: 1.0, stagger: 0.05 }, at + 1.9)
    .fromTo(q('.b-stand'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, at + 0.9)
  if (o.wait) tl.fromTo(q('.b-wait'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, at + 2.2)
  if (o.settled) tl.fromTo(q('.b-team:not(.fresh)'), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.06 }, at + 0.9)
}

/** прибытие команды: ворота вспыхивают, искра летит из лунного круга к верёвке, шнур разматывается, фонарь раскрывается, имя прожигается */
export function arriveFx(tl: TL, q: Q, id: string, n: number, at: number) {
  const tm = T(id), lit = litFor(n)
  tl.set(q(tm), { visibility: 'visible' }, at)
    .fromTo(q('.b-moon'), { filter: 'brightness(1)' }, { filter: 'brightness(1.16)', duration: 0.3, yoyo: true, repeat: 1 }, at)
    .fromTo(q('.b-rb'), { scale: 1 }, { scale: 1.9, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.012, transformOrigin: '0px 0px' }, at)
    .fromTo(q(`.b-spark[data-id="${CSS.escape(id)}"]`), { strokeDashoffset: 0.08, opacity: 1 }, { strokeDashoffset: -1.0, duration: 0.85, ease: 'power1.inOut' }, at + 0.15)
    .to(q(`.b-spark[data-id="${CSS.escape(id)}"]`), { opacity: 0, duration: 0.2 }, at + 0.85)
    .fromTo(q(`${tm} .cordg`), { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 0.9)
    .fromTo(q(`${tm} .lbody`), { scale: 0.18, opacity: 0, y: -10 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', transformOrigin: '0px 0px' }, at + 1.2)
    .fromTo(q(`${tm} .ribs`), { scaleX: 0.2 }, { scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: '0px 0px' }, at + 1.3)
    .fromTo(q(`${tm} .glow`), { opacity: 0 }, { opacity: 1, duration: 0.9 }, at + 1.4)
    .fromTo(q(`${tm} .b-lan`), { rotation: -5 }, { rotation: 0, duration: 1.6, ease: 'elastic.out(1,0.35)', transformOrigin: '50% 0%' }, at + 1.7)
    .fromTo(q(`${tm} .nm`), { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power1.inOut' }, at + 1.8)
    .to(q('.b-rb'), { opacity: (j: number) => (j < lit ? 1 : 0.28), duration: 0.5 }, at + 0.3)
}

/** команда отключилась: свет в фонаре гаснет, фонарь чуть опускается, имя тускнеет (раскладка не меняется) */
export function dropFx(tl: TL, q: Q, id: string, at: number) {
  const tm = T(id)
  tl.to(q(`${tm} .glow`), { opacity: 0.08, duration: 1.0 }, at).to(q(`${tm} .lbody`), { filter: 'saturate(.2) brightness(.45)', y: 10, duration: 1.2 }, at)
    .to(q(`${tm} .nm`), { opacity: 0.38, duration: 1.0 }, at)
}
export function reviveFx(tl: TL, q: Q, id: string, at: number) {
  const tm = T(id)
  tl.to(q(`${tm} .glow`), { opacity: 1, duration: 0.8 }, at).to(q(`${tm} .lbody`), { filter: 'none', y: 0, duration: 0.9 }, at)
    .to(q(`${tm} .nm`), { opacity: 1, duration: 0.8 }, at)
}
/** QR выделен: свечение вокруг стенда (сам QR не трогаем) */
export function qrLitFx(tl: TL, q: Q, at: number) {
  tl.fromTo(q('.b-stand'), { '--lit': 0.3 }, { '--lit': 1, duration: 1.1 }, at)
    .fromTo(q('.b-aura'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, transformOrigin: '50% 50%' }, at)
}
export function qrDimFx(tl: TL, q: Q, at: number) {
  tl.to(q('.b-stand'), { '--lit': 0.3, duration: 0.8 }, at).to(q('.b-aura'), { opacity: 0, duration: 0.8 }, at)
}
/** состав закрыт: всё в сборе — кольцо и фонари горят ровным золотом */
export function lockedFx(tl: TL, q: Q, at: number) {
  tl.to(q('.b-rb'), { opacity: 1, duration: 0.8, stagger: 0.03 }, at).fromTo(q('.b-gold'), { opacity: 0 }, { opacity: 1, duration: 1.4 }, at)
    .to(q('.b-lan .glow'), { opacity: 1, scale: 1.12, duration: 1.0, transformOrigin: '50% 50%' }, at + 0.2)
}
/** число огней на кольце по числу команд без прибытия (команд стало меньше/больше без события) */
export function litTo(tl: TL, q: Q, n: number, at: number) {
  tl.to(q('.b-rb'), { opacity: (j: number) => (j < litFor(n) ? 1 : 0.28), duration: 0.6 }, at)
}

/** уход к правилам: фонари уходят в ворота, огни и логотип гаснут, луна поднимается и растворяется, ворота оседают;
 *  последний кадр — чистый лес (под ним заголовок следующего экрана) */
export function leaveFx(tl: TL, q: Q, targets: { id: string; x: number; y: number }[], at = 0) {
  tl.to(q('.b-team .nm'), { opacity: 0, duration: 0.7 }, at + 1.0)
    .to(q('.b-team'), { x: (i: number) => (GATE.x - (targets[i]?.x ?? GATE.x)) * 0.9, y: (i: number) => (GATE.y - (targets[i]?.y ?? GATE.y)) * 0.9, scale: 0.15, opacity: 0, duration: 1.5, stagger: 0.06, ease: 'power2.in', transformOrigin: '0px 0px' }, at + 1.1)
    .to(q('.b-stand, .b-wait'), { opacity: 0, y: 40, duration: 0.9 }, at + 1.6)
    .to(q('.b-bulb, .b-ropes, .b-stones'), { opacity: 0, duration: 1.0 }, at + 2.2)
    .to(q('.b-logo'), { opacity: 0, y: -80, duration: 1.0, ease: 'power2.in' }, at + 2.4)
    .to(q('.b-rb'), { opacity: 0, duration: 0.8, stagger: 0.02 }, at + 2.5)
    .to(q('.b-moon'), { scale: 1.5, y: -130, opacity: 0, duration: 1.8, ease: 'power2.in', transformOrigin: '0px 0px' }, at + 3.0)
    .to(q('.b-ringg'), { y: 100, opacity: 0, duration: 1.6, ease: 'power2.in' }, at + 3.4)
    .to(q('.b-grade'), { opacity: 0, duration: 1.4 }, at + 3.6)
}
export const LEAVE_DUR = 5.8
