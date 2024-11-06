/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    name: 'frontends/web',
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
