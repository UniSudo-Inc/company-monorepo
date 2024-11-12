import { configs as astroConfigs } from 'eslint-plugin-astro';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...astroConfigs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    rules: {
      'sonarjs/jsx-no-useless-fragment': 'off',
      'sonarjs/no-unknown-property': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
