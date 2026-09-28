import { useLocalSearchParams, useRouter } from 'expo-router';
import { destinationAfterSignIn } from '../app-shell/navigation';
import { AccessScreen, useDemo } from '../modules/identity';
import { Page } from '../shared/ui';

export default function SignInRoute() {
  const router = useRouter();
  const { mode, destinationKind, destinationId } = useLocalSearchParams<{ mode?: string; destinationKind?: string; destinationId?: string }>();
  const { client, authenticate } = useDemo();
  const cancel = () => router.canGoBack() ? router.back() : router.replace('/');
  const complete = () => {
    router.replace(destinationAfterSignIn(destinationKind, destinationId) ?? '/account');
  };
  return <Page><AccessScreen mode={mode === 'recovery' ? 'recovery' : 'phone'} client={client} onAuthenticated={authenticate} onComplete={complete} onCancel={cancel} /></Page>;
}
