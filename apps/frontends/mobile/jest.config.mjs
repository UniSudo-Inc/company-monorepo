import { pathsToModuleNameMapper } from 'ts-jest';
import { mergeExtendedTsConfigOptions } from '@company/configs/helpers.mjs';

const tsconfig = mergeExtendedTsConfigOptions('tsconfig.spec.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  passWithNoTests: true,
  testTimeout: 120000,
  verbose: true,
  coverageDirectory: '<rootDir>/coverage',
  projects: [
    {
      displayName: 'frontends/mobile:unit',
      preset: 'jest-expo',
      transformIgnorePatterns: [
        'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg))',
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig }],
      },
      testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'],
      moduleFileExtensions: ['ts', 'tsx', 'js'],
      modulePaths: [`<rootDir>/${tsconfig.baseUrl}`],
      moduleNameMapper: {
        '^react$': '<rootDir>/node_modules/react',
        '^react-dom$': '<rootDir>/node_modules/react-dom',
        ...pathsToModuleNameMapper(tsconfig.paths ?? {}, {
          prefix: `<rootDir>/${tsconfig.baseUrl}`,
        }),
      },
    },
    {
      displayName: 'frontends/mobile:e2e',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/e2e/**/*.test.ts'],
      // reporters: ['detox/runners/jest/reporter'],
      globalSetup: 'detox/runners/jest/globalSetup',
      globalTeardown: 'detox/runners/jest/globalTeardown',
      testEnvironment: 'detox/runners/jest/testEnvironment',
    },
  ],
};

export default config;
