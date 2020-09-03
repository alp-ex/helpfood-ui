const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist/assets',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
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
        // minimizer: [new TerserPlugin()],
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            title: 'Helpfood',
            filename: 'assets/index.html',
            inject: true,
            templateContent: '<div id="helpfood"></div>',
        }),
    ],
}
