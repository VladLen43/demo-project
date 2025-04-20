import { Configuration } from 'webpack'
import { BuildTypes } from './types/types.ts'
import { buildDevServer } from './buildDevServer.ts'
import { buildLoaders } from './buildLoaders.ts'
import { buildPlugins } from './buildPlugins.ts'
import { buildResolvers } from './buildResolvers.ts'

export const buildWebpack = (options: BuildTypes): Configuration => {
  const { mode, paths } = options
  const isDev = mode === 'development'
  return {
    mode: mode ?? 'development',
    entry: paths?.entry,
    output: {
      path: paths?.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'eval' : false,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
