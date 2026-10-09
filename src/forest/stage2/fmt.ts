// Числа и подписи «Своей игры»/«Угадай мелодию»: «1,5» вместо «1.5», «балл/балла/баллов».
export const fmtVal = (v: number) => String(v).replace('.', ',')
/** Длинный текст ответа — кегль меньше, а не обрезка: правильный ответ на проекторе обязан читаться целиком. */
export const lenCls = (s: string | null | undefined) => { const n = (s ?? '').length; return n > 110 ? ' xlong' : n > 60 ? ' long' : '' }
export const balla =(v: number) => (v === 1 ? 'балл' : v < 1 || v % 1 ? 'балла' : v >= 2 && v <= 4 ? 'балла' : 'баллов')
