import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['e2e/functional/**/*.qa.spec.ts'],
  },
})
