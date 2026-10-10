// Фаза таймера по оставшимся секундам — общая для сцены вопроса и экранов Леса (без привязки к макетным данным)
export type Phase = 'normal' | 'warning' | 'zero'
export const phaseOf = (n: number): Phase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
