module.exports = {
    components: 'src/lib/components/ui/**/index.tsx',
    webpackConfig: require('./webpack.config.js'),
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json'
    ).parse,
}
