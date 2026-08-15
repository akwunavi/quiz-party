-- ═══ 0006: управление редакторами из UI + разграничение прав ═══
-- Модель прав:
--   owner        — всё (пакеты, редакторы, приватность).
--   editor + can_edit_all = true  — правит любые НЕприватные пакеты.
--   editor + can_edit_all = false — правит только пакеты, созданные им самим.
-- Владелец добавляет/правит/удаляет редакторов прямо в редакторе (вкладка
-- «Редакторы»), без SQL.

alter table editor_roles add column if not exists email text not null default '';
alter table editor_roles add column if not exists can_edit_all boolean not null default true;
alter table packs add column if not exists created_by uuid default auth.uid();

-- у существующих пакетов created_by пуст — это «общие» пакеты,
-- их правит editor с can_edit_all (или владелец)

create or replace function can_edit_all() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select can_edit_all from editor_roles where user_id = auth.uid()), false);
$$;

-- editor_roles: владелец управляет всеми, редактор видит только себя
drop policy if exists er_select on editor_roles;
create policy er_select on editor_roles for select
  using (user_id = auth.uid() or is_owner());
drop policy if exists er_insert on editor_roles;
create policy er_insert on editor_roles for insert with check (is_owner());
drop policy if exists er_update on editor_roles;
create policy er_update on editor_roles for update
  using (is_owner()) with check (is_owner());
drop policy if exists er_delete on editor_roles;
create policy er_delete on editor_roles for delete
  using (is_owner() and user_id <> auth.uid());  -- себя не удалить

-- packs: право правки учитывает can_edit_all/created_by
drop policy if exists packs_update on packs;
create policy packs_update on packs for update
  using (is_editor() and (not is_private or is_owner())
    and (is_owner() or can_edit_all() or created_by = auth.uid()))
  with check (is_editor());
drop policy if exists packs_delete on packs;
create policy packs_delete on packs for delete
  using (is_editor() and (not is_private or is_owner())
    and (is_owner() or can_edit_all() or created_by = auth.uid()));

-- раунды/вопросы наследуют право от пакета
drop policy if exists rounds_write on pack_rounds;
create policy rounds_write on pack_rounds for all
  using (is_editor() and exists (select 1 from packs p where p.id = pack_id
    and (not p.is_private or is_owner())
    and (is_owner() or can_edit_all() or p.created_by = auth.uid())))
  with check (is_editor());
drop policy if exists questions_write on pack_questions;
create policy questions_write on pack_questions for all
  using (is_editor() and exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id and (not p.is_private or is_owner())
    and (is_owner() or can_edit_all() or p.created_by = auth.uid())))
  with check (is_editor());
