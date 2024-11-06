import drizzle from '@company/configs/eslint/drizzle.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import vitest from '@company/configs/eslint/vitest.mjs';
import node from '@company/configs/eslint/node.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [...node, ...typescript, ...vitest, ...drizzle];
