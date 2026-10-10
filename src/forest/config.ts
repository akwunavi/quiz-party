// ═══ Тема «Волшебный лес» (ключ `enchanted_forest`) ═══
// Ключ с подчёркиванием — по образцу `ny_book`/`ny_home`; Магия (`potter`) и остальные темы не затронуты.
// Резервная навигация проектора — тот же флаг, что у новогодних тем (`?nav=1` или localStorage `qp-ny-nav`).
export const FOREST_THEME = 'enchanted_forest' as const
export const isForestTheme = (t: string | undefined | null): t is typeof FOREST_THEME => t === FOREST_THEME
