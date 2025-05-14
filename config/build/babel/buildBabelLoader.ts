import { removeDataTestIdPlugin } from './removeDataTestIdPlugin.ts'

export const buildBabelLoader = (isDev: boolean) => {
  const plugins = [] as any

  if (!isDev) {
    plugins.push([removeDataTestIdPlugin, { props: ['data-testid'] }])
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDev ? 'automatic' : 'classic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  }
}
