-- Приватные пакеты: видны только владельцам
alter table packs add column if not exists is_private boolean not null default false;
