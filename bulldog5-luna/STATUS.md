# Луна (№5) — статус (08.11.2026)
Kling: потрачено 224 кредита (RACE_STAND 20, RUN 30, партия из пяти 174); баланс **1992**. Подробно — `stage6_batch/REPORT.md`, `stage7_fix/`.

| состояние | статус | где |
|---|---|---|
| FRONT_STAND | рабочая | `stage2/front_stand/` |
| IDLE A (B — запасной) | рабочий | `stage2/idle/`, `stage2/alpha/` |
| SELECTED | рабочий | `stage2/alpha/` |
| RETURN_TO_IDLE | **кандидат** (пользователь доволен), тон выровнен | `stage6_batch/alpha/` |
| RACE_STAND G1 | рабочая (не финальная) | `stage4_race_stand/` |
| START | **кандидат**: из RUN G1, #18–#59 + цикл, lead 7 — проверено валидатором и 2000 гонками | `stage6_batch/contract/` |
| RUN | принят: цикл #60–#71 | `stage5_run/` |
| STOP / FINISH | **кандидат** (пользователь доволен): вырезан один шаг, хвост 22, shift-массив | `stage6_batch/` |
| BUTTERFLY | **кандидат** (пользователь доволен): #18–#90 | `stage6_batch/` |
| ROLL | **кандидат после исправления**: реверс R69 без кадров с деформацией; вопрос «подъём задом вперёд» — на просмотр | `stage7_fix/roll/` |
| SNIFF_PEE + RETURN | **проблема**: лапа назад (#99–#177); нюхание и возврат годны; ТЗ на вставку ≈ 24 кредита, не запускалась | `stage7_fix/sniff/` |

Манифест-черновик — `MANIFEST.json`; черновик контракта V3 — `stage6_batch/contract/luna.contract.draft.json` (валидатор P3: ok).
Race V3, другие собаки, арена Codex и production не менялись; merge и deploy не было.
