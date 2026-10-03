// ═══ НЕ ДАТЬ ЗВУКОВОМУ ВЫХОДУ ПРОЕКТОРА ЗАСНУТЬ (9.76) ═══
// Симптом с живой игры: начало озвучки вопроса съедается на 0,5–1 с, а
// однажды секундный отрывок «Угадай мелодию» не прозвучал вовсе. Код
// воспроизведения тут ни при чём (play() стартует с нуля, отрывок считается
// от события `playing`): так ведут себя HDMI-телевизоры, саундбары и
// Bluetooth-колонки — в тишине между вопросами они уходят в энергосбережение
// и просыпаются уже НА первом звуке, теряя его начало. Чем короче звук, тем
// заметнее: секунда трека может пропасть целиком.
//
// Лечение — держать звуковой поток открытым всё время, пока открыт проектор:
// зациклённый шум на уровне ~−80 дБ (в 10 000 раз тише полной громкости,
// ухом не слышен даже в тихом зале). Именно шум, а не нули: часть
// устройств распознаёт «цифровую тишину» и засыпает и на ней.
//
// Запускается только на проекторе (HostScreen), не на телефонах игроков.
// AudioContext без жеста пользователя стартует «приостановленным» — поэтому
// на первом же клике/клавише пробуем ещё раз (тот же жест, что снимает
// блокировку звука в AudioGate).

let ctx: AudioContext | null = null

/** Уровень шума: 1e-4 ≈ −80 dBFS — несколько младших разрядов 16-битного
 *  звука, не ноль, но и не слышно. */
export const KEEPALIVE_GAIN = 1e-4

export function startAudioKeepAlive(): void {
  try {
    if (ctx) {
      if (ctx.state === 'suspended') void ctx.resume().catch(() => {})
      return
    }
    const Ctx = window.AudioContext
      ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const c = new Ctx()
    const len = Math.max(1, Math.floor(c.sampleRate * 2))
    const buf = c.createBuffer(1, len, c.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    const src = c.createBufferSource()
    src.buffer = buf
    src.loop = true
    const gain = c.createGain()
    gain.gain.value = KEEPALIVE_GAIN
    src.connect(gain)
    gain.connect(c.destination)
    src.start()
    ctx = c
    if (c.state === 'suspended') void c.resume().catch(() => {})
  } catch { /* нет Web Audio — ничего не делаем, игра идёт как раньше */ }
}

/** Подключить на экране проектора: пробует сразу и на каждом жесте, пока
 *  поток не запущен. Возвращает отписку. */
export function installAudioKeepAlive(): () => void {
  const onGesture = () => {
    startAudioKeepAlive()
    if (ctx?.state === 'running') {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
    }
  }
  startAudioKeepAlive()
  window.addEventListener('pointerdown', onGesture)
  window.addEventListener('keydown', onGesture)
  return () => {
    window.removeEventListener('pointerdown', onGesture)
    window.removeEventListener('keydown', onGesture)
  }
}
