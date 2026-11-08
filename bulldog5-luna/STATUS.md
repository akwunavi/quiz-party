# Луна (№5) — статус (08.11.2026)
**Внешность решена: как у существующего №5** (белая с чёрно-серыми пятнами, тёмное пятно вокруг глаза, тёмная маска). Исходники IDLE и SELECTED получены от пользователя и сохранены. Kling не запускался; ни один клип ещё не обработан и не утверждён.

| состояние | что есть | статус |
|---|---|---|
| FRONT_STAND | f0 исходников (общий для IDLE, SELECTED, RUN v1) — `sources/DOG5_FRONT_STAND_candidate_f0_1276.png` | кандидат, ждёт приёмки |
| IDLE | `sources/DOG5_IDLE_kling_original.mp4` | исходник; не замыкается — нужна сборка цикла |
| SELECTED | `sources/DOG5_SELECTED_kling_original.mp4` | исходник; кончается не в стойке, уши у верха кадра f72–f77 |
| RETURN_TO_IDLE | — | нужен (генерация по согласованию) |
| RUN | `sources/DOG5_RUN_vs2_kling_original.mp4` #41–120 + старая alpha v2 | кандидат; цикл не выбран |
| RACE_STAND, START, STOP / FINISH, SNIFF_PEE + RETURN, ROLL, BUTTERFLY | — | создавать |

Подробно — `sources/README.md`, `stage1/AUDIT.md`, `stage1/PRODUCTION_PLAN.md` (оценка Kling после обновления ≈ 260 минимум, ≈ 400–500 реалистично).

Race V3, библиотеки №1–№4, новогодняя арена Codex и production не менялись; merge и deploy не было.
