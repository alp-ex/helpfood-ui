module.exports = {
    components: 'src/lib/ui-components/**/index.tsx',
    webpackConfig: require('./webpack.config.js'),
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json'
    ).parse,
}
