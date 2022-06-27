const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html",
    filename: "index.html",
})


module.exports = {
    mode: 'development',
    entry: './index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '/dist'),
        },
        open: true,
        port: 3000
    },
    plugins: [
        htmlPlugin
    ]
}