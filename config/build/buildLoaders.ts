import { ModuleOptions } from 'webpack'
import { BuildTypes } from './types/types'
import { buildBabelLoader } from './babel/buildBabelLoader.ts'
//import ReactRefreshTypeScript from 'react-refresh-typescript'

export const buildLoaders = ({ mode }: BuildTypes): ModuleOptions['rules'] => {
  const isDev = mode === 'development'

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: {
  //     loader: 'ts-loader',
  //     options: {
  //       transpileOnly: true,
  //       getCustomTransformers: () => ({
  //         before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //       }),
  //     },
  //   },
  //   exclude: /node_modules/,
  // }

  const babelLoader = buildBabelLoader(isDev)

  const scssLoader = {
    test: /\.module\.(scss|sass)$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
          url: {
            filter: () => true,
          },
          modules: {
            localIdentName: '[local]_[hash:base64:6]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isDev,
        },
      },
    ],
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          },
        },
      },
    ],
  }

  return [assetLoader, svgrLoader, scssLoader, babelLoader]
}
