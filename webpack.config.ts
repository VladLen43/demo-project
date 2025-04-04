import webpack from 'webpack'
import { fileURLToPath } from 'url'
import path, { dirname, resolve } from 'path'
import 'webpack-dev-server'
import { buildWebpack } from './config/build/buildWebpack.ts'
import { BuildMode, BuildPaths, BuildPlatform } from './config/build/types/types'

interface EnvVariables {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'dist'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    // src: resolve(__dirname, 'src'),
    // public: resolve(__dirname, 'public'),
  }
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 4300,
    paths: paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? 'desktop',
  })

  return config
}
