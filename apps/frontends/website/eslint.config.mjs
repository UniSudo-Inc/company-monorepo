import browser from '@company/configs/eslint/browser.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import vitest from '@company/configs/eslint/vitest.mjs';
import astro from '@company/configs/eslint/astro.mjs';
import playwright from '@company/configs/eslint/playwright.mjs';
import domTest from '@company/configs/eslint/dom-test.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...browser,
  ...typescript,
  ...vitest,
  ...astro,
  ...domTest,
  ...playwright,
  {
    rules: {
      'sonarjs/no-unknown-property': 'off',
    },
  },
];
