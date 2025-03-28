import webpack from 'webpack'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

interface EnvVariables {
  mode?: 'development' | 'production'
  port?: number
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development'
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash]:8.css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': resolve(__dirname, 'src'),
        '#config': resolve(__dirname, 'config'),
      },
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          open: true,
          port: env.port ?? 4300,
          hot: true,
          historyApiFallback: true,
          static: {
            directory: resolve(__dirname, 'public'),
          },
        }
      : undefined,
  }

  return config
}
