// Application constants

export const THEME = {
  colors: {
    primary: '#C41E3A',
    primaryDark: '#A01830',
    primaryLight: '#E02E4A',
    accent: '#FFD700',
    accentDark: '#D4AF37',
    accentLight: '#FFEC8B',
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1280px',
  },
} as const;

export const STORAGE_KEYS = {
  USER_PROGRESS: 'cursor-tutorial:progress',
  USER_PREFERENCES: 'cursor-tutorial:preferences',
  ANONYMOUS_ID: 'cursor-tutorial:anonymous-id',
} as const;

export const APP_INFO = {
  NAME: 'Cursor Tutorial',
  VERSION: '1.0.0',
} as const;
