-- Состояние раунда «Угадай мелодию» (стадии аукциона)
alter table game_state add column if not exists melody jsonb not null default '{}';
