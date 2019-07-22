module.exports = {
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(spec))\\.js$',
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  displayName: {
    name: 'VWO NODE SDK',
    color: 'pink'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test/test-utils/'
  ]
};
