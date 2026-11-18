// Иконки панели редактора компоновки: inline SVG без внешних библиотек (24×24, штрих currentColor).
const P = {
  save: 'M5 3h11l3 3v15H5z M8 3v6h8V3 M8 21v-7h8v7',
  cancel: 'M6 6l12 12 M18 6L6 18',
  reset: 'M4 12a8 8 0 1 0 3-6.2 M4 4v5h5',
  up: 'M6 15l6-6 6 6',
  down: 'M6 9l6 6 6-6',
  dock: 'M4 4h16v16H4z M4 15h16',
  alignLeft: 'M4 3v18 M8 7h12 M8 14h7',
  alignCenter: 'M12 3v18 M5 7h14 M8 14h8',
  alignRight: 'M20 3v18 M4 7h12 M9 14h7',
  alignTop: 'M3 4h18 M7 8v12 M14 8v7',
  alignMiddle: 'M3 12h18 M7 5v14 M14 8v8',
  alignBottom: 'M3 20h18 M7 4v12 M14 9v7',
  sameW: 'M4 6v12 M20 6v12 M4 12h16 M4 12l3-3 M4 12l3 3 M20 12l-3-3 M20 12l-3 3',
  sameH: 'M6 4h12 M6 20h12 M12 4v16 M12 4l-3 3 M12 4l3 3 M12 20l-3-3 M12 20l3-3',
  distH: 'M4 3v18 M20 3v18 M10 8h4v8h-4z',
  distV: 'M3 4h18 M3 20h18 M8 10h8v4H8z',
  tiles: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
  timer: 'M12 8v5l3 2 M12 4a8 8 0 1 0 .01 0 M10 2h4',
  text: 'M4 6h16 M4 12h16 M4 18h10',
  teams: 'M9 7a3 3 0 1 0 .01 0 M3 20c0-4 3-6 6-6s6 2 6 6 M17 8a2.5 2.5 0 1 0 .01 0 M17 14c2.5 0 4 1.7 4 5',
  help: 'M9 9a3 3 0 1 1 4 2.8c-.9.5-1 1-1 2 M12 18v.01',
  warn: 'M12 4l9 16H3z M12 10v4 M12 17v.01',
} as const
export type IconName = keyof typeof P

export function Ic({ n }: { n: IconName }) {
  return <svg className="lay-ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={P[n]} /></svg>
}
