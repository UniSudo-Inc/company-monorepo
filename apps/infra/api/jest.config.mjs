/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  passWithNoTests: true,
  verbose: true,
  testTimeout: 120000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: '<rootDir>/coverage',
  projects: [
    {
      displayName: 'infra/api:unit',
      testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'],
      transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
    {
      displayName: 'infra/api:integration',
      testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).ts?(x)'],
      transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tests/tsconfig.json' }],
      },
    },
  ],
};

export default config;
