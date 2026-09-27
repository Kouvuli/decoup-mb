export function destinationAfterSignIn(kind: string | undefined, id: string | undefined) {
  if (kind === 'order' && id === 'demo-order-1') return '/order/demo-order-1';
  if (kind === 'chat' && id === 'chair') return '/chat/chair';
  if (kind === 'chat' && id === 'lamp') return '/chat/lamp';
  if (kind === 'chat' && id === 'table') return '/chat/table';
  return null;
}
