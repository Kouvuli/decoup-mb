import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { AccessScreen, useDemo } from '../modules/identity';
import { Page } from '../shared/ui';

export default function SignInRoute() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const { client, authenticate, completeSignIn } = useDemo();
  const cancel = () => router.canGoBack() ? router.back() : router.replace('/');
  const complete = () => {
    const destination = completeSignIn();
    router.replace((destination ?? '/account') as Href);
  };
  return <Page><AccessScreen mode={mode === 'recovery' ? 'recovery' : 'phone'} client={client} onAuthenticated={authenticate} onComplete={complete} onCancel={cancel} /></Page>;
}
