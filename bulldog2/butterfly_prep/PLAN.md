# BUTTERFLY Зефира — план одной генерации (16.10.2026). Kling не запускался

## Есть ли материал
**Нет.** Исходники Зефира — RUN (бег сбоку), IDLE и SELECTED. IDLE и SELECTED сняты **анфас** другим планом (FRONT_STAND), в гоночный боковой ракурс не встают. Слежения взглядом за чем-то сбоку нет ни в одном кадре. Нужна генерация.

## Схема — как у Фрэнка (BUTTERFLY v1 принят с первой попытки, лучший стык из всех клипов Фрэнка: IoU 0,997)
* **first = last = утверждённая RACE_STAND #30**, исходный кадр без сдвига (`KLING_FIRST_AND_LAST_RACE_STAND_RUN30_1276.png`, SHA-256 80e017da…37f1; тот же, что для ROLL v3). Клип начинается и кончается в точке стойки, сдвиг спрайта тот же, что у RACE_STAND.
* **Бабочки в видео нет**, её рисует игра по траектории взгляда. У Фрэнка Kling всё равно дорисовал мелкое насекомое — его вырезали при alpha. Это ожидаемый риск, а не брак.
* Окно BUTTERFLY в V3 — 121 кадр; START B у Зефира с lead 0, значит клип ≤ 121 кадра. 5 с = 121 кадр: помещается целиком, хвостовую статику можно обрезать (оба конца — стойка).

## Параметры
`kling-video-v3_0`, image_to_video, first_image = tail_image = #30, 5 с, 720p, 1 видео, prefer_multi_shots false, без звука. **30 кредитов.** Баланс сейчас 2828.

## Промпт
Принятый промпт Фрэнка (`bulldog1-frenk/butterfly_v1/prompt_sent.txt`), заменены только внешность и ракурс: белый, розовые уши и нос, боковой вид вправо, как стойка #30. Ничего про зубы. Выражение «playful, delighted, curious» оставлено: в ROLL v3 довольная морда получилась без оскала.
```
A white French bulldog with big upright pink ears, a pink nose and expressive round eyes stands on all four paws in a fixed side view facing right, exactly as in the first frame. He notices a tiny unseen fluttering movement just in front of him. His ears perk up, his eyes grow wide with curiosity, and he gently raises his head to follow it.
He follows the imaginary movement with his eyes, ears, and small, natural turns of his head, looking upward and slightly forward, then a little lower near his nose, and upward again. His expression is playful, delighted, and curious. His compact body stays balanced in the same position while his head and neck move naturally.
Once, he gently raises his near front paw as if trying to catch the little fluttering thing, then carefully places that paw back on exactly the same spot. His other three paws remain planted. His ears twitch and his nose wiggles as he keeps watching with bright, curious eyes.
Toward the end, his attention settles. He lowers his raised head, relaxes his ears, and naturally returns to the exact same calm standing pose shown in the first frame. The final pose matches the original standing reference.
The camera remains completely fixed, with the same framing and proportions throughout. A plain seamless studio background and floor, soft contact shadow, and consistent studio lighting. The scene shows only the same white French bulldog, with his original fur color, facial features and body proportions.
```
Отличие от Фрэнка: «plain seamless light-gray studio background» → «plain seamless studio background» (фон Зефира тёмно-серый с градиентом, «light-gray» тянул бы фон в другую сторону).

## Приёмка (как у Фрэнка)
1. Первый и последний кадры = #30 (разница ≤ 3/255), центр и линия лап ≤ 2 px.
2. Лапы на месте; одна передняя может подняться и вернуться на то же место.
3. Глаза открыты, нет злого лица и оскала; окрас без дрейфа.
4. Посторонние предметы: дорисованное насекомое допустимо, если отделимо от морды при alpha.
5. Взгляд и поворот головы читаются в игровом масштабе.
6. ≤ 121 кадра после обрезки статики.
Если нарушены пункты 1–3 — клип не берём, повтор только по согласованию.
