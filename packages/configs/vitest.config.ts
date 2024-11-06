/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'packages/configs',
    passWithNoTests: true,
    environment: 'node',
    coverage: {
      provider: 'istanbul',
    },
  },
});
