/// <reference types="vitest" />
import { defineWorkersConfig, type WorkersUserConfigExport } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  test: {
    name: 'backends/users',
    passWithNoTests: true,
    environment: 'node',
    globals: true,
    typecheck: {
      tsconfig: './tsconfig.spec.json',
    },
    coverage: {
      provider: 'istanbul',
    },
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
      },
    },
  },
}) satisfies WorkersUserConfigExport;
