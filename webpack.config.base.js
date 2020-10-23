const path = require('path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TSConfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'lib'),
                ],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        compress: true,
        historyApiFallback: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Planning | helpfood',
            filename: 'index.html',
            inject: 'body',
            minify: true,
            template: './index.template.html',
        }),
    ],
}
