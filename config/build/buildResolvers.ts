import { Configuration } from 'webpack'
import { BuildTypes } from './types/types'
import { resolve } from 'path'

export const buildResolvers = ({ paths }: BuildTypes): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   '@': paths?.src,
    // },
  }
}
