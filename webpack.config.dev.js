const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(
    baseConfig,
    {
    mode: 'development',
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './dist/assets',
        historyApiFallback: true,
        inline: true
    }
})
