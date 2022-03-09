const path = require("path");
const fs = require("fs");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        'cpy-ui': path.resolve(__dirname, '../packages/index.js')
    },
    output: {
        path: path.join(__dirname, '../lib'),
        filename: "cpy-ui.min.js",
        library: 'cpy-ui',
        libraryTarget: 'umd',
        globalObject: 'this'//当打包规范为umd时候需要设置这个属性，不然nodejs环境下不可使用打包后的库
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
                    loader: 'less-loader', options: {
                        additionalData: fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/color.less'), {encoding: 'utf-8'}) +
                            fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/theme.less'), {encoding: 'utf-8'}) +
                            fs.readFileSync(path.resolve(__dirname, '../ant-design-vue/common.less'), {encoding: 'utf-8'})
                    }
                }]
            },
            {test: /\.vue$/, loader: 'vue-loader'},
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../lib')]
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules')],
        extensions: ['.js', '.json', '.vue', '.css', '.less'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    externals: {
        vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
        },
        antd: 'ant-design-vue'
    },
    optimization: {//分离压缩，test-min的才压缩
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                include: /\.min/, //以min.js结尾的才压缩
                terserOptions: {
                    compress: {
                        // turn off flags with small gains to speed up minification
                        arrows: false,
                        collapse_vars: false, // 0.3kb
                        comparisons: false,
                        computed_props: false,
                        hoist_funs: false,
                        hoist_props: false,
                        hoist_vars: false,
                        inline: false,
                        loops: false,
                        negate_iife: false,
                        properties: false,
                        reduce_funcs: false,
                        reduce_vars: false,
                        switches: false,
                        toplevel: false,
                        typeofs: false,
                        booleans: true,
                        if_return: true,
                        sequences: true,
                        unused: true,
                        conditionals: true,
                        dead_code: true,
                        evaluate: true
                    },
                    mangle: {
                        safari10: true
                    }
                },
                parallel: true,
                extractComments: false
            })
        ]
    }
}
