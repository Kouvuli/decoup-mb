import { useRouter } from 'expo-router';
import { AccountScreen } from '../modules/identity';
import { Page } from '../shared/ui';

export default function AccountRoute() {
  const router = useRouter();
  return <Page><AccountScreen onSignIn={() => router.push('/sign-in')} onRecover={() => router.push('/sign-in?mode=recovery')} /></Page>;
}
