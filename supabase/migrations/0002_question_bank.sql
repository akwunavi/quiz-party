-- ═══ 0002: БАНК ВОПРОСОВ ═══
-- Банк — это обычный пакет со статусом 'bank'. Такое решение выбрано вместо
-- отдельной таблицы намеренно: банк получает всю уже готовую механику пакета
-- (раунды как рубрики, редактор вопросов, медиа, права доступа), и не нужно
-- дублировать половину кода ради нового хранилища.
--
-- Банк никогда не попадает в выбор пакета на игре: listPacks() отсеивает
-- статусы 'archived' и 'bank'.
--
-- Применить один раз в SQL-редакторе Supabase.

alter table packs drop constraint if exists packs_status_check;

alter table packs add constraint packs_status_check
  check (status in ('draft', 'ready', 'active', 'played', 'archived', 'bank'));
