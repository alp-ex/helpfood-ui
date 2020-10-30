const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    performance: {
        hints: false,
    },
    plugins: [new BundleAnalyzerPlugin()],
})
