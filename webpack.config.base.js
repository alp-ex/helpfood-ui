const path = require('path')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
    
module.exports = {
    entry: './src/index.tsx',
    // entry: {
    //     index: {import: './src/index.tsx', dependOn: 'react-vendors'},
    //     atoms: {import: './lib/ui-components/atoms/index.tsx', dependOn: 'react-vendors'},
    //     molecules: {import: './lib/ui-components/molecules/index.tsx', dependOn: 'react-vendors'},
    //     'react-vendors': ['react', 'react-dom']
    // },
    output: {
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TSConfigPathsPlugin()],
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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Helpfood',
            filename: 'assets/index.html',
            inject: true,
            templateContent: '<main id="helpfood"></main>',
        }),
    ],
    devServer: {
        contentBase: './dist/assets',
        historyApiFallback: true,
        inline: true
    }
}

