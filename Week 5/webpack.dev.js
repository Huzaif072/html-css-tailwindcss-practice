const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: './dist',
        },
        port: 8080,
        open: ['home.html'],
        hot: true,
        compress: true,
        watchFiles: ['src/**/*.html'],
    },
});