import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DemoProvider } from '../modules/identity';
import { useColors } from '../shared/ui';

export default function RootLayout() {
  return <DemoProvider><RootStack /><StatusBar style="auto" /></DemoProvider>;
}

function RootStack() {
  const colors = useColors();
  return <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.primaryText, contentStyle: { backgroundColor: colors.background } }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="account" options={{ title: 'Tài khoản' }} />
    <Stack.Screen name="sign-in" options={{ title: 'Quyền truy cập tài khoản' }} />
  </Stack>;
}
