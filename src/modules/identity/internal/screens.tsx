import { createContext, useContext, useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Action, radius, spacing, typography, useColors } from '../../../shared/ui';
import { allowedDestination, canUseSeller, demoStates, type DemoState, type Workspace } from './demo';
import { createIdentityClient, type Authentication } from './identity-client';

const statePresentation: Record<DemoState, { label: string; sellerStatus: string; detail: string }> = {
  guest: {
    label: 'Khách',
    sellerStatus: 'Chưa kích hoạt',
    detail: 'Bạn vẫn có thể xem nội dung khi chưa kích hoạt hồ sơ Người bán.',
  },
  buyer: {
    label: 'Người mua',
    sellerStatus: 'Chưa kích hoạt',
    detail: 'Quyền Người mua đang hoạt động; công cụ Người bán chưa khả dụng.',
  },
  seller: {
    label: 'Người bán đã kích hoạt',
    sellerStatus: 'Đã kích hoạt',
    detail: 'Công cụ Người bán khả dụng trong bản minh họa. Chọn không gian Người mua hoặc Người bán bên dưới.',
  },
  pending: {
    label: 'Đang chờ xác minh',
    sellerStatus: 'Đang chờ xác minh',
    detail: 'Yêu cầu kích hoạt Người bán đang được xem xét; công cụ Người bán chưa khả dụng.',
  },
  rejected: {
    label: 'Kích hoạt bị từ chối',
    sellerStatus: 'Kích hoạt bị từ chối',
    detail: 'Yêu cầu kích hoạt Người bán đã bị từ chối; công cụ Người bán chưa khả dụng trong bản minh họa.',
  },
  suspended: {
    label: 'Người bán bị tạm ngưng',
    sellerStatus: 'Đã tạm ngưng',
    detail: 'Công cụ Người bán không khả dụng khi hồ sơ này bị tạm ngưng.',
  },
};

const workspaceLabels: Record<Workspace, string> = { buyer: 'Người mua', seller: 'Người bán' };

const DemoContext = createContext<{
  state: DemoState;
  workspace: Workspace;
  setState: (state: DemoState) => void;
  setWorkspace: (workspace: Workspace) => void;
  pendingDestination: string | null;
  requestSignIn: (kind: string, id: string) => boolean;
  completeSignIn: () => string | null;
  client: ReturnType<typeof createIdentityClient>;
  authentication: Authentication | null;
  authenticate: (authentication: Authentication) => void;
} | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, changeState] = useState<DemoState>('guest');
  const [workspace, changeWorkspace] = useState<Workspace>('buyer');
  const [pendingDestination, setPendingDestination] = useState<string | null>(null);
  const [authentication, setAuthentication] = useState<Authentication | null>(null);
  const [client] = useState(() => createIdentityClient(process.env.EXPO_PUBLIC_API_URL));
  return <DemoContext.Provider value={{
    state, workspace, client, authentication,
    setState: next => { changeState(next); if (next === 'guest') setAuthentication(null); if (!canUseSeller(next)) changeWorkspace('buyer'); },
    setWorkspace: next => changeWorkspace(next === 'seller' && !canUseSeller(state) ? 'buyer' : next),
    pendingDestination,
    requestSignIn: (kind, id) => {
      const destination = allowedDestination(kind, id);
      if (!destination) return false;
      setPendingDestination(destination);
      return true;
    },
    completeSignIn: () => {
      const destination = pendingDestination;
      const [, kind, id] = destination?.split('/') ?? [];
      const valid = destination ? allowedDestination(kind, id) : null;
      setPendingDestination(null);
      return valid;
    },
    authenticate: next => {
      setAuthentication(next);
      changeState('buyer');
      changeWorkspace('buyer');
    },
  }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('DemoProvider is missing');
  return value;
}

export function AccountScreen({ onSignIn, onRecover }: { onSignIn: () => void; onRecover: () => void }) {
  const colors = useColors();
  const { state, workspace, setState, setWorkspace } = useDemo();
  const current = statePresentation[state];
  return <View style={{ gap: spacing.lg }}>
    <Text style={[typography.body, { color: colors.secondaryText }]}>Một tài khoản minh họa có thể mua sắm với vai trò Người mua. Hồ sơ Người bán được kích hoạt riêng.</Text>
    {state === 'guest' && <View style={{ gap: spacing.sm }}>
      <Action label="Tiếp tục với điện thoại" onPress={onSignIn} />
      <Action label="Khôi phục bằng email" variant="secondary" onPress={onRecover} />
      <Text style={[typography.body, { color: colors.secondaryText }]}>Bạn không cần tài khoản để tiếp tục xem nội dung công khai.</Text>
    </View>}
    <View style={{ backgroundColor: colors.subtle, padding: spacing.lg, borderRadius: radius.md, borderCurve: 'continuous', borderWidth: 1, borderColor: colors.separator, gap: spacing.sm }}>
      <Text accessibilityRole="header" style={[typography.headline, { color: colors.primaryText }]}>Hồ sơ Người bán</Text>
      <Text accessibilityLiveRegion="polite" style={[typography.label, { color: colors.primaryText }]}>{current.sellerStatus}</Text>
      <Text style={[typography.body, { color: colors.secondaryText }]}>{current.detail}</Text>
      <View style={{ height: 1, backgroundColor: colors.separator }} />
      <Text accessibilityRole="header" style={[typography.headline, { color: colors.primaryText }]}>Hồ sơ Nhà cung cấp dịch vụ</Text>
      <Text style={[typography.label, { color: colors.primaryText }]}>Chưa khả dụng trong bản minh họa</Text>
      <Text style={[typography.body, { color: colors.secondaryText }]}>Không gian và quy trình tạo hồ sơ Nhà cung cấp dịch vụ thuộc một ticket riêng.</Text>
      <Text style={[typography.caption, { color: colors.secondaryText }]}>Kích hoạt Người bán hoặc Nhà cung cấp dịch vụ yêu cầu số điện thoại và email đã xác minh. Hai hồ sơ được xét riêng.</Text>
    </View>
    {canUseSeller(state) && <View style={{ gap: spacing.sm }}>
      <Text accessibilityRole="header" style={[typography.headline, { color: colors.primaryText }]}>Vai trò đang dùng</Text>
      <Text accessibilityLiveRegion="polite" style={[typography.body, { color: colors.secondaryText }]}>Vai trò hiện tại: {workspaceLabels[workspace]}</Text>
      <View accessibilityRole="radiogroup" accessibilityLabel="Chọn vai trò" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {(['buyer', 'seller'] as const).map(next => {
          const selected = workspace === next;
          return <Pressable key={next} accessibilityRole="radio" accessibilityState={{ checked: selected }} accessibilityLabel={`Vai trò ${workspaceLabels[next]}`} accessibilityHint="Thay đổi vai trò hiển thị trong bản minh họa" onPress={() => setWorkspace(next)} style={({ pressed }) => ({ flexGrow: 1, flexBasis: 144, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, borderRadius: radius.full, borderWidth: 1, borderColor: selected ? colors.actionBorder : colors.controlBorder, backgroundColor: selected ? colors.primaryAction : colors.surface, opacity: pressed ? 0.72 : 1 })}><Text style={[typography.label, { color: selected ? colors.onPrimaryAction : colors.primaryText, textAlign: 'center' }]}>{workspaceLabels[next]}</Text></Pressable>;
        })}
      </View>
    </View>}
    {__DEV__ && <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.lg }}>
      <Text accessibilityRole="header" style={[typography.headline, { color: colors.primaryText }]}>Trạng thái tài khoản dành cho phát triển</Text>
      <Text style={[typography.body, { color: colors.secondaryText }]}>Trạng thái hiện tại: {current.label}</Text>
      <View accessibilityRole="radiogroup" accessibilityLabel="Trạng thái tài khoản dành cho phát triển" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{demoStates.map(next => {
        const selected = state === next;
        const label = statePresentation[next].label;
        return <Pressable key={next} accessibilityRole="radio" accessibilityState={{ checked: selected }} accessibilityLabel={label} accessibilityHint="Thay đổi quyền tài khoản và điều hướng trong bản minh họa" onPress={() => setState(next)} style={({ pressed }) => ({ flexGrow: 1, flexBasis: 112, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.md, borderRadius: radius.full, borderWidth: 1, borderColor: selected ? colors.actionBorder : colors.controlBorder, backgroundColor: selected ? colors.primaryAction : colors.surface, opacity: pressed ? 0.72 : 1 })}><Text style={[typography.label, { color: selected ? colors.onPrimaryAction : colors.primaryText, textAlign: 'center' }]}>{label}</Text></Pressable>;
      })}</View>
      <Text style={[typography.body, { color: colors.secondaryText }]}>Các lựa chọn trạng thái vai trò dành cho phát triển sẽ đặt lại khi tải lại ứng dụng.</Text>
    </View>}
  </View>;
}
