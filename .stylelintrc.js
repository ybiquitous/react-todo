module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'string-quotes': 'double',
    'order/declaration-block-properties-alphabetical-order': true,
  },
}
