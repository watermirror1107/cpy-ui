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
    ]
}
