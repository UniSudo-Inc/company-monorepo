import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts, { configs as tsConfigs } from 'typescript-eslint';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import typescriptRules from './rules/typescript.mjs';
import typescriptExtensionRules from './rules/typescript-extension.mjs';
import typescriptImportRules from './rules/typescript-import.mjs';
import tsDocRules from './rules/tsdoc.mjs';
import { TYPESCRIPT_FILES_ESM } from './constants.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import("eslint").Linter.Config[]} */
export default ts.config({
  files: TYPESCRIPT_FILES_ESM,
  extends: [
    ...tsConfigs.recommendedTypeChecked,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    ...fixupConfigRules(compat.config(importPlugin.configs.typescript)),
    prettierConfig,
    typescriptRules,
    typescriptExtensionRules,
    typescriptImportRules,
    tsDocRules,
  ],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      projectService: true,
    },
  },
});
