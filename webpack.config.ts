import { Configuration } from 'webpack'

export default (env: string): Configuration => {
    return require(`./webpack.config.${env}.ts`)
}
