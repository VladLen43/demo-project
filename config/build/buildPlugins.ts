import webpack, { Configuration } from 'webpack'
import { BuildTypes } from './types/types'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const buildPlugins = (options: BuildTypes): Configuration['plugins'] => {
  const { mode } = options
  const isDev = mode === 'development'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths?.html,
      favicon: path.resolve(options.paths?.public ?? '', 'favicon.ico'),
    }),
    new webpack.DefinePlugin({ __PLATFORM__: JSON.stringify(options.platform) }),
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash]:8.css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    )
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(options.paths?.public, 'locales'),
            to: path.resolve(options.paths?.output, 'locales'),
          },
        ],
      }),
    )
    // if (options?.analyzer) {
    //   plugins.push(new BundleAnalyzerPlugin())
    // }
  }

  return plugins
}
