const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    // this is too much costly, can't we use it only on dev mode ?
    // devtool: "cheap-module-eval-source-map", 
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Helpfood',
            filename: 'assets/index.html'
        })
    ]
}