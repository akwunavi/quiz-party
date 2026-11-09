// Сопровождающая боковая камера арены: ЧИСТАЯ функция гонки Race V3 → положение камеры по времени (без canvas и сети).
// Камера едет за группой с пружинной задержкой (критически демпфированная пружина), поэтому собаки смещаются относительно кадра,
// а не приклеены к нему. Траектория считается один раз с фиксированным шагом и потом выбирается по времени — перемотка и запись видео детерминированы.
import type { RaceV3 } from '../v3types'
import { stateAt } from '../engine'

export const ARENA = {
  W: 1920, H: 1080,
  /** Длина дистанции в мировых пикселях (масштаб «прогресс 0..1 → пиксели»). Определяет скорость фона; физика и тайминги гонки не затрагиваются. */
  TRACK_LEN: 6400,
  START_X: 620,                     // мировая координата старта (прогресс 0)
  /** Линии лап пяти дорожек (низ спрайта) и масштаб спрайта по дорожке: дальше — меньше, ближе — крупнее (лёгкая перспектива). Масштаб подобран ЗАМЕРОМ: самый высокий силуэт (особые позы) ≈ 108 строк из 116, он обязан помещаться в шаг дорожки, иначе соседи касаются, когда бегут рядом. */
  LANE_Y: [618, 726, 835, 944, 1050],
  LANE_K: [0.86, 0.90, 0.93, 0.95, 0.96],
}
export interface CamPose { x: number; sway: number }

/** Мировая X-координата собаки по прогрессу. */
export const worldX = (progress: number) => ARENA.START_X + progress * ARENA.TRACK_LEN

/** Куда «хочет смотреть» камера в момент t: середина группы со смещением к лидеру; хвост, отставший больше чем на 1500 px, камеру не тянет. */
export function camTarget(race: RaceV3, t: number): number {
  const xs = race.dogs.map(d => worldX(stateAt(d, t).progress)), lead = Math.max(...xs)
  const tail = Math.max(Math.min(...xs), lead - 1500), mid = (lead + tail) / 2
  return lead * 0.35 + mid * 0.65 - ARENA.W * 0.56
}

/** Траектория камеры за окно [t0, t0+dur]: шаг 1/120 с, пружина ω=1.7 (≈1,3 с на отработку), в начале камера уже на цели (без «рывка со старта»). */
export function buildCameraTrack(race: RaceV3, t0: number, dur: number, hz = 120) {
  const n = Math.ceil(dur * hz) + 1, xs = new Float32Array(n), dt = 1 / hz, w = 1.7
  let x = camTarget(race, t0), v = 0
  for (let i = 0; i < n; i++) {
    xs[i] = x
    const tg = camTarget(race, t0 + i * dt), a = w * w * (tg - x) - 2 * w * v        // критически демпфированная пружина
    v += a * dt; x += v * dt
  }
  return {
    hz, dur,
    at(t: number): CamPose {                                                        // t — секунды от начала окна
      const f = Math.max(0, Math.min(dur, t)) * hz, i = Math.min(n - 2, Math.floor(f)), u = f - i
      return { x: xs[i] * (1 - u) + xs[i + 1] * u, sway: Math.sin(t * 0.9) * 2.2 + Math.sin(t * 2.3 + 1) * 0.8 }   // едва заметное покачивание кадра, чтобы камера не казалась рельсовой
    },
  }
}
