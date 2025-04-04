import webpack, { Configuration } from 'webpack'
import { BuildTypes } from './types/types'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const buildPlugins = (options: BuildTypes): Configuration['plugins'] => {
  const { mode } = options
  const isDev = mode === 'development'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths?.html,
    }),
    new webpack.DefinePlugin({ __PLATFORM__: JSON.stringify(options.platform) }),
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash]:8.css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    )
    // if (options?.analyzer) {
    //   plugins.push(new BundleAnalyzerPlugin())
    // }
  }

  return plugins
}
