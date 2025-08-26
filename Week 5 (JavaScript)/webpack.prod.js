import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
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
                            postcssOptions: (await import('./postcss.config.js')).default,
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