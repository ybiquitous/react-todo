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

    // NOTE: unnecessary because of using flowtype
    'react/no-unused-prop-types': 'off',

    // NOTE: copy from `eslint-config-airbnb`
    // https://github.com/airbnb/javascript/blob/fc7fae620f625701a5614fb9cf9ec1e9c49bcc70/packages/eslint-config-airbnb/rules/react.js#L206
    'react/sort-comp': ['error', {
      order: [
        'type-annotations',
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render',
      ],
    }],
  },
}
