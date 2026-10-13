# Bulldog №3 — исследовательский пакет

Первый этап: инвентаризация и оценка существующего RUN. Второй этап: диагностический контактный лист и два 12-кратных повтора из существующих кадров. **Новые Kling-генерации не создавались.** Production, Bulldog №1, Bulldog №4 и модель V3 не менялись.

Читайте [VISUAL_ACCEPTANCE.md](VISUAL_ACCEPTANCE.md) и его [контактный лист и MP4](reviews/run-acceptance/), затем [STATUS.md](STATUS.md), [RUN_AUDIT.md](RUN_AUDIT.md), [SEARCH_SCOPE.md](SEARCH_SCOPE.md), [DECISIONS.md](DECISIONS.md), [KNOWN_ISSUES.md](KNOWN_ISSUES.md), [PRODUCTION_PLAN.md](PRODUCTION_PLAN.md), [KLING_LOG.md](KLING_LOG.md), [REJECTED_VARIANTS.md](REJECTED_VARIANTS.md). Машиночитаемый реестр, связи версий и SHA-256 находятся в [MANIFEST.json](MANIFEST.json). Полные исторические кадры и маски остаются в `docs/bulldog-race/ASSET_MANIFEST.json`; здесь сохранены точные указатели, без повторной записи больших файлов.

Исходный RUN и обе alpha-версии находятся в Git history. Для получения файла пользуйтесь соответствующим `git show <commit>:<path>` из манифеста или `docs/bulldog-race/tools/restore_asset.py <asset-id> <output>`. Второй способ сверяет SHA-256 и не перезаписывает существующий файл. Не трактуйте технический результат alpha-v2 как художественное утверждение всей анимационной библиотеки.

Параллельная область `bulldog1-frenk/alpha_pipeline/` прочитана как **общий** инструмент. Её исходники и настройки здесь не копировались и не менялись.
