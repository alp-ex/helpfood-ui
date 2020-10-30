const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const CompressionPlugin = require('compression-webpack-plugin')
var BrotliPlugin = require('brotli-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    performance: {
        hints: 'error',
    },
    plugins: [new CompressionPlugin(), new BrotliPlugin()],
})
