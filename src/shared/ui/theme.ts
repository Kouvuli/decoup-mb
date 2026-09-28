import { Platform, useColorScheme } from 'react-native';

const photoRoles = {
  photoText: '#FFF8F4',
  photoInk: '#211B18',
  photoControl: 'rgba(27,23,21,0.78)',
  photoScrim: 'rgba(27,23,21,0.74)',
  photoSurface: 'rgba(255,248,244,0.96)',
  backdrop: 'rgba(27,23,21,0.38)',
} as const;

const palettes = {
  light: {
    ...photoRoles,
    primaryAction: '#C62828',
    onPrimaryAction: '#FFFFFF',
    actionBorder: '#C62828',
    actionPressOnPrimary: 'rgba(255,255,255,0.18)',
    actionPressOnSurface: 'rgba(198,40,40,0.12)',
    accent: '#C62828',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primaryText: '#211B18',
    secondaryText: '#6B5E56',
    subtle: '#FFF4F2',
    separator: '#E7DED9',
    controlBorder: '#75645C',
    highlight: '#F4C95D',
    onHighlight: '#17202E',
  },
  dark: {
    ...photoRoles,
    primaryAction: '#C62828',
    onPrimaryAction: '#FFFFFF',
    actionBorder: '#D6C8C0',
    actionPressOnPrimary: 'rgba(255,255,255,0.18)',
    actionPressOnSurface: 'rgba(255,107,107,0.16)',
    accent: '#FF6B6B',
    background: '#1B1715',
    surface: '#28211E',
    primaryText: '#FFF8F4',
    secondaryText: '#D6C8C0',
    subtle: '#3A2523',
    separator: '#51453F',
    controlBorder: '#B7A69E',
    highlight: '#FFD66B',
    onHighlight: '#17202E',
  },
} as const;

export function useColors() {
  return palettes[useColorScheme() === 'dark' ? 'dark' : 'light'];
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 8, md: 16, full: 999 } as const;
export const layout = { contentMaxWidth: 720 } as const;

export const shadows = {
  card: '0 2px 12px rgba(33,27,24,0.10)',
  overlay: '0 8px 24px rgba(33,27,24,0.20)',
} as const;

const serif = Platform.select({ ios: 'ui-serif', android: 'serif', default: 'serif' });

export const typography = {
  display: { fontFamily: serif, fontSize: 32, lineHeight: 38, fontWeight: '700' },
  title: { fontFamily: serif, fontSize: 24, lineHeight: 30, fontWeight: '700' },
  headline: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
} as const;
