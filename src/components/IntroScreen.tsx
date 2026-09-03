// ═══ ЗАСТАВКА «ИНТРО» ═══
// Отсчёт 5-4-3-2-1 (удар кувалдой на каждую цифру) → 3D-пролёт по шести
// фразам (Three.js) → трещины расползаются по всему экрану → всё
// рассыпается → onDone(). Идёт ОДИН раз, между лобби и первым раундом,
// когда pack.settings.show_intro включён (галка в редакторе).
//
// Three.js — обычная npm-зависимость, собирается в бандл, НЕ грузится с
// CDN: гостям и так нужен VPN до Supabase (см. HANDOFF, «уход от VPN»),
// тащить ещё и заставку с внешнего CDN на глазах у зала — лишняя точка
// отказа на экране, который в момент показа чинить некому.
//
// Логика перенесена из отдельно вычитанного и проверенного прототипа
// (артефакт «Neon Ignition») — числа и порядок эффектов там уже прошли
// несколько кругов правок с ведущим. Здесь то же самое, но: без
// бесконечного цикла повтора (тут это одноразовая заставка, не демка),
// без служебного HUD для предпросмотра (тикеры/часы/кнопка replay — это
// было нужно только мне для проверки), и с honestным prefers-reduced-motion
// (в артефакте он был сознательно отключён для показа ведущему — здесь,
// на боевом экране, это неправильно, поэтому уважается по-настоящему).
import { useEffect, useRef } from 'react'
// Именованные импорты, не `import * as THREE` — так бандлер реально может
// выбросить неиспользуемые классы three.js (у namespace-импорта
// tree-shaking куда менее надёжный, а библиотека немаленькая).
import {
  WebGLRenderer, Scene, PerspectiveCamera, Color, FogExp2, AmbientLight, PointLight,
  Mesh, MeshBasicMaterial, PlaneGeometry, CanvasTexture, AdditiveBlending,
  BufferGeometry, BufferAttribute, PointsMaterial, Points, type Material,
} from 'three'
import { useAudioUnlock, AudioGate } from './AudioGate'

interface Phase {
  text: string; sub: string; crack: number; light: number; final?: boolean
}

const PHASES: Phase[] = [
  { text: 'ВЫ ГОТОВЫ?', sub: 'канал синхронизирован', crack: 0, light: 0x2be0cc },
  { text: 'УСАЖИВАЙТЕСЬ ПОУДОБНЕЕ', sub: 'протокол начат', crack: 1, light: 0xea580c },
  { text: 'ВЫБИРАЙТЕ КАПИТАНОВ', sub: 'формирование команд', crack: 2, light: 0x2be0cc },
  { text: 'ПОЧТИ ЗАГРУЗИЛИ ВОПРОСЫ...', sub: 'база вопросов синхронизируется', crack: 3, light: 0xea580c },
  { text: 'ВСЕ НА МЕСТЕ', sub: 'все каналы подтверждены', crack: 3, light: 0x9a5cff },
  { text: 'ПОГНАЛИ!', sub: 'раунд 01 // на связи', crack: 4, light: 0xea580c, final: true },
]

const SEGMENT = 620
const CAM_STANDOFF = 560
const FINAL_OVERSHOOT = 300
const FLIGHT_MS = 2800
const COUNTDOWN_STEP_MS = 850
const CRACK_COLORS = ['#2be0cc', '#ea580c', '#9a5cff', '#ff3d7f', '#4d9fff', '#c6ff3d']
const FONT_PX = 210
const CANVAS_H = 300
const PX_TO_WORLD = 0.42
const MAX_WORLD_W = 740

const phaseZ = (i: number) => -(i + 1) * SEGMENT
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

interface CrackLine { pts: [number, number][]; color: string; width: number }

export function IntroScreen({ onDone }: { onDone: () => void }) {
  const glRef = useRef<HTMLCanvasElement>(null)
  const crackRef = useRef<HTMLCanvasElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLDivElement>(null)
  const flightLabelRef = useRef<HTMLDivElement>(null)
  const flightSubRef = useRef<HTMLDivElement>(null)
  const noiseRef = useRef<HTMLDivElement>(null)
  const shatterRef = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  // Подсказка «звук заблокирован» на случай, если это вообще первый жест
  // ведущего в этой вкладке — тот же приём, что и на экране вопроса.
  useAudioUnlock()

  useEffect(() => {
    let cancelled = false
    let done = false
    const finish = () => { if (!done) { done = true; onDoneRef.current() } }

    const reduceMotion = typeof matchMedia === 'function'
      && matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Отсчёт-звук: удар кувалдой, синтез Web Audio, без файла ──
    let audioCtx: AudioContext | null = null
    function getAudio(): AudioContext | null {
      if (!audioCtx) {
        try {
          const Ctx = window.AudioContext
            ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          audioCtx = new Ctx()
        } catch { /* нет Web Audio */ }
      }
      return audioCtx
    }
    function hammerHit() {
      const ctx = getAudio()
      if (!ctx) return
      if (ctx.state === 'suspended') void ctx.resume()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(130, now)
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.16)
      const oGain = ctx.createGain()
      oGain.gain.setValueAtTime(1.0, now)
      oGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)
      osc.connect(oGain).connect(ctx.destination)
      osc.start(now); osc.stop(now + 0.42)

      const bufSize = Math.floor(ctx.sampleRate * 0.14)
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2.2)
      const noise = ctx.createBufferSource()
      noise.buffer = buf
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'; noiseFilter.frequency.value = 850
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.55, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13)
      noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination)
      noise.start(now)
    }

    function playIntroMusic() {
      const el = musicRef.current
      if (!el) return
      el.currentTime = 0
      el.play().catch(() => { /* без разблокированного звука браузер откажет — не критично */ })
    }

    // ── Трещины: тонкая многоочаговая паутинка, 6 цветов ──
    const crackCanvas = crackRef.current
    const crackCtx = crackCanvas?.getContext('2d') ?? null
    let crackLines: CrackLine[] = []
    let currentCrackLevel = 0

    function buildCracks(W: number, H: number) {
      crackLines = []
      let colorSeed = 0
      const impacts = 4
      function grow(x: number, y: number, ang: number, len: number, depth: number, width: number) {
        const segs = 3 + Math.floor(Math.random() * 3)
        const pts: [number, number][] = [[x, y]]
        let a = ang, cx = x, cy = y
        for (let s = 0; s < segs; s++) {
          a += (Math.random() - .5) * .6
          const stepLen = len / segs
          cx += Math.cos(a) * stepLen; cy += Math.sin(a) * stepLen
          pts.push([cx, cy])
          if (depth > 0 && Math.random() < .45) {
            const ba = a + (Math.random() < .5 ? 1 : -1) * (0.5 + Math.random() * .9)
            grow(cx, cy, ba, len * (0.35 + Math.random() * .3), depth - 1, width * .78)
          }
        }
        crackLines.push({ pts, color: CRACK_COLORS[colorSeed++ % CRACK_COLORS.length], width })
      }
      const originsY = [H * (0.06 + Math.random() * 0.1), H * (0.84 + Math.random() * 0.1)]
      for (let k = 0; k < impacts; k++) {
        const ox = W * (0.15 + Math.random() * 0.7)
        const oy = k < originsY.length ? originsY[k] : H * (0.1 + Math.random() * 0.8)
        const rays = 7 + Math.floor(Math.random() * 5)
        for (let i = 0; i < rays; i++) {
          const ang = (i / rays) * Math.PI * 2 + (Math.random() - .5) * .4
          const len = Math.max(W, H) * (0.18 + Math.random() * .38)
          grow(ox, oy, ang, len, 2, 0.7)
        }
      }
    }
    function drawCracksOnly(level: number) {
      if (!crackCtx || level <= 0) return
      const reveal = Math.min(1, level / 3.2)
      const activeCount = Math.round(crackLines.length * reveal)
      for (let i = 0; i < activeCount; i++) {
        const ln = crackLines[i]
        crackCtx.lineWidth = ln.width * (0.8 + level * .08)
        crackCtx.strokeStyle = ln.color; crackCtx.globalAlpha = .7 + level * .1
        crackCtx.shadowColor = ln.color; crackCtx.shadowBlur = 4 + level * 1.8
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

    function flash() {
      const el = noiseRef.current
      if (!el) return
      el.classList.remove('intro-hit'); void el.offsetWidth; el.classList.add('intro-hit')
    }
    function glitchHit() {
      const el = frameRef.current?.firstElementChild as HTMLElement | undefined
      if (el) { el.classList.remove('intro-rgbslam'); void el.offsetWidth; el.classList.add('intro-rgbslam') }
      frameRef.current?.classList.remove('intro-jitter')
      void frameRef.current?.offsetWidth
      frameRef.current?.classList.add('intro-jitter')
      flash()
      glitch3D()
    }

    async function runCountdown() {
      for (let n = 5; n >= 1 && !cancelled; n--) {
        const frame = frameRef.current
        if (!frame) return
        frame.innerHTML = ''
        const el = document.createElement('div')
        el.className = 'intro-glyph'
        el.setAttribute('data-t', String(n))
        el.textContent = String(n)
        frame.appendChild(el)
        glitchHit()
        hammerHit()
        const anim = el.animate([
          { transform: 'scale(.4)', opacity: 0, filter: 'blur(14px)' },
          { transform: 'scale(1.22)', opacity: 1, filter: 'blur(0px)', offset: .55 },
          { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
        ], { duration: COUNTDOWN_STEP_MS * 0.7, easing: 'cubic-bezier(.2,1.4,.4,1)' })
        await anim.finished
        await sleep(COUNTDOWN_STEP_MS * 0.3)
      }
    }

    // ── Three.js: сцена, камера, фразы-таблички ──
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

    function makeTextTexture(text: string, glowCss: string) {
      const textW = Math.ceil(measCtx.measureText(text).width)
      const canvasW = Math.max(200, textW + 120)
      const c = document.createElement('canvas')
      c.width = canvasW; c.height = CANVAS_H
      const ctx = c.getContext('2d')!
      ctx.font = `700 ${FONT_PX}px "Rajdhani", sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = glowCss; ctx.shadowBlur = 56
      ctx.fillStyle = '#d24e01'
      ctx.fillText(text, canvasW / 2, CANVAS_H / 2)
      const tex = new CanvasTexture(c)
      tex.anisotropy = 4
      let worldW = canvasW * PX_TO_WORLD
      let worldH = CANVAS_H * PX_TO_WORLD
      if (worldW > MAX_WORLD_W) {
        const scale = MAX_WORLD_W / worldW
        worldW *= scale; worldH *= scale
      }
      return { tex, worldW, worldH }
    }

    function buildPhraseMesh(text: string, z: number, glowCss: string): PhaseMesh {
      const { tex, worldW, worldH } = makeTextTexture(text, glowCss)
      const geo = new PlaneGeometry(worldW, worldH)
      const mat = new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 })
      const mesh = new Mesh(geo, mat)
      mesh.position.set(0, 10, z)
      mesh.visible = false
      scene!.add(mesh)

      const ghostCy = new Mesh(geo, new MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, blending: AdditiveBlending,
        color: 0x2be0cc, opacity: 0 }))
      const ghostMg = new Mesh(geo, new MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, blending: AdditiveBlending,
        color: 0x9a5cff, opacity: 0 }))
      ghostCy.position.copy(mesh.position); ghostMg.position.copy(mesh.position)
      ghostCy.visible = false; ghostMg.visible = false
      scene!.add(ghostCy); scene!.add(ghostMg)

      disposables.push(geo, mat, tex, ghostCy.material as Material, ghostMg.material as Material)
      return { mesh, ghostCy, ghostMg }
    }

    const stateRef = { camZ: 0, camX: 0, warpKick: 0, yawKick: 0, focusZ: -300, fovKick: 0 }
    let rig1: PointLight, rig2: PointLight

    function initGL() {
      const canvas = glRef.current
      if (!canvas) return
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

      scene = new Scene()
      scene.background = new Color(0x04070a)
      scene.fog = new FogExp2(0x04070a, 0.0011)

      camera = new PerspectiveCamera(62, window.innerWidth / window.innerHeight, 1, 6000)
      camera.position.set(0, 0, 40)

      scene.add(new AmbientLight(0x0e2a2c, 1.1))

      const totalLen = SEGMENT * PHASES.length + 500
      const debrisCount = 900
      const debrisGeo = new BufferGeometry()
      const debrisPos = new Float32Array(debrisCount * 3)
      const debrisCol = new Float32Array(debrisCount * 3)
      const palette3 = [0x2be0cc, 0xea580c, 0xea580c, 0x9a5cff]
      for (let i = 0; i < debrisCount; i++) {
        const r = 60 + Math.random() * 260, ang = Math.random() * Math.PI * 2
        debrisPos[i * 3] = Math.cos(ang) * r
        debrisPos[i * 3 + 1] = Math.sin(ang) * r
        debrisPos[i * 3 + 2] = -Math.random() * totalLen
        const c = new Color(palette3[i % palette3.length])
        debrisCol[i * 3] = c.r; debrisCol[i * 3 + 1] = c.g; debrisCol[i * 3 + 2] = c.b
      }
      debrisGeo.setAttribute('position', new BufferAttribute(debrisPos, 3))
      debrisGeo.setAttribute('color', new BufferAttribute(debrisCol, 3))
      const debrisMat = new PointsMaterial({ size: 3.4, vertexColors: true, transparent: true, opacity: .85 })
      scene.add(new Points(debrisGeo, debrisMat))
      disposables.push(debrisGeo, debrisMat)

      PHASES.forEach((phase, i) => {
        const z = phaseZ(i)
        const glowCss = '#' + phase.light.toString(16).padStart(6, '0')
        phaseMeshes.push(buildPhraseMesh(phase.text, z, glowCss))
        const light = new PointLight(phase.light, 2.4, 900, 2)
        light.position.set(0, 40, z + 60)
        scene!.add(light)
      })

      rig1 = new PointLight(0xea580c, 4, 550, 2)
      rig2 = new PointLight(0x9a5cff, 2.6, 550, 2)
      scene.add(rig1); scene.add(rig2)

      glReady = true
      resizeGL()

      const camShakeSeed = Math.random() * 1000
      stateRef.camZ = 0

      function renderLoop(t: number) {
        if (!renderer || !scene || !camera) return
        if (!reduceMotion) {
          const shakeX = Math.sin(t * .0016 + camShakeSeed) * 1.1 + Math.sin(t * .0043) * .5
          const shakeY = Math.cos(t * .002 + camShakeSeed) * .9 + Math.cos(t * .0038) * .45
          camera.position.x = shakeX + stateRef.camX; camera.position.y = shakeY + 6
        } else { camera.position.x = stateRef.camX; camera.position.y = 6 }
        camera.position.z = stateRef.camZ + (reduceMotion ? 0 : stateRef.warpKick)

        const yaw = reduceMotion ? 0 : stateRef.yawKick
        const lookX = camera.position.x + Math.sin(yaw) * 640
        camera.lookAt(lookX, camera.position.y - 4, stateRef.focusZ)
        if (!reduceMotion) camera.rotateZ(-yaw * 0.5)

        const fov = 62 + (reduceMotion ? 0 : stateRef.fovKick * 14)
        if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix() }

        rig1.position.set(Math.sin(t * .0006) * 80, 30, stateRef.camZ - 120)
        rig2.position.set(Math.cos(t * .0007) * 80, -10, stateRef.camZ - 200)
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
      buildCracks(window.innerWidth, window.innerHeight)
      paintCracks(currentCrackLevel, window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize, { passive: true })

    function crossfadeToPhase(idx: number, ms = 650) {
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

    function glitch3D() {
      if (reduceMotion || activePhaseIdx < 0) return
      const p = phaseMeshes[activePhaseIdx]
      if (!p) return
      const dx = 16 + Math.random() * 14
      p.ghostCy.visible = true; (p.ghostCy.material as MeshBasicMaterial).opacity = .6; p.ghostCy.position.x = -dx
      p.ghostMg.visible = true; (p.ghostMg.material as MeshBasicMaterial).opacity = .6; p.ghostMg.position.x = dx
      setTimeout(() => {
        (p.ghostCy.material as MeshBasicMaterial).opacity = 0; p.ghostCy.visible = false; p.ghostCy.position.x = 0
        ;(p.ghostMg.material as MeshBasicMaterial).opacity = 0; p.ghostMg.visible = false; p.ghostMg.position.x = 0
      }, 140 + Math.random() * 100)
    }

    async function flyTo(z: number, x: number, ms: number, yawStrength: number, yawSign: number) {
      const fromZ = stateRef.camZ, fromX = stateRef.camX
      const start = performance.now()
      stateRef.warpKick = (Math.random() - .5) * 34
      stateRef.yawKick = yawSign * yawStrength
      stateRef.fovKick = 1
      return new Promise<void>(resolve => {
        function step(now: number) {
          const p = Math.min(1, (now - start) / ms)
          const e = easeOutExpo(p)
          stateRef.camZ = fromZ + (z - fromZ) * e
          stateRef.camX = fromX + (x - fromX) * e
          stateRef.warpKick *= 0.92
          stateRef.yawKick *= 0.975
          stateRef.fovKick *= 0.965
          if (p < 1) requestAnimationFrame(step); else resolve()
        }
        requestAnimationFrame(step)
      })
    }

    function screenTear(strength = 1, durationMs = 420) {
      if (reduceMotion || !glReady || !crackCtx || !glRef.current) return
      const W = window.innerWidth, H = window.innerHeight
      const endAt = performance.now() + durationMs
      function frame() {
        const now = performance.now()
        if (now > endAt) { paintCracks(currentCrackLevel, W, H); return }
        crackCtx!.clearRect(0, 0, W, H)
        drawCracksOnly(currentCrackLevel)
        const bands = 5 + Math.floor(Math.random() * 8 * strength)
        for (let i = 0; i < bands; i++) {
          const y = Math.random() * H, h = 4 + Math.random() * 52 * strength
          const dx = (Math.random() - .5) * 130 * strength
          try { crackCtx!.drawImage(glRef.current!, 0, y, W, h, dx, y, W, h) } catch { /* кадр ещё не готов */ }
        }
        const scanGlitches = Math.round(6 * strength)
        crackCtx!.globalCompositeOperation = 'screen'
        for (let i = 0; i < scanGlitches; i++) {
          const y = Math.random() * H
          crackCtx!.strokeStyle = ['#2be0cc', '#ea580c', '#9a5cff'][Math.floor(Math.random() * 3)]
          crackCtx!.globalAlpha = .35 + Math.random() * .35
          crackCtx!.lineWidth = .6 + Math.random() * 1.6
          crackCtx!.beginPath(); crackCtx!.moveTo(0, y); crackCtx!.lineTo(W, y); crackCtx!.stroke()
        }
        crackCtx!.globalCompositeOperation = 'source-over'; crackCtx!.globalAlpha = 1
        if (Math.random() < strength * .12) {
          crackCtx!.globalAlpha = .5
          for (let i = 0; i < 220; i++) {
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
      if (reduceMotion || !glReady || !crackCtx) return
      const W = window.innerWidth, H = window.innerHeight, cx = W / 2, cy = H / 2
      const n = 12 + Math.floor(10 * strength)
      const angles = Array.from({ length: n }, () => Math.random() * Math.PI * 2)
      const start = performance.now()
      function frame() {
        const now = performance.now()
        const p = (now - start) / durationMs
        if (p >= 1) { paintCracks(currentCrackLevel, W, H); return }
        crackCtx!.save()
        crackCtx!.globalCompositeOperation = 'screen'
        angles.forEach(a => {
          const r0 = 30 + p * 300, r1 = r0 + 90 + Math.random() * 150
          const x0 = cx + Math.cos(a) * r0, y0 = cy + Math.sin(a) * r0
          const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1
          crackCtx!.strokeStyle = Math.random() < .5 ? '#ea580c' : '#eef6f4'
          crackCtx!.globalAlpha = (1 - p) * (0.28 + Math.random() * .32) * strength
          crackCtx!.lineWidth = 1.2 + Math.random() * 1.8
          crackCtx!.beginPath(); crackCtx!.moveTo(x0, y0); crackCtx!.lineTo(x1, y1); crackCtx!.stroke()
        })
        crackCtx!.restore()
        requestAnimationFrame(frame)
      }
      frame()
    }

    async function animateCrackSpread(durationMs = 900) {
      const W = window.innerWidth, H = window.innerHeight
      if (reduceMotion || !crackCtx) return
      const start = performance.now()
      const staggers = crackLines.map(() => Math.random() * 0.25)
      await new Promise<void>(resolve => {
        function step() {
          const p = Math.min(1, (performance.now() - start) / durationMs)
          crackCtx!.clearRect(0, 0, W, H)
          crackLines.forEach((ln, idx) => {
            const localP = Math.min(1, Math.max(0, (p - staggers[idx]) / (1 - staggers[idx])))
            if (localP <= 0) return
            const pts = ln.pts, totalSegs = pts.length - 1, grown = localP * totalSegs
            crackCtx!.lineWidth = ln.width * (1 + p * .4)
            crackCtx!.strokeStyle = ln.color; crackCtx!.globalAlpha = .65 + p * .3
            crackCtx!.shadowColor = ln.color; crackCtx!.shadowBlur = 3 + p * 5
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

    async function runFinalShatter() {
      flash()
      frameRef.current?.classList.add('intro-jitter')
      const layer = shatterRef.current
      if (!layer) return
      layer.innerHTML = ''
      if (reduceMotion) return
      const W = window.innerWidth, H = window.innerHeight
      const cols = 11, rows = 8, cw = W / cols, ch = H / rows, cx = W / 2, cy = H / 2
      const frags: { div: HTMLDivElement; dx: number; dy: number; delay: number }[] = []
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * cw, y = r * ch
        const jitter = () => (Math.random() - .5) * 16
        const div = document.createElement('div')
        div.className = 'intro-shard'
        div.style.left = x + 'px'; div.style.top = y + 'px'
        div.style.width = (cw + 2) + 'px'; div.style.height = (ch + 2) + 'px'
        div.style.clipPath = `polygon(${jitter()}px ${jitter()}px, ${cw + jitter()}px ${jitter()}px, `
          + `${cw + jitter()}px ${ch + jitter()}px, ${jitter()}px ${ch + jitter()}px)`
        layer.appendChild(div)
        const dx = (x + cw / 2) - cx, dy = (y + ch / 2) - cy, dist = Math.hypot(dx, dy) || 1
        frags.push({ div, dx: dx / dist, dy: dy / dist, delay: (dist / Math.max(W, H)) * 220 + Math.random() * 80 })
      }
      frags.forEach(({ div, dx, dy, delay }) => {
        const outDist = 60 + Math.random() * 140
        const fallDist = 420 + Math.random() * 420
        const rot = (Math.random() - .5) * 420
        div.animate([
          { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: .95, offset: 0 },
          { transform: `translate(${dx * outDist}px, ${dy * outDist - 20}px) rotate(${rot * .3}deg) scale(.9)`, opacity: .9, offset: .22 },
          { transform: `translate(${dx * outDist * 1.4}px, ${dy * outDist + fallDist}px) rotate(${rot}deg) scale(.35)`, opacity: 0, offset: 1 },
        ], { duration: 1300, delay, easing: 'cubic-bezier(.35,.02,.6,1)', fill: 'forwards' })
      })
      await sleep(1300 + 300)
      layer.innerHTML = ''
    }

    async function runSequence() {
      buildCracks(window.innerWidth, window.innerHeight)
      initGL()

      if (reduceMotion) {
        // Сокращённая версия: без 3D-полёта и виражей — только текст фраз
        // друг за другом, честно уважая системную настройку.
        if (stageRef.current) stageRef.current.style.display = 'flex'
        for (let n = 5; n >= 1 && !cancelled; n--) {
          if (frameRef.current) frameRef.current.textContent = String(n)
          await sleep(400)
        }
        if (stageRef.current) stageRef.current.style.display = 'none'
        playIntroMusic()
        if (flightLabelRef.current) flightLabelRef.current.classList.add('intro-on')
        for (const phase of PHASES) {
          if (cancelled) return
          if (flightSubRef.current) flightSubRef.current.textContent = phase.text
          await sleep(900)
        }
        finish()
        return
      }

      if (stageRef.current) stageRef.current.style.display = 'flex'
      await runCountdown()
      if (cancelled) return
      if (stageRef.current) stageRef.current.style.display = 'none'
      flightLabelRef.current?.classList.add('intro-on')
      playIntroMusic()

      for (let i = 0; i < PHASES.length && !cancelled; i++) {
        const phase = PHASES[i]
        currentCrackLevel = phase.crack
        if (flightSubRef.current) {
          flightSubRef.current.innerHTML = phase.final
            ? phase.sub
            : `${phase.sub} · трещина канала <b>${phase.crack}/4</b>`
        }

        crossfadeToPhase(i)
        stateRef.focusZ = phaseZ(i)
        const yawSign = i % 2 === 0 ? 1 : -1
        const camXTarget = phase.final ? 0 : yawSign * 60
        const camZTarget = phase.final ? phaseZ(i) - FINAL_OVERSHOOT : phaseZ(i) + CAM_STANDOFF
        await flyTo(camZTarget, camXTarget, FLIGHT_MS, 0.5 + phase.crack * .09, yawSign)
        if (cancelled) return

        glitchHit()
        screenTear(Math.min(1, .5 + phase.crack * .14), phase.final ? 300 : 260)
        if (!phase.final) speedLines(0.8 + phase.crack * .1, 320)
        paintCracks(currentCrackLevel, window.innerWidth, window.innerHeight)
      }
      if (cancelled) return

      await animateCrackSpread(900)
      if (cancelled) return
      await sleep(150)
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
      renderer?.dispose()
      audioCtx?.close().catch(() => {})
    }
  }, [])

  return (
    <div className="host-screen grid-bg intro-screen">
      <div className="intro-root">
        <canvas ref={glRef} className="intro-gl" />
        <canvas ref={crackRef} className="intro-crack" />
        <div ref={shatterRef} className="intro-shatter-layer" />
        <div className="intro-vignette" />
        <div className="intro-scanlines" />
        <div ref={noiseRef} className="intro-noise" />
        <div ref={stageRef} className="intro-stage">
          <div className="intro-eyebrow">protocol // boot sequence</div>
          <div ref={frameRef} className="intro-frame" />
          <div ref={sublineRef} className="intro-subline">инициализация канала связи…</div>
        </div>
        <div ref={flightLabelRef} className="intro-flight-label">
          <div ref={flightSubRef} className="intro-subline" />
        </div>
        <AudioGate />
        <audio ref={musicRef} src={`${import.meta.env.BASE_URL}intro.mp3`} preload="auto" />
      </div>
    </div>
  )
}
