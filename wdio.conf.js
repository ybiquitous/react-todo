const PORT = process.env.PORT || 3000

exports.config = {
  specs: [
    './test/e2e/**/*.js',
  ],
  exclude: [
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
  }],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: `http://localhost:${PORT}`,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    timeout: 10000,
  },
}
