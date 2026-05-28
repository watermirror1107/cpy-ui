module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    [
      'import', {
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: 'css'
    }],
    [require('@babel/plugin-proposal-decorators'), {legacy: true}],
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    coverage: {
      plugins: [
        [
          'istanbul',
          {
            extension: ['.js', '.vue'],
            include: [
              'packages/**/*.js',
              'packages/**/*.vue'
            ],
            exclude: [
              'packages/font/**',
              'test/**',
              'node_modules/**'
            ]
          }
        ]
      ]
    }
  }
}
