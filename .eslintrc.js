module.exports = {
  root: true,
  extends: ['airbnb'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never']
  },
  env: {
    browser: true,
    node: true
  }
}
