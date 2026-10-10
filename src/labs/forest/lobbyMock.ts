// ═══ Этап 5 · Лобби: общая основа трёх концептов ═══
// Данные — настоящие (12 команд лабораторного вечера, составы рандомайзера: 4 команды/18 человек и 8/24). Игровую логику
// не трогаем: здесь только «что показать в каждом состоянии». Раскладка зависит от ИТОГОВОГО числа команд в состоянии
// и существует только для пришедших: пустых мест в кадре нет.
import { ALL, GROUPS, type T5 } from './stage5Data'

export type { T5 }

export const LB_STATES = [
  { id: 'zero', name: '0 команд — ждём (полная сцена)' },
  { id: 'one', name: '1 команда — первое прибытие' },
  { id: 'six', name: '6 команд — собираются' },
  { id: 'twelve', name: '12 команд — плотное лобби, длинные имена' },
  { id: 'rapid', name: 'Три прибытия подряд (6 → 9)' },
  { id: 'drop', name: 'Одна команда отключилась' },
  { id: 'qr', name: 'QR выделен' },
  { id: 'rzintro', name: 'Рандомайзер: начало' },
  { id: 'rz4', name: 'Рандомайзер идёт: 4 команды из 18 человек' },
  { id: 'rz8', name: 'Рандомайзер идёт: 8 команд из 24 человек' },
  { id: 'rzdone', name: 'Рандомайзер: итог, команды названы' },
  { id: 'rzback', name: 'Возврат в лобби после составов' },
  { id: 'locked', name: 'Состав закрыт: всё готово' },
  { id: 'rules', name: 'Переход к правилам' },
]

const ORD = ['t1', 't3', 't5', 't2', 't4', 't6', 't7', 't8', 't9', 't10', 't11', 't12']
const pick = (n: number) => ORD.slice(0, n).map(id => ALL.find(t => t.id === id)!)
export type Preset = { teams: T5[]; /** сколько мест в итоговой раскладке */ n: number; /** с какого по счёту приходят в этом показе */ from: number; gap: number; dead?: string; qrLit?: boolean; rz?: 0 | 4 | 8; rzMode?: 'intro' | 'run' | 'done' | 'back'; locked?: boolean; rules?: boolean }
export function preset(state: string): Preset {
  switch (state) {
    case 'zero': return { teams: [], n: 0, from: 0, gap: 1 }
    case 'one': return { teams: pick(1), n: 1, from: 0, gap: 1 }
    case 'six': return { teams: pick(6), n: 6, from: 0, gap: 0.95 }
    case 'twelve': return { teams: pick(12), n: 12, from: 0, gap: 0.62 }
    case 'rapid': return { teams: pick(9), n: 9, from: 6, gap: 0.34 }
    case 'drop': return { teams: [...pick(7), ALL.find(t => t.id === 't11')!], n: 8, from: 99, gap: 1, dead: 't11' }
    case 'qr': return { teams: pick(6), n: 6, from: 99, gap: 1, qrLit: true }
    case 'rzintro': return { teams: pick(6), n: 6, from: 99, gap: 1, rz: 4, rzMode: 'intro' }
    case 'rz4': return { teams: pick(6), n: 6, from: 99, gap: 1, rz: 4, rzMode: 'run' }
    case 'rz8': return { teams: pick(8), n: 8, from: 99, gap: 1, rz: 8, rzMode: 'run' }
    case 'rzdone': return { teams: pick(6), n: 6, from: 99, gap: 1, rz: 4, rzMode: 'done' }
    case 'rzback': return { teams: pick(6), n: 6, from: 99, gap: 1, qrLit: true, rz: 4, rzMode: 'back' }
    case 'locked': return { teams: pick(8), n: 8, from: 99, gap: 1, locked: true }
    case 'rules': return { teams: pick(8), n: 8, from: 99, gap: 1, rules: true }
    default: return { teams: pick(6), n: 6, from: 99, gap: 1 }
  }
}

// ── рандомайзер ──
const NAMES24 = ['Ваня', 'Маша', 'Петя', 'Оля', 'Саша', 'Дима', 'Катя', 'Лёша', 'Настя', 'Женя', 'Кирилл', 'Вера', 'Тимур', 'Аня', 'Гоша', 'Лиза', 'Миша', 'Соня', 'Артём', 'Полина', 'Рома', 'Юля', 'Глеб', 'Ника']
export const GROUPS8: string[][] = Array.from({ length: 8 }, (_, g) => NAMES24.filter((_, i) => (i * 7 + 3) % 8 === g))
export const rzGroups = (k: 4 | 8) => (k === 8 ? GROUPS8 : GROUPS)
