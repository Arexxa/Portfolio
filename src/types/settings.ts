export type ThemeId = 'matrix' | 'synthwave' | 'ice'

export interface ThemeOption {
  id: ThemeId
  label: string
  description: string
}

export interface Settings {
  theme: ThemeId
  crt: boolean
}
