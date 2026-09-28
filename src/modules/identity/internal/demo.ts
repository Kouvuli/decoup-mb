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
