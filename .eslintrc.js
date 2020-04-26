module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'quotes': ['warn', 'single'],
    '@typescript-eslint/no-implicit-any': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off', { allowExpression: true }],
    '@typescript-eslint/no-empty-function': 'off'
  }
};
