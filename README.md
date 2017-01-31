[![Stories in Ready](https://badge.waffle.io/ybiquitous/react-todo.png?label=ready&title=Ready)](https://waffle.io/ybiquitous/react-todo)
[![Build Status](https://travis-ci.org/ybiquitous/react-todo.svg)](https://travis-ci.org/ybiquitous/react-todo)

# React TODO App

## Dependencies

- React
- Express (Server-side rendering)

## Start server

```sh
yarn start
```

## Development

- Babel
- Webpack
- ESLint
- Postcss
- Browsersync

Run on local browser:

```sh
yarn watch
```

## Test

- Enzyme
- Mocha
- Power Assert
- Sinon
- WebdriverIO

Run tests:

```sh
yarn test
```

In watch mode:

```sh
yarn test:watch
```

Run E2E tests:

```sh
yarn build
yarn start
yarn webdriver
yarn test:e2e
yarn webdriver:stop
```
