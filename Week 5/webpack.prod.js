const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: require('./postcss.config.js'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
        }),
    ],
    optimization: {
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                test: /\.(jpe?g|png|gif)$/i, // only minify original formats
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['mozjpeg', { progressive: true, quality: 75 }],
                            ['optipng', { optimizationLevel: 5 }],
                            ['gifsicle', { interlaced: false }],
                            ['pngquant', { quality: [0.65, 0.9], speed: 4 }],
                        ],
                    },
                },
            }),
            new ImageMinimizerPlugin({
                test: /\.(jpe?g|png)$/i, // only convert JPEG/PNG to WebP
                generator: [
                    {
                        preset: 'webp',
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ['imagemin-webp', { quality: 75 }],
                        },
                    },
                ],
            }),
        ],
    }

});