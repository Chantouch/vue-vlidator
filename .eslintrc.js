module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'no-empty': 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': [
      'error',
      {
        allow: ['log']
      }
    ]
  }
};
