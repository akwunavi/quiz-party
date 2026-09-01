// ═══ Автоподгон кегля: текст ВСЕГДА влезает в отведённое место ═══
//
// Почему не хватает одного CSS. Размеры заданы как clamp(min, Nvw, max) —
// это подгон под ШИРИНУ ЭКРАНА, а не под конкретный текст. Вопрос на 40
// знаков и вопрос на 440 при одном и том же экране занимают разную высоту,
// и рано или поздно длинный наезжает на шапку, на варианты или на кнопки
// ведущего. Классы len-m/len-l/len-xl — грубые ступени по числу знаков, они
// эту разницу только сглаживают, но не убирают: на ноутбуке 1366 и на панели
// 3840 одна и та же ступень ведёт себя по-разному.
//
// Здесь честный замер: кегль уменьшается, пока содержимое реально не влезет
// в родителя. Работает на любом экране и с любым текстом, включая те, что
// ведущий впишет завтра.
import { useLayoutEffect, useRef } from 'react'

/** Насколько мельче исходного кегля разрешено опускаться. Ниже 45% текст
 *  в баре уже не читается — лучше пусть строка обрежется, чем зал будет
 *  щуриться на «петит» во весь экран. */
const MIN_SCALE = 0.45

/**
 * Вписывает текст в родительский блок.
 * @param deps пересчитать при смене этих значений (обычно id вопроса)
 */
export function useFitText<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const box = el?.parentElement
    if (!el || !box) return

    let raf = 0
    const fit = () => {
      // Сброс: берём кегль, который назначил CSS для этого экрана, и от него
      // идём вниз. Без сброса подгон был бы «липким» — однажды уменьшив
      // текст, мы бы никогда не вернули его обратно при смене вопроса.
      el.style.fontSize = ''
      const base = parseFloat(getComputedStyle(el).fontSize)
      if (!base) return

      // Место, реально доступное тексту, — это внутренняя область рамки
      // МИНУС её собственные поля. Две ловушки, на которых подгон уже
      // спотыкался:
      //   1) `clientHeight` включает padding, и сравнение «высота текста ≤
      //      clientHeight» пропускало переполнение — подгон молча не работал;
      //   2) `scrollHeight` родителя у блока с полями и центрированием чуть
      //      больше `clientHeight` даже когда всё влезает — подгон, наоборот,
      //      ужимал короткий вопрос до минимума.
      // Поэтому меряем прямо: содержимое против доступной площади.
      const cs = getComputedStyle(box)
      const availH = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      const availW = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const fits = () => el.scrollHeight <= availH + 1 && el.scrollWidth <= availW + 1
      if (fits()) return

      // Двоичный поиск по масштабу: 8 шагов дают точность ~0.2% и не
      // мигают на экране (всё внутри одного кадра раскладки).
      let lo = MIN_SCALE, hi = 1
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2
        el.style.fontSize = `${base * mid}px`
        if (fits()) lo = mid; else hi = mid
      }
      el.style.fontSize = `${base * lo}px`
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(fit)
    }
    schedule()

    // Экран проектора не меняет размер посреди игры, но меняется КОНТЕНТ
    // рядом: приехала картинка, появились варианты — доступная высота стала
    // другой. ResizeObserver ловит и это, и разворот окна на репетиции.
    const ro = new ResizeObserver(schedule)
    ro.observe(box)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
