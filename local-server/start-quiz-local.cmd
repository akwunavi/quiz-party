@echo off
REM ═══ Quiz Party — запуск локального сервера бара (Windows) ═══
REM Двойной клик по этому файлу. Окно, которое откроется, НЕ ЗАКРЫВАТЬ,
REM пока идёт игра — закрытие окна останавливает сервер.
chcp 65001 >nul
cd /d "%~dp0"

if not exist "node\node.exe" (
  echo.
  echo ОШИБКА: не найден node\node.exe
  echo Смотри local-server\README.md — раздел "Один раз перед первой игрой":
  echo нужно один раз скачать портативный Node.js и распаковать его в папку node\.
  echo.
  pause
  exit /b 1
)

if not exist "app\index.html" (
  echo.
  echo ОШИБКА: в папке app\ нет собранного приложения (файла index.html).
  echo Смотри local-server\README.md — раздел "Один раз перед первой игрой".
  echo.
  pause
  exit /b 1
)

echo Запускаю локальный сервер Quiz Party на порту 7331...
echo.
"node\node.exe" "server.mjs"

echo.
echo Сервер остановлен. Если это произошло неожиданно (не ты закрыл(а) окно) —
echo прочитай сообщение выше: обычно это "порт занят" (см. README).
pause
