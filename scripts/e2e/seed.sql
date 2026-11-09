-- Тестовый засев (ТОЛЬКО тестовая база docker): редактор, пакет «Скачки + обычный раунд», комната в фазе вопроса раунда-гонки.
insert into editor_roles(user_id, role, display_name, email) select id, 'owner', 'E2E ведущий', email from auth.users where email = 'host@e2e.test' on conflict do nothing;
delete from packs where name = 'E2E Скачки';
insert into packs(id, name, status, theme, settings, is_private) values ('00000000-0000-0000-0000-0000000000a1', 'E2E Скачки', 'ready', 'classic', '{"play_mode":"online"}', false);
insert into pack_rounds(id, pack_id, position, mechanic, title_lines, timer_seconds, settings, status, answers_reveal) values
 ('00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000a1', 0, 'race', '["СКАЧКИ БУЛЬДОГОВ"]', 0, '{}', 'ready', 'after_question'),
 ('00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000a1', 1, 'standard', '["ОБЫЧНЫЙ РАУНД"]', 60, '{}', 'ready', 'after_question'),
 ('00000000-0000-0000-0000-0000000000b3', '00000000-0000-0000-0000-0000000000a1', 2, 'race', '["СКАЧКИ 2"]', 0, '{}', 'ready', 'after_question');
insert into pack_questions(id, round_id, position, question_text, answer, status) values
 ('00000000-0000-0000-0000-0000000000c1', '00000000-0000-0000-0000-0000000000b2', 0, 'Сколько будет 6×7?', '{"mode":"free_text","correct":"42","display":"42"}', 'ready'),
 ('00000000-0000-0000-0000-0000000000c2', '00000000-0000-0000-0000-0000000000b2', 1, 'Столица Франции?', '{"mode":"free_text","correct":"Париж","display":"Париж"}', 'ready');
delete from game_sessions where id = '00000000-0000-0000-0000-0000000000d1';
insert into game_sessions(id, name, game_id, pack_id, phase, round_number, question_index, melody, created_by)
 select '00000000-0000-0000-0000-0000000000d1', 'E2E комната', '00000000-0000-0000-0000-0000000000e1', '00000000-0000-0000-0000-0000000000a1', 'question', 0, 0, '{}', id from auth.users where email = 'host@e2e.test';
-- вторая, независимая комната (для параллельных проверок без браузеров)
delete from game_sessions where id = '00000000-0000-0000-0000-0000000000d2';
insert into game_sessions(id, name, game_id, pack_id, phase, round_number, question_index, melody, created_by)
 select '00000000-0000-0000-0000-0000000000d2', 'E2E параллельная', '00000000-0000-0000-0000-0000000000e2', '00000000-0000-0000-0000-0000000000a1', 'question', 2, 0, '{}', id from auth.users where email = 'host@e2e.test';
