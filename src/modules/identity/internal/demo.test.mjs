import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canUseSeller, tabsFor } from './demo.ts';

test('mock tabs and Seller gate', () => {
  assert.deepEqual(tabsFor('buyer', 'buyer'), ['Home', 'Explore', 'Shop', 'Services', 'Account']);
  assert.deepEqual(tabsFor('seller', 'seller'), ['Home', 'Explore', 'Add', 'Shop', 'Account']);
  for (const state of ['guest', 'pending', 'rejected', 'suspended']) {
    assert.equal(canUseSeller(state), false);
    assert.equal(tabsFor(state, 'seller')[2], 'Shop');
  }
});
