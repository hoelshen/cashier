const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // NODE_ENV: JSON.stringify('production')
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': resolve(__dirname, 'src')
        }
    },
    devServer: {
        host: '0.0.0.0',
        // port: 8010,
        proxy: {
            '/apitest': {
                target: 'http://java.cbs.dev.yipicha.com/',
                // target: 'http://192.168.10.109:21212/',
                changeOrigin: true,
                pathRewrite: {
                    '^/apitest': ''
                }
            },
            '/api': {
                // target: 'http://127.0.0.1:8080',
                target: 'http://192.168.10.109:21212/',
                // target: 'http://192.168.7.57:18080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/cbttest': {
                target: 'http://java.cbs.test.yipicha.com/', // 接口的域名
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/cbttest': ''
                }
            },
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})