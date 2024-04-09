module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '/__test__/.*\\.test\\.(ts|tsx)?$',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  modulePathIgnorePatterns: ['<rootDir>/examples/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^swr/useform$': '<rootDir>/use-form/src/index.ts',
    '^swr/_internal$': '<rootDir>/_internal/src/index.ts'
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  coverageReporters: ['text', 'html']
}
