/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { defaultExclude } from 'vitest/config';

export default getViteConfig({
  test: {
    name: 'frontends/website',
    passWithNoTests: true,
    exclude: defaultExclude.concat(['**/e2e/**']),
    environment: 'node',
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
