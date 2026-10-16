# STOP Зефира: почему три попытки дали одно и то же, и варианты (16.10.2026)
Kling не запускался.

## Что общее у трёх неудач (факты)
| Попытка | Первый кадр | Что сделал Kling после торможения |
|---|---|---|
| STOP v1 | #97 | лёг на живот, встал |
| STOP v2 | #97 | откинулся назад (лапа на весу), вернулся шагами |
| bridge v1 | k40 | присел ниже, замер, откинулся назад, полупосадка, вернулся шагами |

* Нужное движение после торможения короткое, ≈ 0,3–0,5 с. Остальное время из 3 с Kling каждый раз заполнял лишним действием.
* У Фрэнка время «съел» бег на месте (1,5 с), а в конце он стоял неподвижно 0,85 с.
* **Лапы k40 и #30 почти на тех же местах** (`PAWS_k38_k40_vs_RACE_STAND30_ruler.png`): задние совпадают в пределах ≈ 10 px, передние у #30 на ≈ 40 px ближе к корпусу. Корпус почти на месте, отличаются голова (у k40 внизу) и наклон тела. Значит, для перехода в #30 **шаги не нужны**.
* В промпте связки было «gathers his paws neatly under the body». Это прямая просьба переставить лапы, то есть шагать. Kling шагал.

## Варианты
**1. Связка задом наперёд (рекомендую).** 18 кредитов.
* first = стойка #30 (+44), last = k40. Просим простое действие из стойки: «опустить голову и податься грудью вперёд, лапы стоят на месте». В монтаже ролик проигрывается в обратную сторону — получается «после торможения поднял голову и выпрямился».
* Почему может сработать:
  * со стойки нет инерции и бега на месте;
  * «опустить голову» — одно короткое действие, как SNIFF у Фрэнка, который получился;
  * лапы переставлять не надо.
* Риски:
  * обратная запись выдаёт себя, если в ролике есть инерционные детали (уши хлопают, складки колышутся) — проверю покадрово;
  * Kling всё равно заполнит 3 с: например, опустит голову и замрёт. Замирание в обратную сторону — пауза перед подъёмом, её режем.
```
The same white French bulldog, side view, facing right, standing still on all four paws. All four paws stay planted on the floor exactly where they are for the whole clip; he does not take a single step. He slowly lowers his head and leans his chest forward over his front legs, bending his front legs a little, until he matches the last frame, then holds that pose. Static camera, same place in the frame, same size, same character, lighting and background.

No steps, no walking, no running, no sitting, no lying down.
```

**2. Прямая связка с «лапы на месте».** 18 кредитов.
* first = k40, last = #30. Промпт описывает только подъём головы и выпрямление корпуса, лапы не двигаются.
* Риск выше, чем у 1: k40 — кадр из движения (голова вниз, пасть приоткрыта), Kling может продолжить торможение (в bridge v1 он сначала присел ещё ниже).
```
The same white French bulldog, side view, facing right, just after braking, standing on all four paws. All four paws stay planted on the floor exactly where they are for the whole clip; he does not take a single step. He calmly raises his head and chest and straightens his body over his legs until he matches the last frame, then stays still. Static camera, same place in the frame, same size, same character, lighting and background.

No steps, no walking backward or forward, no rearing up, no sitting, no lying down.
```

**3. Kling 4.0 с промежуточными кадрами.**
* first = #97, keyframe_1 = k36, keyframe_2 = k40, tail = #30. Модель обязана пройти через наше торможение.
* Но отрезок k40 → #30 остаётся свободным, и там может повториться то же самое.
* На наших собаках модель не проверялась, цену заранее не знаю. Не первым.

**4. Новая финальная стойка (как у Фрэнка: высокая, на прямых лапах).**
* Меняет утверждённую RACE_STAND #30 и тянет за собой переделку START B. Только если 1 и 2 не помогут.

Отклонено: обратная запись готового разгона RUN #30 → … — при обратной записи галопа лапы толкают не в ту сторону, это видно.

## Как будет выглядеть итог при удаче варианта 1 или 2
`RUN #89–#96 → k27 → k31…k40 → связка (≈ 8–12 кадров подъёма) → #30`. Ожидаемо 30–34 кадра, остаток окна 37 — стойка.
