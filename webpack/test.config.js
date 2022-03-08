const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')// 全部webpack5废弃的Node-Polyfill包
const fs = require('fs');
const webpackConfig = {
    mode: 'development',
    target: 'node',
    entry: {
        index: path.resolve(__dirname, '../packages/index.js')
    },
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
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
                    loader: 'less-loader',
                    options: {
                        additionalData: fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/color.less'), {encoding: 'utf-8'}) +
                            fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/color.less'), {encoding: 'utf-8'})
                    }
                }]
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
    devtool: 'eval-cheap-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'template'),
                to: path.resolve(__dirname, 'dist'),
                filter: async (resourcePath) => {
                    return resourcePath.indexOf('index.html') <= -1
                }
            }]
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'template/index.html'),
            title: 'ecp-portal'
        }),
        new webpack.IgnorePlugin({resourceRegExp: /canvas/}),
        new NodePolyfillPlugin()
    ],
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules')],
        extensions: ['.js', '.json', '.vue', '.css', '.less'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        fallback: {
            path: require.resolve('path-browserify')// 填补webpack移除的node polyfill坑
        }
    }
}

module.exports = webpackConfig
