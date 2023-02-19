module.exports = {
  presets: [
    // 使可以正常运行 vue 项目，
    '@vue/app',
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      plugins: ['transform-require-context']
    }
  }

}
