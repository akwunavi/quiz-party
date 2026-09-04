// ═══ ФИНАЛЬНАЯ КИНЕМАТОГРАФИЧЕСКАЯ ВСТАВКА ═══
// Играет ОДИН раз, сразу перед полной таблицей итогов: маленький повреждённый
// дрон летит через киберпанк-пространство, встречая одну за другой гигантские
// голографические надписи (QUESTIONS → ANSWERED → NO WAY BACK → FINAL SCORE),
// с каждой набирая скорость и теряя стабильность, а в конце пробивает экран —
// тот буквально трескается и рассыпается, открывая табло за собой.
//
// Архитектура и большинство технических приёмов — прямое продолжение
// IntroScreen.tsx (заставка перед первым раундом): та же связка «WebGL-канва
// (alpha:true, без scene.background — сквозь неё видна сеточная тема) +
// отдельная 2D-канва для трещин/тира/спидлиний (со ЯВНЫМ resize битмапа —
// на интро без этого трещины рисовались за пределами картинки и были
// невидимы), тот же приём с камерой, «отстающей» от цели через easeOutExpo,
// тот же финальный разлёт на шарды». Здесь новое — сам дрон (процедурная
// геометрия, подвешен ребёнком камеры, поэтому камера физически «летит
// вместе с ним») и то, что каждая надпись жёстче предыдущей — не только
// внешним видом, но и длительностью манёвра (см. PHASES/FLIGHT_MS ниже).
//
// Как и у интро, prefers-reduced-motion сознательно НЕ читается: это
// одноразовый ~15-20-секундный спектакль на общий проектор для всего зала
// перед награждением, а не персональный элемент интерфейса — системный
// флаг браузера/ОС конкретной машины с проектором тут не заслуживает
// доверия (см. HANDOFF.md §3ab, разбор живого прогона интро, где именно
// это молча превратило заставку в мелкий текст без анимации).
import { useEffect, useMemo, useRef } from 'react'
import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, FogExp2, AmbientLight, PointLight,
  Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, CanvasTexture, AdditiveBlending,
  BufferGeometry, BufferAttribute, PointsMaterial, Points, Group, BoxGeometry,
  CylinderGeometry, ConeGeometry, SphereGeometry, TorusGeometry, type Material,
} from 'three'

export interface CinematicPhase {
  text: string; sub: string; crack: number; light: number; final?: boolean
}

// Параметризуемая последовательность надписей — можно свободно менять
// слова, порядок и длительность каждого манёвра, не трогая логику ниже.
export const DEFAULT_PHASES: CinematicPhase[] = [
  { text: 'QUESTIONS', sub: 'сближение с массивом данных', crack: 0, light: 0x2be0cc },
  { text: 'ANSWERED', sub: 'манёвр уклонения выполнен', crack: 1, light: 0xea580c },
  { text: 'NO WAY BACK', sub: 'отказ двигателя левого борта', crack: 2, light: 0xff2f5c },
  { text: 'FINAL SCORE', sub: 'критический разлом системы', crack: 4, light: 0x9a5cff, final: true },
]
// Длительность манёвра к каждой надписи — по фазе, УБЫВАЕТ: чем дальше,
// тем резче ускорение. Итог по умолчанию — около 16-17 секунд с учётом
// стартового сближения и финального разлёта.
const FLIGHT_MS = [3400, 2700, 2200, 1900]
const SEGMENT = 640
const CAM_STANDOFF = 560
const FINAL_OVERSHOOT = 320
const CRACK_COLORS = ['#2be0cc', '#ea580c', '#9a5cff', '#ff2f5c', '#4d9fff']
const FONT_PX = 220
const CANVAS_H = 300
const PX_TO_WORLD = 0.46
const MAX_WORLD_W = 820

const phaseZ = (i: number) => -(i + 1) * SEGMENT
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

interface CrackLine { pts: [number, number][]; color: string; width: number }

// ── Процедурный дрон: вытянутый сенсор-корпус (нос + фюзеляж) с двумя
// роторными дисками на консолях по бокам — по референсам ведущего
// («боевой сканирующий дрон», не абстрактный кубик с коническими
// «ушами»). Локальное «вперёд» дрона — тот же -Z, что и у камеры,
// которой он подвешен ребёнком: никакой отдельной ориентирующей
// компенс-ротации группе не нужно. ──
interface RotorPod { pod: Group; rim: Mesh; spokes: Group }
function buildDrone(): {
  group: Group; rotorL: RotorPod; rotorR: RotorPod; engineLight: PointLight
  disposables: Array<{ dispose(): void }>
} {
  const group = new Group()
  const disposables: Array<{ dispose(): void }> = []

  // ── корпус: конический нос + цилиндрический фюзеляж, тёмно-красная
  // повреждённая броня ──
  const hullMat = new MeshStandardMaterial({
    color: 0x7a2028, metalness: .55, roughness: .38, emissive: 0x1a0508, emissiveIntensity: .4,
  })
  const noseGeo = new ConeGeometry(0.42, 0.95, 12)
  const nose = new Mesh(noseGeo, hullMat)
  nose.rotation.x = Math.PI / 2
  nose.position.set(0, 0, -1.55)
  group.add(nose)
  disposables.push(noseGeo, hullMat)

  const hullGeo = new CylinderGeometry(0.42, 0.36, 1.9, 12)
  const hull = new Mesh(hullGeo, hullMat)
  hull.rotation.x = Math.PI / 2
  hull.position.set(0, 0, -0.15)
  group.add(hull)
  disposables.push(hullGeo)

  // повреждённая бронепластина сверху — смещённая, перекошенная
  const plateGeo = new BoxGeometry(0.5, 0.14, 1.0)
  const plateMat = new MeshStandardMaterial({ color: 0x14171c, metalness: .5, roughness: .6 })
  const plate = new Mesh(plateGeo, plateMat)
  plate.position.set(0.08, 0.38, -0.1); plate.rotation.z = 0.1
  group.add(plate)
  disposables.push(plateGeo, plateMat)

  // сенсор-«глаз» на носу + пара мелких боковых линз — светятся, как
  // на референсе с красным корпусом
  const lensMat = new MeshStandardMaterial({
    color: 0x0c1013, emissive: 0x2be0cc, emissiveIntensity: 2.2, metalness: .2, roughness: .3,
  })
  const lensGeo = new SphereGeometry(0.13, 12, 12)
  const lens = new Mesh(lensGeo, lensMat)
  lens.position.set(0, -0.05, -2.0)
  group.add(lens)
  disposables.push(lensGeo, lensMat)

  const smallLensGeo = new SphereGeometry(0.06, 8, 8)
  ;[-0.22, 0.22].forEach(x => {
    const l = new Mesh(smallLensGeo, lensMat)
    l.position.set(x, 0.12, -1.7)
    group.add(l)
  })
  disposables.push(smallLensGeo)

  // ── роторные диски на консолях — вращающиеся спицы + светящийся
  // обод, по референсу с двумя «дисками-колёсами» по бокам ──
  const armGeo = new CylinderGeometry(0.06, 0.06, 1.4, 6)
  const armMat = new MeshStandardMaterial({ color: 0x1a1d22, metalness: .7, roughness: .4 })
  disposables.push(armGeo, armMat)
  const spokeGeo = new BoxGeometry(0.04, 0.86, 0.05)
  const spokeMat = new MeshStandardMaterial({ color: 0x0a0c0f, metalness: .4, roughness: .6 })
  disposables.push(spokeGeo, spokeMat)
  const capGeo = new CylinderGeometry(0.5, 0.5, 0.07, 16)
  const capMat = new MeshStandardMaterial({ color: 0x15181d, metalness: .6, roughness: .45 })
  disposables.push(capGeo, capMat)
  const rimGeo = new TorusGeometry(0.6, 0.09, 8, 20)
  disposables.push(rimGeo)

  function buildRotorPod(side: number, glow: number): RotorPod {
    const pod = new Group()
    const arm = new Mesh(armGeo, armMat)
    arm.rotation.z = Math.PI / 2
    arm.position.set(side * 0.72, -0.08, 0.15)
    pod.add(arm)

    const hubZ = side * 1.45
    const cap = new Mesh(capGeo, capMat)
    cap.rotation.x = Math.PI / 2
    cap.position.set(hubZ, -0.08, 0.15)
    pod.add(cap)

    const rimMat = new MeshStandardMaterial({
      color: 0x0d0f12, metalness: .75, roughness: .3, emissive: glow, emissiveIntensity: 1.4,
    })
    const rim = new Mesh(rimGeo, rimMat)
    rim.position.copy(cap.position)
    pod.add(rim)
    disposables.push(rimMat)

    const spokes = new Group()
    spokes.position.copy(cap.position)
    for (let i = 0; i < 5; i++) {
      const spoke = new Mesh(spokeGeo, spokeMat)
      spoke.rotation.z = (i / 5) * Math.PI
      spokes.add(spoke)
    }
    pod.add(spokes)

    return { pod, rim, spokes }
  }

  const rotorL = buildRotorPod(-1, 0x2be0cc)
  const rotorR = buildRotorPod(1, 0xea580c)
  group.add(rotorL.pod, rotorR.pod)

  const engineLight = new PointLight(0x2be0cc, 2.2, 14, 2)
  engineLight.position.set(0, 0, -1.4)
  group.add(engineLight)

  return { group, rotorL, rotorR, engineLight, disposables }
}

// ── Искры повреждённого двигателя: короткоживущий пул точек, никакого
// постоянного аллокатора — переиспользуем один Float32Array. ──
function buildSparks(count = 60) {
  const geo = new BufferGeometry()
  const pos = new Float32Array(count * 3)
  const life = new Float32Array(count) // <=0 — частица неактивна
  const vel = new Float32Array(count * 3)
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  const mat = new PointsMaterial({
    color: 0xffb347, size: 2.6, transparent: true, opacity: .9,
    blending: AdditiveBlending, depthWrite: false,
  })
  const points = new Points(geo, mat)
  let cursor = 0
  function spawn(x: number, y: number, z: number, n: number) {
    for (let i = 0; i < n; i++) {
      const idx = cursor; cursor = (cursor + 1) % count
      life[idx] = 0.4 + Math.random() * 0.35
      pos[idx * 3] = x; pos[idx * 3 + 1] = y; pos[idx * 3 + 2] = z
      vel[idx * 3] = (Math.random() - .5) * 3.2
      vel[idx * 3 + 1] = (Math.random() - .5) * 3.2 - 1
      vel[idx * 3 + 2] = (Math.random() - .5) * 3.2
    }
  }
  function tick(dt: number) {
    for (let i = 0; i < count; i++) {
      if (life[i] <= 0) { pos[i * 3 + 1] = -9999; continue }
      life[i] -= dt
      pos[i * 3] += vel[i * 3] * dt
      pos[i * 3 + 1] += vel[i * 3 + 1] * dt
      pos[i * 3 + 2] += vel[i * 3 + 2] * dt
      if (life[i] <= 0) pos[i * 3 + 1] = -9999
    }
    geo.attributes.position.needsUpdate = true
  }
  return { points, geo, mat, spawn, tick }
}

export function FinalCinematic({ onDone, phases = DEFAULT_PHASES }: {
  onDone: () => void
  phases?: CinematicPhase[]
}) {
  const glRef = useRef<HTMLCanvasElement>(null)
  const crackRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const noiseRef = useRef<HTMLDivElement>(null)
  const shatterRef = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const phasesRef = useRef(phases)
  phasesRef.current = phases
  const skipRef = useRef<() => void>(() => {})

  const totalLabel = useMemo(() => phases.map(p => p.text).join(' → '), [phases])

  useEffect(() => {
    let cancelled = false
    let done = false
    const finish = () => { if (!done) { done = true; onDoneRef.current() } }
    skipRef.current = finish
    const PHASES = phasesRef.current

    // ── Трещины (2D-канва поверх сцены) — тот же приём, что в IntroScreen:
    // битмап РЕЗИНОВЫЙ по умолчанию (300×150), CSS его только растягивает,
    // без явного resize все координаты рисуются за пределами картинки. ──
    const crackCanvas = crackRef.current
    const crackCtx = crackCanvas?.getContext('2d') ?? null
    let crackLines: CrackLine[] = []
    let currentCrackLevel = 0

    function resizeCrackCanvas() {
      if (!crackCanvas) return
      crackCanvas.width = window.innerWidth
      crackCanvas.height = window.innerHeight
    }
    resizeCrackCanvas()

    // «Больше трещин, хаотичнее, вырастают одна из другой» — прямая
    // правка по отзыву. Три источника хаоса, не один: неровный шаг сегментов
    // (не /segs, а случайная доля), неравномерный угловой шаг лучей вокруг
    // очага (не идеальные спицы (i/rays)*2π), и отдельный ВТОРОЙ проход,
    // который стартует новые трещины из случайных точек НА уже готовых
    // линиях — не только рекурсия внутри одного grow(), а сеть между
    // разными очагами, как у реального разбитого стекла.
    function buildCracks(W: number, H: number) {
      crackLines = []
      let colorSeed = 0
      const impacts = 7 // было 9 — просадка FPS к финалу, -20% по отзыву
      function grow(x: number, y: number, ang: number, len: number, depth: number, width: number) {
        const segs = 3 + Math.floor(Math.random() * 4)
        const pts: [number, number][] = [[x, y]]
        let a = ang, cx = x, cy = y
        for (let s = 0; s < segs; s++) {
          a += (Math.random() - .5) * .9
          const stepLen = (len / segs) * (0.55 + Math.random() * .85)
          cx += Math.cos(a) * stepLen; cy += Math.sin(a) * stepLen
          pts.push([cx, cy])
          if (depth > 0 && Math.random() < .58) {
            const ba = a + (Math.random() < .5 ? 1 : -1) * (0.4 + Math.random() * 1.1)
            grow(cx, cy, ba, len * (0.3 + Math.random() * .35), depth - 1, width * .76)
          }
        }
        crackLines.push({ pts, color: CRACK_COLORS[colorSeed++ % CRACK_COLORS.length], width })
      }
      for (let k = 0; k < impacts; k++) {
        const ox = W * (0.1 + Math.random() * 0.8)
        const oy = H * (0.08 + Math.random() * 0.84)
        const rays = 7 + Math.floor(Math.random() * 7)
        let ang = Math.random() * Math.PI * 2
        for (let i = 0; i < rays; i++) {
          ang += (Math.PI * 2 / rays) * (0.55 + Math.random() * .9)
          const len = Math.max(W, H) * (0.16 + Math.random() * .46)
          grow(ox, oy, ang, len, 2, 0.9)
        }
      }
      // вторичные разломы — «прорастают» из случайных точек на уже
      // построенных линиях, а не из новых независимых очагов
      const primary = crackLines.slice()
      primary.forEach(ln => {
        if (ln.pts.length < 3 || Math.random() >= .55) return
        const [sx, sy] = ln.pts[1 + Math.floor(Math.random() * (ln.pts.length - 2))]
        grow(sx, sy, Math.random() * Math.PI * 2, Math.max(W, H) * (0.08 + Math.random() * .22), 1, 0.55)
      })
    }
    function drawCracksOnly(level: number) {
      if (!crackCtx || level <= 0) return
      const reveal = Math.min(1, level / 2.5)
      const activeCount = Math.round(crackLines.length * reveal)
      for (let i = 0; i < activeCount; i++) {
        const ln = crackLines[i]
        crackCtx.lineWidth = ln.width * (0.9 + level * .1)
        crackCtx.strokeStyle = ln.color; crackCtx.globalAlpha = .7 + level * .07
        crackCtx.shadowColor = ln.color; crackCtx.shadowBlur = 5 + level * 2.4
        crackCtx.beginPath()
        ln.pts.forEach(([x, y], idx) => idx === 0 ? crackCtx!.moveTo(x, y) : crackCtx!.lineTo(x, y))
        crackCtx.stroke()
      }
      crackCtx.globalAlpha = 1; crackCtx.shadowBlur = 0
    }
    function paintCracks(level: number, W: number, H: number) {
      if (!crackCtx) return
      crackCtx.clearRect(0, 0, W, H)
      drawCracksOnly(level)
    }

    function flash(strong = false) {
      const el = noiseRef.current
      if (!el) return
      const cls = strong ? 'fincine-hit-big' : 'fincine-hit'
      el.classList.remove('fincine-hit', 'fincine-hit-big'); void el.offsetWidth; el.classList.add(cls)
    }

    // ── Three.js: сцена, камера-с-дроном-ребёнком, надписи-таблички ──
    let renderer: WebGLRenderer | null = null
    let scene: Scene | null = null
    let camera: PerspectiveCamera | null = null
    let raf = 0
    let glReady = false
    let activePhaseIdx = -1
    const measCanvas = document.createElement('canvas')
    const measCtx = measCanvas.getContext('2d')!
    measCtx.font = `700 ${FONT_PX}px "Rajdhani", sans-serif`

    interface PhaseMesh { mesh: Mesh; ghostCy: Mesh; ghostMg: Mesh }
    const phaseMeshes: PhaseMesh[] = []
    const disposables: Array<{ dispose(): void }> = []

    function makeTextTexture(text: string, glowCss: string, scale = 1) {
      const textW = Math.ceil(measCtx.measureText(text).width)
      const canvasW = Math.max(200, textW + 140)
      const c = document.createElement('canvas')
      c.width = canvasW; c.height = CANVAS_H
      const ctx = c.getContext('2d')!
      ctx.font = `700 ${FONT_PX}px "Rajdhani", sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = glowCss; ctx.shadowBlur = 60
      ctx.fillStyle = '#eef6f4'
      ctx.fillText(text, canvasW / 2, CANVAS_H / 2)
      const tex = new CanvasTexture(c)
      tex.anisotropy = 4
      let worldW = canvasW * PX_TO_WORLD * scale
      let worldH = CANVAS_H * PX_TO_WORLD * scale
      if (worldW > MAX_WORLD_W * scale) {
        const s = (MAX_WORLD_W * scale) / worldW
        worldW *= s; worldH *= s
      }
      return { tex, worldW, worldH }
    }

    function buildPhraseMesh(text: string, z: number, glowCss: string, scale: number): PhaseMesh {
      const { tex, worldW, worldH } = makeTextTexture(text, glowCss, scale)
      const geo = new PlaneGeometry(worldW, worldH)
      const mat = new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 })
      const mesh = new Mesh(geo, mat)
      mesh.position.set(0, 8, z)
      mesh.visible = false
      scene!.add(mesh)

      const ghostCy = new Mesh(geo, new MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, blending: AdditiveBlending,
        color: 0x2be0cc, opacity: 0 }))
      const ghostMg = new Mesh(geo, new MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, blending: AdditiveBlending,
        color: 0xff2f5c, opacity: 0 }))
      ghostCy.position.copy(mesh.position); ghostMg.position.copy(mesh.position)
      ghostCy.visible = false; ghostMg.visible = false
      scene!.add(ghostCy); scene!.add(ghostMg)

      disposables.push(geo, mat, tex, ghostCy.material as Material, ghostMg.material as Material)
      return { mesh, ghostCy, ghostMg }
    }

    const stateRef = {
      camZ: 0, camX: 0, warpKick: 0, yawKick: 0, focusZ: -300, fovKick: 0,
      // null — обычная привязка «чуть ниже камеры»; на финальной надписи
      // ставится в Y самой таблички (см. runSequence), чтобы «FINAL SCORE»
      // держалась строго по центру кадра и было видно, во что врезается
      // дрон — раньше камера целилась ниже текста, и надпись уходила
      // в верхнюю часть экрана.
      focusY: null as number | null,
      droneRoll: 0, droneBob: 0, engineOutT: 0, // >0 — двигатель сейчас «мигает» отказом
      impactT: 0, // >0 — дрон только что впечатался в финальную надпись
    }
    let rig1: PointLight, rig2: PointLight
    let drone: ReturnType<typeof buildDrone> | null = null
    let sparks: ReturnType<typeof buildSparks> | null = null
    let lastT = 0

    function initGL() {
      const canvas = glRef.current
      if (!canvas) return
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

      scene = new Scene()
      scene.fog = new FogExp2(0x04070a, 0.0012)

      camera = new PerspectiveCamera(58, window.innerWidth / window.innerHeight, 1, 6000)
      camera.position.set(0, 0, 40)

      scene.add(new AmbientLight(0x0e2a2c, 1.0))

      // фоновый мусор — те же плывущие обломки, что в интро, для ощущения
      // огромного пустого пространства
      const totalLen = SEGMENT * PHASES.length + 600
      const debrisCount = 700
      const debrisGeo = new BufferGeometry()
      const debrisPos = new Float32Array(debrisCount * 3)
      const debrisCol = new Float32Array(debrisCount * 3)
      const palette = [0x2be0cc, 0x9a5cff, 0xea580c]
      for (let i = 0; i < debrisCount; i++) {
        const r = 60 + Math.random() * 280, ang = Math.random() * Math.PI * 2
        debrisPos[i * 3] = Math.cos(ang) * r
        debrisPos[i * 3 + 1] = Math.sin(ang) * r
        debrisPos[i * 3 + 2] = -Math.random() * totalLen
        const c = new Color(palette[i % palette.length])
        debrisCol[i * 3] = c.r; debrisCol[i * 3 + 1] = c.g; debrisCol[i * 3 + 2] = c.b
      }
      debrisGeo.setAttribute('position', new BufferAttribute(debrisPos, 3))
      debrisGeo.setAttribute('color', new BufferAttribute(debrisCol, 3))
      const debrisMat = new PointsMaterial({ size: 3, vertexColors: true, transparent: true, opacity: .8 })
      scene.add(new Points(debrisGeo, debrisMat))
      disposables.push(debrisGeo, debrisMat)

      PHASES.forEach((phase, i) => {
        const z = phaseZ(i)
        const glowCss = '#' + phase.light.toString(16).padStart(6, '0')
        // финальная надпись — заметно крупнее (спецификация: «занимает
        // почти весь экран») и притом менее прозрачна к драме дрона.
        phaseMeshes.push(buildPhraseMesh(phase.text, z, glowCss, phase.final ? 1.7 : 1))
        const light = new PointLight(phase.light, 2.6, 950, 2)
        light.position.set(0, 40, z + 60)
        scene!.add(light)
      })

      rig1 = new PointLight(0xea580c, 3.4, 550, 2)
      rig2 = new PointLight(0x9a5cff, 2.2, 550, 2)
      scene.add(rig1); scene.add(rig2)

      // дрон — ребёнок камеры: физически «летит вместе» с ней, а не гонится
      // по независимой траектории. Локальное смещение — чуть вперёд-вниз-
      // вправо, как ведомый корабль в кадре.
      drone = buildDrone()
      camera.add(drone.group)
      // локальное «вперёд» дрона уже совпадает с локальным -Z камеры
      // (см. комментарий у buildDrone) — компенсирующий разворот не нужен.
      drone.group.position.set(1.3, -1.0, -6.5)

      sparks = buildSparks()
      drone.group.add(sparks.points)
      disposables.push(sparks.geo, sparks.mat)
      scene.add(camera)

      glReady = true
      resizeGL()

      const camShakeSeed = Math.random() * 1000
      stateRef.camZ = -SEGMENT * 0.6 // старт: дрон уже приближается издалека («PHASE 01 — SILENCE»)

      function renderLoop(t: number) {
        if (!renderer || !scene || !camera || !drone || !sparks) return
        const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0.016
        lastT = t

        const intensity = 0.15 + Math.min(1, Math.max(0, (activePhaseIdx + 1) / PHASES.length)) * 0.85
        // impactT — короткий всплеск в момент, когда дрон впечатался в
        // финальную надпись (см. runFinalImpact): камеру и дрон трясёт
        // сильнее, чем в любой из обычных манёвров.
        const impactT = stateRef.impactT
        if (impactT > 0) stateRef.impactT = Math.max(0, impactT - dt)
        const shakeX = Math.sin(t * .0016 + camShakeSeed) * (1 + intensity * 2.2 + impactT * 6)
          + Math.sin(t * .0043) * .5 * intensity
        const shakeY = Math.cos(t * .002 + camShakeSeed) * (.9 + intensity * 1.8 + impactT * 5)
          + Math.cos(t * .0038) * .45 * intensity
        camera.position.x = shakeX + stateRef.camX
        camera.position.y = shakeY + 6
        camera.position.z = stateRef.camZ + stateRef.warpKick

        const yaw = stateRef.yawKick
        const lookX = camera.position.x + Math.sin(yaw) * 640
        const lookY = stateRef.focusY ?? camera.position.y - 4
        camera.lookAt(lookX, lookY, stateRef.focusZ)
        camera.rotateZ(-yaw * 0.55)

        const fov = 58 + stateRef.fovKick * (14 + intensity * 10) + impactT * 24
        if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix() }

        rig1.position.set(Math.sin(t * .0006) * 80, 30, stateRef.camZ - 120)
        rig2.position.set(Math.cos(t * .0007) * 80, -10, stateRef.camZ - 200)

        // ── дрон: банк по виражу камеры + собственная нестабильность полёта,
        // растущая вместе с интенсивностью сцены. При «отказе двигателя»
        // (engineOutT > 0) корпус на мгновение проваливается и левый
        // движок гаснет — искры прямо из него. ──
        stateRef.droneRoll = stateRef.droneRoll * 0.9 + (-yaw * 1.4) * 0.1
        const bobFreq = 1.6 + intensity * 2.4
        stateRef.droneBob = Math.sin(t * .001 * bobFreq) * (0.12 + intensity * .35)
        drone.group.rotation.z = stateRef.droneRoll * .6
          + (impactT > 0 ? Math.sin(t * .09) * 1.15 * impactT : 0)
        drone.group.rotation.x = Math.sin(t * .0013) * 0.06 * (1 + intensity)
          + (impactT > 0 ? Math.cos(t * .11) * .75 * impactT : 0)
        // роторы крутятся тем быстрее, чем выше интенсивность сцены;
        // повреждённый (левый) диск при отказе почти останавливается
        const spinR = dt * (6 + intensity * 10)
        drone.rotorR.spokes.rotation.z += spinR
        let dipY = -1.0 + stateRef.droneBob
        if (stateRef.engineOutT > 0) {
          stateRef.engineOutT -= dt
          dipY -= (1 - Math.max(0, stateRef.engineOutT) / 0.5) < 1 ? Math.sin((0.5 - stateRef.engineOutT) * 9) * 0.4 : 0
          drone.rotorL.spokes.rotation.z += spinR * 0.12
          ;(drone.rotorL.rim.material as MeshStandardMaterial).emissiveIntensity = Math.random() * .6
          if (Math.random() < 0.5) sparks.spawn(-1.45, -0.08, 0.15, 2)
        } else {
          drone.rotorL.spokes.rotation.z += spinR
          ;(drone.rotorL.rim.material as MeshStandardMaterial).emissiveIntensity = 1.4 + Math.sin(t * .01) * .3
        }
        drone.group.position.y = dipY
        drone.group.position.x = 1.3 + Math.sin(t * .0009) * 0.25 * (1 + intensity)
        // рывок вперёд «в надпись» в момент столкновения
        drone.group.position.z = -6.5 - (impactT > 0 ? impactT * 2.6 : 0)
        sparks.tick(dt)

        phaseMeshes.forEach(p => {
          if (p.mesh.visible) p.mesh.quaternion.copy(camera!.quaternion)
          if (p.ghostCy.visible) p.ghostCy.quaternion.copy(camera!.quaternion)
          if (p.ghostMg.visible) p.ghostMg.quaternion.copy(camera!.quaternion)
        })
        renderer.render(scene, camera)
        raf = requestAnimationFrame(renderLoop)
      }
      raf = requestAnimationFrame(renderLoop)
    }

    function resizeGL() {
      if (!glReady || !renderer || !camera) return
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    function onResize() {
      resizeGL()
      resizeCrackCanvas()
      buildCracks(window.innerWidth, window.innerHeight)
      paintCracks(currentCrackLevel, window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    function crossfadeToPhase(idx: number, ms = 600) {
      const outgoingIdx = activePhaseIdx
      activePhaseIdx = idx
      const incoming = phaseMeshes[idx]
      if (!incoming) return
      incoming.mesh.visible = true
      ;(incoming.mesh.material as MeshBasicMaterial).opacity = 0
      const outgoing = outgoingIdx >= 0 ? phaseMeshes[outgoingIdx] : null
      const start = performance.now()
      function step() {
        const p = Math.min(1, (performance.now() - start) / ms)
        ;(incoming.mesh.material as MeshBasicMaterial).opacity = p
        if (outgoing) (outgoing.mesh.material as MeshBasicMaterial).opacity = 1 - p
        if (p < 1) requestAnimationFrame(step)
        else if (outgoing) outgoing.mesh.visible = false
      }
      step()
    }

    // strength растёт с фазой (0.4 → ~1.3) — каждый следующий пролёт
    // рвёт надпись сильнее и на резких фазах бьёт ДВОЙНЫМ глитчем.
    function glitch3D(strength = 0.5) {
      if (activePhaseIdx < 0) return
      const p = phaseMeshes[activePhaseIdx]
      if (!p) return
      const dx = (14 + Math.random() * 12) * (0.7 + strength * .6)
      const op = Math.min(1, .45 + strength * .3)
      p.ghostCy.visible = true; (p.ghostCy.material as MeshBasicMaterial).opacity = op; p.ghostCy.position.x = -dx
      p.ghostMg.visible = true; (p.ghostMg.material as MeshBasicMaterial).opacity = op; p.ghostMg.position.x = dx
      setTimeout(() => {
        (p.ghostCy.material as MeshBasicMaterial).opacity = 0; p.ghostCy.visible = false; p.ghostCy.position.x = 0
        ;(p.ghostMg.material as MeshBasicMaterial).opacity = 0; p.ghostMg.visible = false; p.ghostMg.position.x = 0
      }, (120 + Math.random() * 90) * (0.8 + strength * .5))
      if (strength > 0.75 && Math.random() < 0.65) {
        setTimeout(() => glitch3D(strength * 0.55), 70 + Math.random() * 70)
      }
    }

    async function flyTo(z: number, x: number, ms: number, yawStrength: number, yawSign: number) {
      const fromZ = stateRef.camZ, fromX = stateRef.camX
      const start = performance.now()
      stateRef.warpKick = (Math.random() - .5) * 40
      stateRef.yawKick = yawSign * yawStrength
      stateRef.fovKick = 1
      return new Promise<void>(resolve => {
        function step(now: number) {
          if (cancelled) { resolve(); return }
          const p = Math.min(1, (now - start) / ms)
          const e = easeOutExpo(p)
          stateRef.camZ = fromZ + (z - fromZ) * e
          stateRef.camX = fromX + (x - fromX) * e
          stateRef.warpKick *= 0.91
          stateRef.yawKick *= 0.972
          stateRef.fovKick *= 0.96
          if (p < 1) requestAnimationFrame(step); else resolve()
        }
        requestAnimationFrame(step)
      })
    }

    function screenTear(strength = 1, durationMs = 420) {
      if (!glReady || !crackCtx || !glRef.current) return
      const W = window.innerWidth, H = window.innerHeight
      const endAt = performance.now() + durationMs
      function frame() {
        const now = performance.now()
        if (now > endAt) { paintCracks(currentCrackLevel, W, H); return }
        crackCtx!.clearRect(0, 0, W, H)
        drawCracksOnly(currentCrackLevel)
        const bands = 5 + Math.floor(Math.random() * 9 * strength)
        for (let i = 0; i < bands; i++) {
          const y = Math.random() * H, h = 4 + Math.random() * 56 * strength
          const dx = (Math.random() - .5) * 150 * strength
          try { crackCtx!.drawImage(glRef.current!, 0, y, W, h, dx, y, W, h) } catch { /* кадр ещё не готов */ }
        }
        crackCtx!.globalCompositeOperation = 'screen'
        const scanGlitches = Math.round(6 * strength)
        for (let i = 0; i < scanGlitches; i++) {
          const y = Math.random() * H
          crackCtx!.strokeStyle = ['#2be0cc', '#ea580c', '#9a5cff'][Math.floor(Math.random() * 3)]
          crackCtx!.globalAlpha = .35 + Math.random() * .35
          crackCtx!.lineWidth = .6 + Math.random() * 1.8
          crackCtx!.beginPath(); crackCtx!.moveTo(0, y); crackCtx!.lineTo(W, y); crackCtx!.stroke()
        }
        crackCtx!.globalCompositeOperation = 'source-over'; crackCtx!.globalAlpha = 1
        if (Math.random() < strength * .14) {
          crackCtx!.globalAlpha = .5
          for (let i = 0; i < 240; i++) {
            crackCtx!.fillStyle = Math.random() < .5 ? '#eef6f4' : '#04070a'
            crackCtx!.fillRect(Math.random() * W, Math.random() * H, 2, 2)
          }
          crackCtx!.globalAlpha = 1
        }
        requestAnimationFrame(frame)
      }
      frame()
    }

    function speedLines(strength = 1, durationMs = 340) {
      if (!glReady || !crackCtx) return
      const W = window.innerWidth, H = window.innerHeight, cx = W / 2, cy = H / 2
      const n = 14 + Math.floor(14 * strength)
      const angles = Array.from({ length: n }, () => Math.random() * Math.PI * 2)
      const start = performance.now()
      function frame() {
        const now = performance.now()
        const p = (now - start) / durationMs
        if (p >= 1) { paintCracks(currentCrackLevel, W, H); return }
        crackCtx!.save()
        crackCtx!.globalCompositeOperation = 'screen'
        angles.forEach(a => {
          const r0 = 30 + p * 340, r1 = r0 + 100 + Math.random() * 170
          const x0 = cx + Math.cos(a) * r0, y0 = cy + Math.sin(a) * r0
          const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1
          crackCtx!.strokeStyle = Math.random() < .5 ? '#ea580c' : '#eef6f4'
          crackCtx!.globalAlpha = (1 - p) * (0.3 + Math.random() * .34) * strength
          crackCtx!.lineWidth = 1.2 + Math.random() * 2
          crackCtx!.beginPath(); crackCtx!.moveTo(x0, y0); crackCtx!.lineTo(x1, y1); crackCtx!.stroke()
        })
        crackCtx!.restore()
        requestAnimationFrame(frame)
      }
      frame()
    }

    async function animateCrackSpread(durationMs = 900) {
      const W = window.innerWidth, H = window.innerHeight
      if (!crackCtx) return
      const start = performance.now()
      const staggers = crackLines.map(() => Math.random() * 0.25)
      await new Promise<void>(resolve => {
        function step() {
          if (cancelled) { resolve(); return }
          const p = Math.min(1, (performance.now() - start) / durationMs)
          crackCtx!.clearRect(0, 0, W, H)
          crackLines.forEach((ln, idx) => {
            const localP = Math.min(1, Math.max(0, (p - staggers[idx]) / (1 - staggers[idx])))
            if (localP <= 0) return
            const pts = ln.pts, totalSegs = pts.length - 1, grown = localP * totalSegs
            crackCtx!.lineWidth = ln.width * (1 + p * .45)
            crackCtx!.strokeStyle = ln.color; crackCtx!.globalAlpha = .65 + p * .32
            crackCtx!.shadowColor = ln.color; crackCtx!.shadowBlur = 3 + p * 6
            crackCtx!.beginPath()
            crackCtx!.moveTo(pts[0][0], pts[0][1])
            for (let s = 0; s < Math.floor(grown); s++) crackCtx!.lineTo(pts[s + 1][0], pts[s + 1][1])
            const segIdx = Math.floor(grown), frac = grown - segIdx
            if (segIdx < totalSegs && frac > 0) {
              const [x0, y0] = pts[segIdx], [x1, y1] = pts[segIdx + 1]
              crackCtx!.lineTo(x0 + (x1 - x0) * frac, y0 + (y1 - y0) * frac)
            }
            crackCtx!.stroke()
          })
          crackCtx!.globalAlpha = 1; crackCtx!.shadowBlur = 0
          if (p < 1) requestAnimationFrame(step); else resolve()
        }
        step()
      })
    }

    // ── дрон реально ВРЕЗАЕТСЯ в «FINAL SCORE» — не просто пролетает мимо
    // с обычным глитчем, как у предыдущих трёх надписей. Это и запускает
    // разлом: сильный рывок камеры/дрона, вспышка искр из носа и обоих
    // роторов, максимальный screenTear — а сразу следом идёт
    // animateCrackSpread(), так что трещины читаются как ПРЯМОЕ следствие
    // столкновения, а не отдельный decorативный слой поверх сцены. ──
    async function runFinalImpact() {
      stateRef.impactT = 0.55
      flash(true)
      if (sparks) {
        sparks.spawn(0, -0.05, -2.0, 28)
        sparks.spawn(-1.45, -0.08, 0.15, 16)
        sparks.spawn(1.45, -0.08, 0.15, 16)
      }
      screenTear(1.6, 340)
      speedLines(1.4, 260)
      await sleep(160)
    }

    async function runFinalShatter() {
      flash(true)
      const layer = shatterRef.current
      if (!layer) return
      layer.innerHTML = ''
      const W = window.innerWidth, H = window.innerHeight
      const cols = 14, rows = 9, cw = W / cols, ch = H / rows, cx = W / 2, cy = H / 2
      const frags: { div: HTMLDivElement; dx: number; dy: number; delay: number }[] = []
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * cw, y = r * ch
        const jitter = () => (Math.random() - .5) * 16
        const div = document.createElement('div')
        div.className = 'fincine-shard'
        div.style.left = x + 'px'; div.style.top = y + 'px'
        div.style.width = (cw + 2) + 'px'; div.style.height = (ch + 2) + 'px'
        div.style.clipPath = `polygon(${jitter()}px ${jitter()}px, ${cw + jitter()}px ${jitter()}px, `
          + `${cw + jitter()}px ${ch + jitter()}px, ${jitter()}px ${ch + jitter()}px)`
        layer.appendChild(div)
        const dx = (x + cw / 2) - cx, dy = (y + ch / 2) - cy, dist = Math.hypot(dx, dy) || 1
        frags.push({ div, dx: dx / dist, dy: dy / dist, delay: (dist / Math.max(W, H)) * 200 + Math.random() * 70 })
      }
      frags.forEach(({ div, dx, dy, delay }) => {
        const outDist = 70 + Math.random() * 160
        const fallDist = 460 + Math.random() * 460
        const rot = (Math.random() - .5) * 460
        div.animate([
          { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: .96, offset: 0 },
          { transform: `translate(${dx * outDist}px, ${dy * outDist - 22}px) rotate(${rot * .3}deg) scale(.9)`, opacity: .9, offset: .2 },
          { transform: `translate(${dx * outDist * 1.4}px, ${dy * outDist + fallDist}px) rotate(${rot}deg) scale(.32)`, opacity: 0, offset: 1 },
        ], { duration: 1250, delay, easing: 'cubic-bezier(.35,.02,.6,1)', fill: 'forwards' })
      })
      await sleep(1250 + 280)
      layer.innerHTML = ''
    }

    async function runSequence() {
      buildCracks(window.innerWidth, window.innerHeight)
      initGL()

      // PHASE 01 — SILENCE: короткое приближение из темноты, минимум эффектов
      if (labelRef.current) labelRef.current.classList.add('fincine-on')
      await sleep(900)
      if (cancelled) return

      for (let i = 0; i < PHASES.length && !cancelled; i++) {
        const phase = PHASES[i]
        currentCrackLevel = phase.crack
        if (subRef.current) {
          subRef.current.innerHTML = phase.final
            ? phase.sub
            : `${phase.sub} · рассинхрон канала <b>${phase.crack}/4</b>`
        }

        crossfadeToPhase(i)
        stateRef.focusZ = phaseZ(i)
        // на финальной надписи камера целится точно в её Y (8, см.
        // buildPhraseMesh) — не понятно, во что врезается дрон, если
        // текст висит выше центра кадра
        if (phase.final) stateRef.focusY = 8
        const yawSign = i % 2 === 0 ? 1 : -1
        const camXTarget = phase.final ? 0 : yawSign * 70
        const camZTarget = phase.final ? phaseZ(i) - FINAL_OVERSHOOT : phaseZ(i) + CAM_STANDOFF
        // «NO WAY BACK» — двигатель отказывает на середине манёвра
        if (phase.crack >= 2 && !phase.final) {
          setTimeout(() => { if (!cancelled) stateRef.engineOutT = 0.5 }, FLIGHT_MS[i] * 0.4)
        }
        await flyTo(camZTarget, camXTarget, FLIGHT_MS[i] ?? 2200, 0.55 + phase.crack * .1, yawSign)
        if (cancelled) return

        // с каждым следующим пролётом — сильнее: glitch/тир/помехи растут
        // от «еле заметно» на первой надписи до «почти неконтролируемо»
        // перед самим столкновением (см. просьбу про эскалацию).
        glitch3D(0.4 + phase.crack * .2)
        screenTear(Math.min(1.5, .45 + phase.crack * .27), phase.final ? 360 : 240 + phase.crack * 30)
        if (!phase.final) speedLines(0.8 + phase.crack * .2, 300 + phase.crack * 20)
        if (phase.crack >= 3) flash(true)
        paintCracks(currentCrackLevel, window.innerWidth, window.innerHeight)
      }
      if (cancelled) return

      // дрон впечатывается в «FINAL SCORE» — отсюда и идёт разлом, не
      // из ниоткуда
      await runFinalImpact()
      if (cancelled) return

      // финальный манёвр «пробил надпись» → экран трескается и рассыпается
      await animateCrackSpread(850)
      if (cancelled) return
      await sleep(140)
      await runFinalShatter()
      if (cancelled) return
      finish()
    }

    void runSequence()

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      disposables.forEach(d => d.dispose())
      drone?.disposables.forEach(d => d.dispose())
      renderer?.dispose()
    }
  }, [])

  return (
    <div className="fincine-root" onClick={() => skipRef.current()}>
      <canvas ref={glRef} className="fincine-gl" />
      <canvas ref={crackRef} className="fincine-crack" />
      <div ref={shatterRef} className="fincine-shatter-layer" />
      <div className="fincine-vignette" />
      <div className="fincine-scanlines" />
      <div ref={noiseRef} className="fincine-noise" />
      <div ref={labelRef} className="fincine-label" aria-hidden={!totalLabel}>
        <div className="fincine-eyebrow">// финальный заход</div>
        <div ref={subRef} className="fincine-sub" />
      </div>
      <div className="fincine-skip">нажмите, чтобы пропустить →</div>
    </div>
  )
}
