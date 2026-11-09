// В автономной демо базы нет: настоящий клиент не нужен (и пишет предупреждение в консоль). Заглушка живёт только в сборке vite.demo.config.ts.
const stub: unknown = new Proxy(function () {}, { get: (_t, k) => (k === 'then' ? undefined : stub), apply: () => stub })
export const createClient = () => stub
export type SupabaseClient = unknown
