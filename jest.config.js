const esModules = [
  'hast-util-embedded',
  'hast-util-has-property',
  'hast-util-is-body-ok-link',
  'hast-util-is-element',
  'hast-util-phrasing',
  'hast-util-to-mdast',
  'hast-util-to-text',
  'hast-util-whitespace',
  'mdast-util-phrasing',
  'mdast-util-to-string',
  'rehype-minify-whitespace',
  'trim-trailing-lines',
  'unist-util-find-after',
  'unist-util-is',
  'unist-util-parents',
  'unist-util-position',
  'unist-util-visit',
]

module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*\\.d\\.ts',
    'prebundles/mocks',
  ],
  coverageThreshold: { global: { lines: 95 } },
  moduleFileExtensions: [
    'js',
    'jsx',
    'cjs',
    'mjs',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '^jsx-slack(.*)$': '<rootDir>$1',
  },
  preset: 'ts-jest/presets/js-with-babel',
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/!(_)*.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'babel.config.js'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules.join('|')})`],
}
