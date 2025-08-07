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
        port: 3000,
        open: ['signup2.html'],
        hot: true,
        compress: true,
        watchFiles: ['src/**/*.html'],
    },
});