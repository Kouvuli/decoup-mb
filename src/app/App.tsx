import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { radius, spacing, typography, useColors } from '../shared/ui';

export default function App() {
  const colors = useColors();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.xl }}
    >
      <View style={{ backgroundColor: colors.surface, padding: spacing.xl, borderRadius: radius.md, gap: spacing.md }}>
        <Text selectable style={[typography.display, { color: colors.primaryText }]}>DecoUp</Text>
        <Text selectable style={[typography.title, { color: colors.primaryText }]}>Không gian sống đẹp</Text>
        <Text selectable style={[typography.body, { color: colors.secondaryText }]}>Bản mẫu giao diện — chưa có tính năng sản phẩm.</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <View style={{ backgroundColor: colors.primaryAction, borderColor: colors.actionBorder, borderWidth: 1, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
            <Text style={[typography.label, { color: colors.onPrimaryAction }]}>Hành động chính</Text>
          </View>
          <View style={{ backgroundColor: colors.highlight, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
            <Text style={[typography.label, { color: colors.onHighlight }]}>Điểm nhấn</Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
