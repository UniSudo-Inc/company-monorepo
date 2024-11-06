import node from '@company/configs/eslint/node.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import jest from '@company/configs/eslint/jest.mjs';
import electron from '@company/configs/eslint/electron.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [...node, ...typescript, ...jest, ...electron];
