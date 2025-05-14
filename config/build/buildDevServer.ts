import { BuildTypes } from './types/types'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export const buildDevServer = ({ port, paths }: BuildTypes): DevServerConfiguration => {
  return {
    open: true,
    port: port ?? 4300,
    hot: true,
    historyApiFallback: true,
    // static: {
    //   directory: paths?.public,
    // },
  }
}
