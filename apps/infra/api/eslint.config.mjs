import cdk from '@company/configs/eslint/cdk.mjs';
import node from '@company/configs/eslint/node.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import vitest from '@company/configs/eslint/vitest.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [...node, ...typescript, ...vitest, ...cdk];
