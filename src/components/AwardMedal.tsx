import type { ThemeKey } from '../types/quiz'

// ═══ МЕДАЛЬ НА ЭКРАНЕ НАГРАЖДЕНИЯ ═══
//
// Раньше везде висел один и тот же эмодзи-медаль (🥇🥈🥉) — при трёх темах
// одинаково, без всякой связи с киберпанком или ГП. Экран награждения (кто
// его окружает — фейерверк, титул, кнопка «дальше») НЕ меняем, меняется
// только сам символ медали внутри .fin-award-medal.
//
// НГ намеренно не тронута — эмодзи-медаль там не обсуждали и трогать не
// просили.

const EMOJI = ['🥇', '🥈', '🥉'] as const

export function AwardMedal({ theme, place }: { theme: ThemeKey; place: number }) {
  if (theme === 'classic') return <CyberMedal place={place} />
  if (theme === 'potter') return <MerlinMedal place={place} />
  return <span className="award-emoji">{EMOJI[place - 1] ?? EMOJI[2]}</span>
}

/** Киберпанк: неоновый шестигранный жетон — тот же клип-путь, что у плиток
 *  «Своей игры»/мелодии (.jp-tile/.mel-tile), чтобы медаль выглядела частью
 *  той же темы, а не отдельно нарисованной деталью. Ободок цвета места,
 *  орбитальная искра — приём из .tm-orbit/.tm-spark таймера. */
function CyberMedal({ place }: { place: number }) {
  return (
    <div className={`award-hex p${place}`} aria-hidden="true">
      <span className="ah-orbit" />
      <span className="ah-face"><b>{place}</b></span>
    </div>
  )
}

/** ГП: «Орден Мерлина» — канонiчная награда волшебного мира (золотой
 *  медальон на ленте, класс определяется цветом ленты: I — зелёная,
 *  II — фиолетовая, III — белая). Медальон и лента — чистый CSS, без
 *  картинок, тем же приёмом, что восковая печать у .mel-tile/.jp-tile. */
function MerlinMedal({ place }: { place: number }) {
  return (
    <div className={`award-merlin p${place}`} aria-hidden="true">
      <span className="am-ribbon" />
      <span className="am-disc"><span className="am-shine" /><b>{place}</b></span>
    </div>
  )
}
