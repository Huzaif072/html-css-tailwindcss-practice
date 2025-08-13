    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: {
            home: path.resolve(__dirname, 'src/js/pages/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][contenthash].js',
            assetModuleFilename: 'assets/[name][ext]',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                sources: {
                                    list: [
                                        '...',
                                        { tag: 'img', attribute: 'src', type: 'src' }
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp|mp4)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/pages/index.html'),
                filename: 'index.html',
                chunks: ['home'],
            }),
        ],
    };