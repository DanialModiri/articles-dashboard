const path = require('path')
const ErrorOverlay = require('error-overlay-webpack-plugin')

module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            {
                test: /\.css$/, use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    devServer: {
        port: 3002,
        contentBase: './public',
        proxy: {
            '/':{
                target: 'http://localhost:3000',
                bypass: (req, res) => {
                    if (req.headers.accept.includes('html'))
                        return './index.html'
                }
            }

        }
    },
    plugins: [new ErrorOverlay()],
    devtool: 'cheap-module-source-map'
}