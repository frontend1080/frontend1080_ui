module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],

  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    // 为 Jest 配置 Babel
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/svgTransformer.js'
  },

  transformIgnorePatterns: ['/node_modules/'],

  // 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  snapshotSerializers: ['jest-serializer-vue'],

  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],

  testURL: 'http://localhost/',

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  preset: '@vue/cli-plugin-unit-jest'
}
