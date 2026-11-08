# Луна — техническое задание на одну генерацию RETURN_TO_IDLE (НЕ запускалась)
Запуск — только по отдельному слову пользователя. Почему без генерации не обойтись — `RETURN_FREE_CHECK.md`.

## Входы
| | файл | что это |
|---|---|---|
| first | `KLING_FIRST_SELECTED_s120_1276.png` | последний кадр утверждаемого SELECTED (s120), без изменений |
| tail | `KLING_LAST_FRONT_STAND_f0_1276.png` | кандидат FRONT_STAND = f0 IDLE / SELECTED / RUN, без изменений |

Оба кадра — одна студия, одна камера, 1276×720; тон совпадает (расхождение ≤ 1,3 / 255).

## Параметры
`kling-video-v3_0`, 5 с, 720p, одна сцена (`prefer_multi_shots = false`), без звука (`enable_audio = false`), first + tail. Ориентир цены — 30 кредитов (по журналам Пупса, Фрэнка и Зефира).

## Промпт (только то, что должно быть — без перечня запретов)
> The same cute cartoon French bulldog with a white coat and black patches keeps standing on all four paws on the same spot, facing the camera, in the same plain gray studio with a static camera. Her wide happy grin slowly softens: she closes her mouth into a calm, sweet expression, gently lifts her head and looks up at the camera with big round eyes, settling into exactly the calm standing pose of the last frame. Paws stay planted, the body only breathes softly. Smooth, slow, natural motion.

## Приёмка
* первый кадр совпадает с s120, последний — с FRONT_STAND (разница ≤ 1,5 / 255, лапы ±1 px);
* лапы стоят, корпус не прыгает и не разворачивается; внешность и пятна те же;
* мимика: улыбка гаснет естественно, без «резиновой» морды, глаза в конце открыты и смотрят как в f0;
* игровой отрезок — весь клип или его часть до первого кадра, совпадающего с f0 (без статичной паузы); alpha тем же конвейером, тон — к FRONT_STAND;
* после приёмки — лаборатория полной цепочки IDLE → ворота → SELECTED → RETURN_TO_IDLE → IDLE.

Если результат не годится — сначала разбор промпта, повтор только по согласованию.
