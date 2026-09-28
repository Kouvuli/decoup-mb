import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Action, Page, spacing, typography, useColors } from '../shared/ui';

export default function PublicRoute() {
  const router = useRouter();
  const colors = useColors();
  return <Page title="DecoUp">
    <Text style={[typography.title, { color: colors.primaryText }]}>Không gian sống đẹp</Text>
    <Text style={[typography.body, { color: colors.secondaryText }]}>Bạn có thể xem nội dung công khai mà không cần tài khoản.</Text>
    <Action label="Tài khoản" onPress={() => router.push('/account')} style={{ marginTop: spacing.sm }} />
  </Page>;
}
