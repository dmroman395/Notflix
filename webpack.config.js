const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devServer: {
        port: 3000,
        watchContentBase: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|ico|mp4)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                },
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            path: path.join(__dirname, '.env'),
        }),
    ],
}
