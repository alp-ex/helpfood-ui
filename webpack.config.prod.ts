import { merge } from 'webpack-merge'
import baseConfig from './webpack.config.base'
// import TerserPlugin from 'terser-webpack-plugin'
// import CompressionPlugin from 'compression-webpack-plugin'
// import BrotliPlugin from 'brotli-webpack-plugin'

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {},
    performance: {
        hints: 'error',
    },
})
