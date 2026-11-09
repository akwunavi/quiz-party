// Race V3 в приложении: те же результаты, что дала лаборатория (ветка round-lab) на тех же (seed, D); библиотека собак — единый каталог public/bulldog.
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { raceFor, raceSheetUrls, type DogData } from '../engine'
import { createVisual } from '../vendor/dogVisual.mjs'
import { visualAt, categoryOf } from '../vendor/p3visual.mjs'
import * as rockyPhase from '../vendor/rockyPhaseV2.mjs'
import { createSelectionPlayer, type SelectionData } from '../vendor/selectionRules.mjs'
import { ButterflyManager } from '../vendor/butterfly.mjs'
import { DOG_IDS } from '../config'

const ROOT = path.resolve(__dirname, '../../../..'), PUB = path.join(ROOT, 'public/bulldog')
const J = (...p: string[]) => JSON.parse(readFileSync(path.join(PUB, ...p), 'utf8'))
const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex')

describe('Race V3: результаты совпадают с лабораторными (golden)', () => {
  const GOLD: [number, number, number[]][] = [[777, 42, [0, 4, 2, 3, 1]], [1, 30, [0, 3, 2, 1, 4]], [11, 20, [2, 0, 1, 4, 3]], [12, 42, [3, 4, 1, 0, 2]], [13, 120, [0, 3, 2, 4, 1]], [14, 30, [3, 0, 4, 2, 1]]]
  for (const [seed, D, places] of GOLD) it(`seed ${seed}, D=${D}`, () => { expect(raceFor(seed, D).places).toEqual(places) })
  it('воспроизводимость и рост длительности с D', () => {
    expect(JSON.stringify(raceFor(5, 42).dogs.map(d => d.crossing))).toBe(JSON.stringify(raceFor(5, 42).dogs.map(d => d.crossing)))
    const e = [30, 60, 120].map(D => raceFor(777, D).end); expect(e[0]).toBeLessThan(e[1]); expect(e[1]).toBeLessThan(e[2])
  })
  it('не падает на 300 сидах × 3 значениях D', () => { for (let s = 1; s <= 300; s++) for (const D of [20, 42, 120]) expect(raceFor(s * 7919 + 13, D).places.length).toBe(5) })
})

describe('библиотека собак: единый каталог public/bulldog, целостность по MANIFEST', () => {
  const M = J('MANIFEST.json')
  it('все файлы на месте, sha256 совпадают, нет посторонних ссылок на лабораторные пути', () => {
    expect(M.libraryCommit).toMatch(/^[0-9a-f]{7,40}$/)
    for (const [rel, f] of Object.entries(M.files) as [string, { sha256: string; bytes: number }][]) { const p = path.join(PUB, rel); expect(existsSync(p), rel).toBe(true); expect(sha(p), rel).toBe(f.sha256) }
    for (const id of DOG_IDS) for (const f of ['race/atlas.json', 'race/contract.json', 'race/extras.json', 'select/atlas.json', 'still.webp']) expect(M.files[`${id}/${f}`], `${id}/${f}`).toBeTruthy()
    for (const id of DOG_IDS) {                                                          // все ссылки на листы — внутри каталога собаки, не на лабораторные пути
      const A = J(id, 'race/atlas.json'), refs = A.kind === 'labelled' ? Object.values(A.sheets) : Object.values(A.clips).map((c: unknown) => (c as { sheet: string }).sheet)
      for (const r of refs as string[]) expect(r).toMatch(/^race\/[\w.-]+\.webp$/)
    }
  })
  it('каждый лист из атласов существует; общий размер каталога ≤ 60 МБ', () => {
    let total = 0
    for (const id of DOG_IDS) {
      const A = J(id, 'race/atlas.json'), S = J(id, 'select/atlas.json')
      const sheets = [...(A.kind === 'labelled' ? Object.values(A.sheets) : Object.values(A.clips).map((c: unknown) => (c as { sheet: string }).sheet)), ...Object.values(S.clips).map((c: unknown) => (c as { sheet: string }).sheet)] as string[]
      for (const s of sheets) { const p = path.join(PUB, id, s); expect(existsSync(p), p).toBe(true); total += readFileSync(p).length }
    }
    expect(total).toBeLessThan(60 * 1048576)
  })
  it('Рокки: адаптер собран с АКТУАЛЬНОЙ фазировкой (phase_v2): перед каждым STOP/FINISH — исходный #68, на 400 гонках × любых длинах RUN', () => {
    const v = createVisual('rocky', { contract: J('rocky', 'race/contract.json'), atlas: J('rocky', 'race/atlas.json'), extras: { phase: rockyPhase } }, { visualAt, categoryOf })
    let stops = 0, short = 0
    for (let s = 1; s <= 400; s++) { const race = raceFor(s * 31 + 7, 42), segs = race.dogs[2].segments
      segs.forEach((sg, k) => { if ((sg.kind === 'STOP' && sg.eventIndex >= 0) || sg.kind === 'FINISH_DECELERATE') {
        const x = v.at(segs, sg.t0 - 1e-6); expect(rockyPhase.sourceForCell(x.index!)).toBe(68); stops++; if ((segs[k - 1].t1 - segs[k - 1].t0) * 24 < 155) short++ } }) }
    expect(stops).toBeGreaterThan(300); expect(short).toBeGreaterThan(30)                   // короткие пробеги (<155 кадров) реально встречаются и тоже исправлены
  })
  it('все пять собак: на гонках D=20…120 каждый кадр имеет ячейку, нет MISSING/OVERFLOW; старт — RACE_STAND', () => {
    for (const id of DOG_IDS) {
      const v = createVisual(id, { contract: J(id, 'race/contract.json'), atlas: J(id, 'race/atlas.json'), extras: { ...J(id, 'race/extras.json'), ...(id === 'rocky' ? { phase: rockyPhase } : {}) } }, { visualAt, categoryOf })
      const i = DOG_IDS.indexOf(id)
      for (const D of [20, 60]) for (let s = 1; s <= 12; s++) { const dog = raceFor(s * 131, D).dogs[i]
        for (let t = 0; t < dog.segments.at(-1)!.t1; t += 1 / 12) { const x = v.at(dog.segments, t + 1e-6); expect(x.sheet, `${id} t=${t}`).toBeTruthy(); expect(x.overflow).toBe(false); expect(x.role).not.toBe('missing') }
        const st = v.at(dog.segments, 0); expect(st.window).toBe('BASE') }
    }
  })
  it('какие листы грузить: листы действий — только если собака их исполняет (экономия памяти)', () => {
    const A = J('frenk', 'race/atlas.json'), d = { id: 'frenk', atlas: A } as unknown as DogData
    const base = raceSheetUrls(d, [{ kind: 'START' }, { kind: 'RUN' }, { kind: 'STOP' }] as never), withAll = raceSheetUrls(d, [{ kind: 'ROLL' }, { kind: 'BUTTERFLY' }, { kind: 'SNIFF_PEE' }] as never)
    expect(withAll.length).toBeGreaterThan(base.length); expect(base.some(u => /sniff|roll|bf/.test(u))).toBe(false); expect(withAll.some(u => /sniff/.test(u))).toBe(true)
  })
})

describe('экран выбора: правила выхода из IDLE пяти собак', () => {
  const data: SelectionData = { pupsGates: J('pups', 'select/gates.json'), rockyDelay: J('rocky', 'select/delay_map.json') }
  it('максимальное ожидание реакции — принятые компромиссы (Фрэнк 4,42 с, Зефир 2,42, Рокки 3,79, Пупс 3,63, Луна 3,71)', () => {
    const MAX: Record<string, number> = { frenk: 106, zefir: 58, rocky: 91, pups: 87, luna: 89 }
    for (const id of DOG_IDS) {
      const A = J(id, 'select/atlas.json'); let mx = 0
      for (let p = 0; p < 240; p++) {
        const P = createSelectionPlayer(id, data, p); P.tick(); if (!P.pick()) continue; mx = Math.max(mx, P.waitFrames)
        let n = 0, sel = false; while (P.busy() && n++ < 3000) { const f = P.tick(); expect(f.index).toBeGreaterThanOrEqual(0); expect(f.index).toBeLessThan(A.clips[f.clip].count); if (f.clip === 'sel') sel = true }
        expect(sel).toBe(true); expect(P.busy()).toBe(false)
      }
      expect(mx, id).toBe(MAX[id])
    }
  })
})

describe('бабочка — отдельный объект: ровно один на событие, исчезает с телом клипа', () => {
  it('на 60 гонках × 5 собак создано = уничтожено = число событий BUTTERFLY', () => {
    let events = 0
    for (let s = 1; s <= 60; s++) { const race = raceFor(s * 31 + 5, 30)
      race.dogs.forEach((dog, i) => { const id = DOG_IDS[i], c = J(id, 'race/contract.json').clips.BUTTERFLY, n = c.sampler === 'table' ? c.labels.length : c.count
        const v = createVisual(id, { contract: J(id, 'race/contract.json'), atlas: J(id, 'race/atlas.json'), extras: { ...J(id, 'race/extras.json'), ...(id === 'rocky' ? { phase: rockyPhase } : {}) } }, { visualAt, categoryOf })
        const bf = new ButterflyManager(), exp = dog.segments.filter(x => x.kind === 'BUTTERFLY').length; events += exp
        for (let t = 0; t < race.end; t += 1 / 24) bf.update(i, v.at(dog.segments, t + 1e-6), n, t, () => ({ x: 0, y: 0 }))
        expect(bf.log.filter(e => e.ev === 'create').length).toBe(exp); expect(bf.log.filter(e => e.ev === 'destroy').length).toBe(exp); expect(bf.active.size).toBe(0) }) }
    expect(events).toBeGreaterThan(20)
  })
})

describe('вендорные модули не правятся руками', () => {
  it('sha256 файлов vendor/ совпадают с VENDOR.json (источник — ветка интеграции библиотеки)', () => {
    const V = JSON.parse(readFileSync(path.join(ROOT, 'src/lib/bulldog/vendor/VENDOR.json'), 'utf8'))
    for (const [f, m] of Object.entries(V.files) as [string, { vendoredSha256: string }][]) expect(sha(path.join(ROOT, 'src/lib/bulldog/vendor', f)), f).toBe(m.vendoredSha256)
  })
})
