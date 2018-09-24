var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devServer: {
        host: "0.0.0.0",
        port: 8000,
        contentBase: "./public",
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
