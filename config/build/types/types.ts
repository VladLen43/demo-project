import { ResolveOptions } from 'webpack'

export interface BuildPaths {
  entry: string
  html: string
  output: string
  //   src: any
  public: string
}
export type BuildMode = 'development' | 'none' | 'production'
export interface BuildTypes {
  mode?: BuildMode
  paths: BuildPaths
  isDev?: boolean
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export type BuildPlatform = 'mobile' | 'desktop'
