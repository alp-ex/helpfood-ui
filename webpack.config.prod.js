const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
var BrotliPlugin = require('brotli-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: 'error',
    },
    plugins: [
        new CompressionPlugin(),
        // new BrotliPlugin(),
        // new BundleAnalyzerPlugin(),
    ],
})
