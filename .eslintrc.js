module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: ['ybiquitous', 'plugin:flowtype/recommended'],

  plugins: ['flowtype'],

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/webpack*',
        '**/*test.*',
        '**/test/**/*',
      ],
    }],
  },
}
