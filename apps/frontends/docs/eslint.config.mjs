import react from '@company/configs/eslint/react.mjs';
import browser from '@company/configs/eslint/browser.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import docusaurus from '@company/configs/eslint/docusaurus.mjs';
import vitest from '@company/configs/eslint/vitest.mjs';
import reactTest from '@company/configs/eslint/react-test.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [...browser, ...typescript, ...vitest, ...react, ...reactTest, ...docusaurus];
