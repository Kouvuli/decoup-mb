import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { layout, radius, shadows, spacing, typography, useColors } from './theme';

export function Page({ children, title, onSearch, onInbox }: { children: ReactNode; title?: string; onSearch?: () => void; onInbox?: () => void }) {
  const colors = useColors();
  return <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ width: '100%', maxWidth: layout.contentMaxWidth, alignSelf: 'center', padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl }}>
    {(title || onSearch || onInbox) && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }}>
      <Text style={[typography.title, { color: colors.primaryText, flexShrink: 1 }]}>{title}</Text>
      {(onSearch || onInbox) && <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {onSearch && <Pressable accessibilityRole="button" accessibilityLabel="Tìm kiếm" onPress={onSearch} style={({ pressed }) => ({ minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', opacity: pressed ? 0.64 : 1 })}><Text style={[typography.label, { color: colors.accent }]}>Tìm kiếm</Text></Pressable>}
        {onInbox && <Pressable accessibilityRole="button" accessibilityLabel="Hộp thư" onPress={onInbox} style={({ pressed }) => ({ minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', opacity: pressed ? 0.64 : 1 })}><Text style={[typography.label, { color: colors.accent }]}>Hộp thư</Text></Pressable>}
      </View>}
    </View>}
    {children}
  </ScrollView>;
}

export function Action({ label, onPress, variant = 'primary', disabled = false, style }: { label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'quiet'; disabled?: boolean; style?: StyleProp<ViewStyle> }) {
  const colors = useColors();
  const primary = variant === 'primary';
  const secondary = variant === 'secondary';
  return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} android_ripple={{ color: primary ? colors.actionPressOnPrimary : colors.actionPressOnSurface }} disabled={disabled} onPress={onPress} style={({ pressed }) => [{ alignSelf: 'stretch', minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.lg, borderRadius: radius.md, borderCurve: 'continuous', borderWidth: secondary ? 1 : 0, borderColor: secondary ? colors.actionBorder : undefined, backgroundColor: primary ? colors.primaryAction : variant === 'quiet' ? colors.subtle : colors.surface, boxShadow: primary ? shadows.card : undefined, opacity: disabled ? 0.45 : process.env.EXPO_OS === 'android' ? 1 : pressed ? 0.72 : 1 }, style]}><Text style={[typography.label, { color: primary ? colors.onPrimaryAction : secondary ? colors.accent : colors.primaryText }]}>{label}</Text></Pressable>;
}

export function Notice({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <View style={{ backgroundColor: colors.subtle, padding: spacing.md, borderRadius: radius.sm, borderCurve: 'continuous', borderWidth: 1, borderColor: colors.separator }}><Text selectable style={[typography.label, { color: colors.primaryText }]}>{children}</Text></View>;
}
