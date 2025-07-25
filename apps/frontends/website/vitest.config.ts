/// <reference types="vitest" />
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'frontends/website',
    passWithNoTests: true,
    exclude: defaultExclude.concat(['**/e2e/**']),
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tsconfig.spec.json',
    },
    coverage: {
      provider: 'istanbul',
    },
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
