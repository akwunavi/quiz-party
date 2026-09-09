// Минимальный QR-кодер без внешних зависимостей и без сети.
//
// Зачем свой, а не npm-пакет `qrcode`: у него есть облегчённое ядро
// (`qrcode/lib/core`), но это CommonJS-модуль без типов, а сам пакет тащит
// в package.json тяжёлые peer-зависимости (canvas/pngjs) — не в бандл, но
// в node_modules и в аудит. Здесь нужен только byte mode + уровень
// коррекции M на короткой строке (урл игрока, обычно < 120 символов) —
// такой кодер укладывается в один файл и проще держать под контролем.
//
// Реализация — прямой перенос алгоритма ISO/IEC 18004 (как в эталонных
// открытых реализациях: kazuhikoarase/qrcode-generator, npm-пакет
// `qrcode`), урезанный до того, что нужно здесь:
//   - только режим Byte (8 бит/символ) — годится для любого URL/ASCII/UTF-8;
//   - только уровень коррекции M;
//   - только версии символа 1–10 (сторона до 57×57, вместимость байтами —
//     до 213 байт в Byte-режиме при уровне M). Этого с большим запасом
//     хватает на урл игрока, который строится в HostScreen.
// Если строка не помещается даже в версию 10 — функция бросает ошибку
// (вызывающий код должен быть готов, что кодирование может не удаться,
// хотя в реальных данных проекта этого не происходит).

/** Итоговое представление QR-кода: квадратная матрица модулей. */
type Bytes = Uint8Array<ArrayBufferLike>

export interface QrMatrix {
  size: number
  /** true — тёмный (закрашенный) модуль */
  isDark: (x: number, y: number) => boolean
}

// ── Таблицы ISO/IEC 18004 для уровня коррекции M, версии 1–10 ──
// Источник — открытая реализация npm-пакета `qrcode` (MIT), сверено с
// официальными таблицами спецификации. Не пересчитывалось «на глаз».

// Общее число кодовых слов символа (данные + коррекция) по версии.
const TOTAL_CODEWORDS: Record<number, number> = {
  1: 26, 2: 44, 3: 70, 4: 100, 5: 134, 6: 172, 7: 196, 8: 242, 9: 292, 10: 346,
}

// Кодовые слова коррекции ошибок (уровень M) по версии.
const EC_CODEWORDS_M: Record<number, number> = {
  1: 10, 2: 16, 3: 26, 4: 36, 5: 48, 6: 64, 7: 72, 8: 88, 9: 110, 10: 130,
}

// Число блоков коррекции (уровень M) по версии.
const EC_BLOCKS_M: Record<number, number> = {
  1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 4, 7: 4, 8: 4, 9: 5, 10: 5,
}

const FORMAT_BIT_M = 0 // ECLevel.M.bit в спецификации

function symbolSize(version: number): number {
  return version * 4 + 17
}

// Число бит индикатора длины для Byte-режима: 8 бит для версий 1–9,
// 16 бит для версий 10–26 (нам нужно только 8 и 16).
function charCountBits(version: number): number {
  return version < 10 ? 8 : 16
}

// Вместимость в байтах (Byte mode, уровень M) для данной версии.
function byteCapacity(version: number): number {
  const total = TOTAL_CODEWORDS[version]
  const ec = EC_CODEWORDS_M[version]
  const dataBits = (total - ec) * 8
  const reserved = 4 + charCountBits(version)
  return Math.floor((dataBits - reserved) / 8)
}

function pickVersion(byteLength: number): number {
  for (let v = 1; v <= 10; v++) {
    if (byteLength <= byteCapacity(v)) return v
  }
  throw new Error(`qr: данные слишком длинные для версии символа ≤10 (${byteLength} байт)`)
}

// ── Поле Галуа GF(256) для кодов Рида-Соломона ──

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
;(function initGaloisTables() {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) EXP_TABLE[i] = EXP_TABLE[i - 255]
})()

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]]
}

function polyMul(p1: Bytes, p2: Bytes): Bytes {
  const out = new Uint8Array(p1.length + p2.length - 1)
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      out[i + j] ^= gfMul(p1[i], p2[j])
    }
  }
  return out
}

function polyMod(dividend: Bytes, divisor: Bytes): Bytes {
  let result = dividend.slice()
  while (result.length - divisor.length >= 0) {
    const coeff = result[0]
    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= gfMul(divisor[i], coeff)
    }
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }
  return result
}

function generatorPolynomial(degree: number): Bytes {
  let poly: Bytes = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = polyMul(poly, new Uint8Array([1, EXP_TABLE[i]]))
  }
  return poly
}

function reedSolomonEncode(data: Bytes, ecCount: number): Bytes {
  const genPoly = generatorPolynomial(ecCount)
  const padded = new Uint8Array(data.length + ecCount)
  padded.set(data)
  const remainder = polyMod(padded, genPoly)
  const start = ecCount - remainder.length
  if (start > 0) {
    const buf = new Uint8Array(ecCount)
    buf.set(remainder, start)
    return buf
  }
  return remainder
}

// ── Буфер бит ──

class BitBuffer {
  private bytes: number[] = []
  length = 0

  put(num: number, bits: number) {
    for (let i = 0; i < bits; i++) {
      this.putBit(((num >>> (bits - i - 1)) & 1) === 1)
    }
  }

  putBit(bit: boolean) {
    const byteIndex = Math.floor(this.length / 8)
    if (this.bytes.length <= byteIndex) this.bytes.push(0)
    if (bit) this.bytes[byteIndex] |= 0x80 >>> (this.length % 8)
    this.length++
  }

  toBytes(): Bytes {
    return new Uint8Array(this.bytes)
  }
}

// ── Матрица модулей ──

class Matrix {
  size: number
  data: Bytes
  reserved: Bytes

  constructor(size: number) {
    this.size = size
    this.data = new Uint8Array(size * size)
    this.reserved = new Uint8Array(size * size)
  }

  set(row: number, col: number, value: boolean, reserved = false) {
    const i = row * this.size + col
    this.data[i] = value ? 1 : 0
    if (reserved) this.reserved[i] = 1
  }

  get(row: number, col: number): number {
    return this.data[row * this.size + col]
  }

  xor(row: number, col: number, value: boolean) {
    if (value) this.data[row * this.size + col] ^= 1
  }

  isReserved(row: number, col: number): boolean {
    return this.reserved[row * this.size + col] === 1
  }
}

// ── Расстановка служебных паттернов ──

function setupFinderPatterns(m: Matrix) {
  const positions: [number, number][] = [[0, 0], [m.size - 7, 0], [0, m.size - 7]]
  for (const [row, col] of positions) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || m.size <= row + r) continue
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || m.size <= col + c) continue
        const dark =
          (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        m.set(row + r, col + c, dark, true)
      }
    }
  }
}

function setupTimingPattern(m: Matrix) {
  for (let r = 8; r < m.size - 8; r++) {
    const value = r % 2 === 0
    m.set(r, 6, value, true)
    m.set(6, r, value, true)
  }
}

function alignmentPositions(version: number): number[] {
  if (version === 1) return []
  const posCount = Math.floor(version / 7) + 2
  const size = symbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7]
  for (let i = 1; i < posCount - 1; i++) positions[i] = positions[i - 1] - intervals
  positions.push(6)
  return positions.reverse()
}

function setupAlignmentPatterns(m: Matrix, version: number) {
  const coords = alignmentPositions(version)
  const n = coords.length
  const centers: [number, number][] = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === n - 1) || (i === n - 1 && j === 0)) continue
      centers.push([coords[i], coords[j]])
    }
  }
  for (const [row, col] of centers) {
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const dark = r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)
        m.set(row + r, col + c, dark, true)
      }
    }
  }
}

// BCH-код для служебной информации о формате (уровень коррекции + маска).
const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)

function bchDigit(data: number): number {
  let digit = 0
  while (data !== 0) {
    digit++
    data >>>= 1
  }
  return digit
}

function formatInfoBits(maskPattern: number): number {
  const g15Bch = bchDigit(G15)
  const data = (FORMAT_BIT_M << 3) | maskPattern
  let d = data << 10
  while (bchDigit(d) - g15Bch >= 0) {
    d ^= G15 << (bchDigit(d) - g15Bch)
  }
  return ((data << 10) | d) ^ G15_MASK
}

// BCH-код версии символа (нужен только для версий 7 и старше — у нас это
// версии 7–10 из поддерживаемого диапазона 1–10).
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)

function versionInfoBits(version: number): number {
  const g18Bch = bchDigit(G18)
  let d = version << 12
  while (bchDigit(d) - g18Bch >= 0) {
    d ^= G18 << (bchDigit(d) - g18Bch)
  }
  return (version << 12) | d
}

function setupVersionInfo(m: Matrix, version: number) {
  const bits = versionInfoBits(version)
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 3)
    const col = (i % 3) + m.size - 8 - 3
    const mod = ((bits >> i) & 1) === 1
    m.set(row, col, mod, true)
    m.set(col, row, mod, true)
  }
}

function setupFormatInfo(m: Matrix, maskPattern: number) {
  const bits = formatInfoBits(maskPattern)
  for (let i = 0; i < 15; i++) {
    const mod = ((bits >> i) & 1) === 1
    if (i < 6) m.set(i, 8, mod, true)
    else if (i < 8) m.set(i + 1, 8, mod, true)
    else m.set(m.size - 15 + i, 8, mod, true)

    if (i < 8) m.set(8, m.size - i - 1, mod, true)
    else if (i < 9) m.set(8, 15 - i - 1 + 1, mod, true)
    else m.set(8, 15 - i - 1, mod, true)
  }
  m.set(m.size - 8, 8, true, true)
}

function setupData(m: Matrix, data: Bytes) {
  let inc = -1
  let row = m.size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = m.size - 1; col > 0; col -= 2) {
    if (col === 6) col--
    for (;;) {
      for (let c = 0; c < 2; c++) {
        if (!m.isReserved(row, col - c)) {
          const dark = byteIndex < data.length && ((data[byteIndex] >>> bitIndex) & 1) === 1
          m.set(row, col - c, dark)
          bitIndex--
          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }
      row += inc
      if (row < 0 || m.size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

// ── Выбор маски по штрафным очкам ──

type MaskFn = (i: number, j: number) => boolean

const MASK_FNS: MaskFn[] = [
  (i, j) => (i + j) % 2 === 0,
  (i, _j) => i % 2 === 0,
  (i, j) => j % 3 === 0,
  (i, j) => (i + j) % 3 === 0,
  (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
  (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0,
  (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0,
  (i, j) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0,
]

function applyMask(pattern: number, m: Matrix) {
  const fn = MASK_FNS[pattern]
  for (let col = 0; col < m.size; col++) {
    for (let row = 0; row < m.size; row++) {
      if (m.isReserved(row, col)) continue
      m.xor(row, col, fn(row, col))
    }
  }
}

function penaltyN1(m: Matrix): number {
  const size = m.size
  let points = 0
  for (let row = 0; row < size; row++) {
    let sameCol = 0, sameRow = 0, lastCol = -1, lastRow = -1
    for (let col = 0; col < size; col++) {
      let v = m.get(row, col)
      if (v === lastCol) sameCol++
      else {
        if (sameCol >= 5) points += 3 + (sameCol - 5)
        lastCol = v
        sameCol = 1
      }
      v = m.get(col, row)
      if (v === lastRow) sameRow++
      else {
        if (sameRow >= 5) points += 3 + (sameRow - 5)
        lastRow = v
        sameRow = 1
      }
    }
    if (sameCol >= 5) points += 3 + (sameCol - 5)
    if (sameRow >= 5) points += 3 + (sameRow - 5)
  }
  return points
}

function penaltyN2(m: Matrix): number {
  let points = 0
  for (let row = 0; row < m.size - 1; row++) {
    for (let col = 0; col < m.size - 1; col++) {
      const sum = m.get(row, col) + m.get(row, col + 1) + m.get(row + 1, col) + m.get(row + 1, col + 1)
      if (sum === 4 || sum === 0) points++
    }
  }
  return points * 3
}

function penaltyN3(m: Matrix): number {
  const size = m.size
  let points = 0
  for (let row = 0; row < size; row++) {
    let bitsCol = 0, bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7ff) | m.get(row, col)
      if (col >= 10 && (bitsCol === 0x5d0 || bitsCol === 0x05d)) points++
      bitsRow = ((bitsRow << 1) & 0x7ff) | m.get(col, row)
      if (col >= 10 && (bitsRow === 0x5d0 || bitsRow === 0x05d)) points++
    }
  }
  return points * 40
}

function penaltyN4(m: Matrix): number {
  let dark = 0
  for (let i = 0; i < m.data.length; i++) dark += m.data[i]
  const k = Math.abs(Math.ceil(((dark * 100) / m.data.length) / 5) - 10)
  return k * 10
}

function bestMask(m: Matrix): number {
  let best = 0
  let bestPenalty = Infinity
  for (let p = 0; p < 8; p++) {
    setupFormatInfo(m, p)
    applyMask(p, m)
    const penalty = penaltyN1(m) + penaltyN2(m) + penaltyN3(m) + penaltyN4(m)
    applyMask(p, m) // отменить временную маску
    if (penalty < bestPenalty) {
      bestPenalty = penalty
      best = p
    }
  }
  return best
}

// ── Сборка кодовых слов данных ──

function buildDataCodewords(version: number, bytes: Bytes): Bytes {
  const buffer = new BitBuffer()
  buffer.put(0b0100, 4) // индикатор режима Byte
  buffer.put(bytes.length, charCountBits(version))
  for (const byte of bytes) buffer.put(byte, 8)

  const total = TOTAL_CODEWORDS[version]
  const ec = EC_CODEWORDS_M[version]
  const dataBits = (total - ec) * 8

  if (buffer.length + 4 <= dataBits) buffer.put(0, 4)
  while (buffer.length % 8 !== 0) buffer.putBit(false)

  const remainingBytes = (dataBits - buffer.length) / 8
  for (let i = 0; i < remainingBytes; i++) buffer.put(i % 2 ? 0x11 : 0xec, 8)

  return interleave(buffer.toBytes(), version)
}

function interleave(data: Bytes, version: number): Bytes {
  const total = TOTAL_CODEWORDS[version]
  const ecTotal = EC_CODEWORDS_M[version]
  const dataTotal = total - ecTotal
  const blocks = EC_BLOCKS_M[version]

  const blocksInGroup2 = total % blocks
  const blocksInGroup1 = blocks - blocksInGroup2
  const totalPerGroup1 = Math.floor(total / blocks)
  const dataPerGroup1 = Math.floor(dataTotal / blocks)
  const dataPerGroup2 = dataPerGroup1 + 1
  const ecCount = totalPerGroup1 - dataPerGroup1

  let offset = 0
  const dcBlocks: Bytes[] = []
  const ecBlocks: Bytes[] = []
  let maxDataSize = 0

  for (let b = 0; b < blocks; b++) {
    const size = b < blocksInGroup1 ? dataPerGroup1 : dataPerGroup2
    const block = data.slice(offset, offset + size)
    dcBlocks.push(block)
    ecBlocks.push(reedSolomonEncode(block, ecCount))
    offset += size
    maxDataSize = Math.max(maxDataSize, size)
  }

  const out = new Uint8Array(total)
  let idx = 0
  for (let i = 0; i < maxDataSize; i++) {
    for (let r = 0; r < blocks; r++) {
      if (i < dcBlocks[r].length) out[idx++] = dcBlocks[r][i]
    }
  }
  for (let i = 0; i < ecCount; i++) {
    for (let r = 0; r < blocks; r++) out[idx++] = ecBlocks[r][i]
  }
  return out
}

/**
 * Кодирует строку в QR-матрицу (byte mode, уровень коррекции M,
 * версия символа автоподбирается в диапазоне 1–10).
 */
export function encodeQr(text: string): QrMatrix {
  const bytes = new TextEncoder().encode(text)
  const version = pickVersion(bytes.length)
  const dataCodewords = buildDataCodewords(version, bytes)

  const size = symbolSize(version)
  const matrix = new Matrix(size)

  setupFinderPatterns(matrix)
  setupTimingPattern(matrix)
  setupAlignmentPatterns(matrix, version)
  setupFormatInfo(matrix, 0) // резервирует биты формата под маску
  if (version >= 7) setupVersionInfo(matrix, version)
  setupData(matrix, dataCodewords)

  const mask = bestMask(matrix)
  applyMask(mask, matrix)
  setupFormatInfo(matrix, mask)

  return {
    size,
    isDark: (x, y) => matrix.get(y, x) === 1,
  }
}
