module.exports = {
  root: true,
  extends: ['ybiquitous'],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/webpack*',
        '**/*test.*',
      ]
    }],
  },
}
