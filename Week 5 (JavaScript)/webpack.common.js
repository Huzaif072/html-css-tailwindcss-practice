import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: {
        home: path.resolve(__dirname, 'src/js/pages/home.js'),
        login: path.resolve(__dirname, 'src/js/pages/login.js'),
        cart: path.resolve(__dirname, 'src/js/pages/cart.js')
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
            template: path.resolve(__dirname, './src/pages/home.html'),
            filename: 'home.html',
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/login.html'),
            filename: 'login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/cart.html'),
            filename: 'cart.html',
            chunks: ['cart'],
        }),
    ],
};