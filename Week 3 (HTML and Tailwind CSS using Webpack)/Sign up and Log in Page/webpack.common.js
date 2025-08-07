const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // signup1: path.resolve(__dirname, 'src/signup1.js'),
        signup2: path.resolve(__dirname, 'src/signup2.js'),
        login: path.resolve(__dirname, 'src/login.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    module: {
        rules: [
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
        // new HtmlWebpackPlugin({
        //     title: 'Sign up/create an account',
        //     filename: 'signup1.html',
        //     template: path.resolve(__dirname, 'src/signup1.html'),
        // }),
        new HtmlWebpackPlugin({
            title: 'Sign up/create an account',
            filename: 'signup2.html',
            template: path.resolve(__dirname, 'src/signup2.html'),
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            title: 'Log in/sign in',
            filename: 'login.html',
            template: path.resolve(__dirname, 'src/login.html'),
            inject: 'body',
        }),
    ],
};