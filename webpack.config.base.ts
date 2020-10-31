import path from 'path'
import TSConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration, WatchIgnorePlugin } from 'webpack'

const config: Configuration = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        plugins: [new TSConfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
        new WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
        new HtmlWebpackPlugin({
            title: 'Planning | helpfood',
            filename: 'index.html',
            inject: 'body',
            minify: true,
            template: './index.template.html',
        }),
    ],
}

export default config
