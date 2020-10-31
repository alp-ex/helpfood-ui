import { merge } from 'webpack-merge'
import baseConfig from './webpack.config.base'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Configuration } from 'webpack'

const config: Configuration = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    performance: {
        hints: false,
    },
    // plugins: [new BundleAnalyzerPlugin()],
})

export default config
