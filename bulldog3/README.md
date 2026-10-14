# Bulldog №3 — исследовательский пакет

Первый этап: инвентаризация и оценка существующего RUN. Второй этап: диагностический контактный лист и два 12-кратных повтора из существующих кадров. **Новые Kling-генерации не создавались.** Production, Bulldog №1, Bulldog №4 и модель V3 не менялись.

**Дополнительные материалы получены от пользователя позднее исторического поиска.** Четыре оригинальных вложения без изменений сохранены в [assets/incoming/](assets/incoming/). IDLE и SELECTED открыли новый этап исследования; присланные RUN и alpha оказались побайтными копиями исторических source RUN и alpha-v1. Точные параметры и выводы — в [ASSET_ACCEPTANCE.md](ASSET_ACCEPTANCE.md), происхождение — в [INPUT_INTAKE.md](INPUT_INTAKE.md).

Читайте [RACE_STAND_PLAN.md](RACE_STAND_PLAN.md) с выбранным боковым референсом и prompt, [ASSET_ACCEPTANCE.md](ASSET_ACCEPTANCE.md) со сравнением IDLE/SELECTED/RUN и [VISUAL_ACCEPTANCE.md](VISUAL_ACCEPTANCE.md) с проверкой RUN, затем [STATUS.md](STATUS.md), [RUN_AUDIT.md](RUN_AUDIT.md), [SEARCH_SCOPE.md](SEARCH_SCOPE.md), [DECISIONS.md](DECISIONS.md), [KNOWN_ISSUES.md](KNOWN_ISSUES.md), [PRODUCTION_PLAN.md](PRODUCTION_PLAN.md), [KLING_LOG.md](KLING_LOG.md), [REJECTED_VARIANTS.md](REJECTED_VARIANTS.md). Машиночитаемый реестр, связи версий и SHA-256 находятся в [MANIFEST.json](MANIFEST.json). Полные исторические кадры и маски остаются в `docs/bulldog-race/ASSET_MANIFEST.json`; здесь сохранены точные указатели, без повторной записи больших файлов.

Исходный RUN и обе alpha-версии находятся в Git history. Для получения файла пользуйтесь соответствующим `git show <commit>:<path>` из манифеста или `docs/bulldog-race/tools/restore_asset.py <asset-id> <output>`. Второй способ сверяет SHA-256 и не перезаписывает существующий файл. Не трактуйте технический результат alpha-v2 как художественное утверждение всей анимационной библиотеки.

Параллельная область `bulldog1-frenk/alpha_pipeline/` прочитана как **общий** инструмент. Её исходники и настройки здесь не копировались и не менялись.
