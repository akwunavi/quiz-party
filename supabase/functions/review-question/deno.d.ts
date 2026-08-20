// Заглушка типов для редактора.
//
// Edge Functions выполняются в Deno, а не в браузере: глобальный объект Deno
// там есть всегда. Но редактор в этом проекте настроен под фронтенд (lib: DOM),
// про Deno не знает и подчёркивает его красным. На выполнение это не влияет —
// файл нужен только чтобы редактор молчал и настоящие ошибки было видно.
declare const Deno: {
  env: { get(key: string): string | undefined }
  serve(handler: (req: Request) => Response | Promise<Response>): void
}
