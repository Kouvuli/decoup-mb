export type DemoState = 'guest' | 'buyer' | 'seller' | 'pending' | 'rejected' | 'suspended';
export type Workspace = 'buyer' | 'seller';

export const demoStates: DemoState[] = ['guest', 'buyer', 'seller', 'pending', 'rejected', 'suspended'];

export function canUseSeller(state: DemoState) {
  return state === 'seller';
}

export function tabsFor(state: DemoState, workspace: Workspace) {
  return canUseSeller(state) && workspace === 'seller'
    ? ['Home', 'Explore', 'Add', 'Shop', 'Account']
    : ['Home', 'Explore', 'Shop', 'Services', 'Account'];
}

export function allowedDestination(kind: string, id: string): string | null {
  if (kind === 'order' && id === 'demo-order-1') return `/order/${id}`;
  if (kind === 'chat' && (id === 'chair' || id === 'lamp' || id === 'table')) return `/chat/${id}`;
  return null;
}
