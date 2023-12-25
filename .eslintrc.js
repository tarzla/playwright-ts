  /* eslint-env node */
  module.exports = {
    env: {
      node: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  };
    