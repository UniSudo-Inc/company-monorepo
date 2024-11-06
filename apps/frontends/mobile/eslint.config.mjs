import node from '@company/configs/eslint/node.mjs';
import react from '@company/configs/eslint/react.mjs';
import typescript from '@company/configs/eslint/typescript.mjs';
import jest from '@company/configs/eslint/jest.mjs';
import reactTest from '@company/configs/eslint/react-test.mjs';
import expo from '@company/configs/eslint/expo.mjs';
import detox from '@company/configs/eslint/detox.mjs';
import reactNative from '@company/configs/eslint/react-native.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [...node, ...typescript, ...jest, ...react, ...reactNative, ...reactTest, ...detox, ...expo];
