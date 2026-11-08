# Луна (№5) — статус (08.11.2026)
Kling: потрачено 248 кредитов (RACE_STAND 20, RUN 30, партия из пяти 174, вставка SNIFF 24); баланс **1968**. Подробно — `stage6_batch/REPORT.md`, `stage7_fix/`.

| состояние | статус | где |
|---|---|---|
| FRONT_STAND | рабочая | `stage2/front_stand/` |
| IDLE A (B — запасной) | рабочий | `stage2/idle/`, `stage2/alpha/` |
| SELECTED | рабочий | `stage2/alpha/` |
| RETURN_TO_IDLE | **принят** в текущем виде, тон выровнен | `stage6_batch/alpha/` |
| RACE_STAND G1 | рабочая (не финальная) | `stage4_race_stand/` |
| START | **принят** в текущем виде: из RUN G1, #18–#59 + цикл, lead 7 — проверено валидатором и 2000 гонками | `stage6_batch/contract/` |
| RUN | принят: цикл #60–#71 | `stage5_run/` |
| STOP / FINISH | **принят** в текущем виде: вырезан один шаг, хвост 22, shift-массив | `stage6_batch/` |
| BUTTERFLY | **принят** в текущем виде: #18–#90 | `stage6_batch/` |
| ROLL | **утверждён финальным**: реверс R69 (#6→#69→#24, 109 кадров) | `stage7_fix/roll/` |
| SNIFF_PEE + RETURN | **проблема остаётся**: вставка G1 (24 кредита) снова дала лапу назад; нюхание #0–#93 и возврат #178–#240 годны; варианты — `stage7_fix/sniff/INSERT_G1_RESULT.md` | `stage7_fix/sniff/` |

Манифест-черновик — `MANIFEST.json`; черновик контракта V3 — `stage6_batch/contract/luna.contract.draft.json` (валидатор P3: ok).
Race V3, другие собаки, арена Codex и production не менялись; merge и deploy не было.
