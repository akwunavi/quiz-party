-- Общие настройки пакета: фоновая музыка, дефолты таймера/правок/показа ответов
alter table packs add column if not exists settings jsonb not null default '{}';
