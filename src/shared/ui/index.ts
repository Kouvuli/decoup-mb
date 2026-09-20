import { Platform, useColorScheme } from 'react-native';

const palettes = {
  light: {
    primaryAction: '#C62828',
    onPrimaryAction: '#FFFFFF',
    actionBorder: '#C62828',
    accent: '#C62828',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primaryText: '#17202E',
    secondaryText: '#5F6B7A',
    subtle: '#FFF4F2',
    highlight: '#F4C95D',
    onHighlight: '#17202E',
  },
  dark: {
    primaryAction: '#C62828',
    onPrimaryAction: '#FFFFFF',
    actionBorder: '#C9D2DC',
    accent: '#FF6B6B',
    background: '#111827',
    surface: '#1F2937',
    primaryText: '#F9FAFB',
    secondaryText: '#C9D2DC',
    subtle: '#3B2327',
    highlight: '#FFD66B',
    onHighlight: '#17202E',
  },
} as const;

export function useColors() {
  return palettes[useColorScheme() === 'dark' ? 'dark' : 'light'];
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 8, md: 16 } as const;

const serif = Platform.select({ ios: 'ui-serif', android: 'serif', default: 'serif' });

export const typography = {
  display: { fontFamily: serif, fontSize: 32, lineHeight: 38, fontWeight: '700' },
  title: { fontFamily: serif, fontSize: 24, lineHeight: 30, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
} as const;
