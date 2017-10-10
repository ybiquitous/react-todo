module.exports = {
  plugins: ['testcafe'],
  extends: 'plugin:testcafe/recommended',
  rules: {
    'newline-per-chained-call': 'off',
    'no-unused-expressions': 'off',
    'template-tag-spacing': 'off',
  },
}
