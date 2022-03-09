const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')// 全部webpack5废弃的Node-Polyfill包
const fs = require('fs');

let optimization = {
    minimize: false
}
let plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(zh|en)/)
    // new NodePolyfillPlugin()
]
const devConfig = {
    cache: true,
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: '../css',
                        outputPath: 'css',
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'less-loader', options: {
                        additionalData: fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/color.less'), {encoding: 'utf-8'}) +
                            fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/theme.less'), {encoding: 'utf-8'})+
                            fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/common.less'), {encoding: 'utf-8'})
                    }
                }],
                // exclude: /node_modules/ //不能忽略node-modules的因为ant-design-vue中的theme.less被用到
            },
            {
                test: /\.(gif|jpg|png|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    optimization,
    plugins,
    devtool : 'eval-cheap-source-map',
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css', '.less'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        fallback: {
            path: require.resolve('path-browserify')// 填补webpack移除的node polyfill坑
        }
    },
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        compress: true,
        client: {
            logging: 'none'
        }
    }
}

module.exports = devConfig
