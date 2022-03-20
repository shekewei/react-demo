const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './src/app.tsx',
    mode: "development",
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash:6].js',
        path: path.resolve(__dirname, '../build')
    },
    resolve: {
        alias: {
            "@": path.resolve('src')
        },
        extensions: ['.ts', '.tsx', '...']
    },
    module: {
        rules: [
            {
                test: /\.(css|less|scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(tsx?|jsx?)$/,
                exclude: [/node_modules/],
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg$)/,
                type: "asset",
                generator: {
                    filename: 'img/[name].[hash:6].[ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 700 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "font/[name].[hash:6].[ext]"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //清楚前一次打包文件
        new HtmlWebpackPlugin({
            title: "React Demo",
            template: "./public/index.html"
        }),//自动创建以及关联jscss的html
        new DefinePlugin({
            BASE_URL: '"./"'
        }),//定义全局变量
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: [//忽略文件public下的某个文件时需要加上**/
                            "**/index.html",
                            "**/.DS_Store",
                        ]
                    }
                }
            ]
        }),//移动文件到打包文件夹下
    ]

}