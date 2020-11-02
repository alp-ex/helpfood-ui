import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import baseConfig from './webpack.config.base'
import CompressionPlugin from 'compression-webpack-plugin'
import BrotliPlugin from 'brotli-webpack-plugin'

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin() as any],
    },
    performance: {
        hints: 'error',
    },
    plugins: [new CompressionPlugin() as any, new BrotliPlugin() as any],
})
