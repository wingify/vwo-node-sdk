const baseJestConfig = require('./jest.config');
const devConfig = Object.assign(baseJestConfig, {
  verbose: true,
  notify: true
});

module.exports = devConfig;
