module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  rules: {
    curly: [2, 'all'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'max-len': [2, { code: 100, tabWidth: 2, ignoreUrls: true }],
    'prettier/prettier': 'off',
  },
}
