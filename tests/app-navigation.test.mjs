import assert from 'node:assert/strict';
import { test } from 'node:test';
import { destinationAfterSignIn } from '../src/app-shell/navigation.ts';

test('the app shell resumes only validated destinations after sign-in', () => {
  assert.equal(destinationAfterSignIn('order', 'demo-order-1'), '/order/demo-order-1');
  assert.equal(destinationAfterSignIn('chat', 'chair'), '/chat/chair');
  assert.equal(destinationAfterSignIn('chat', 'unknown'), null);
  assert.equal(destinationAfterSignIn('listing', 'chair'), null);
  assert.equal(destinationAfterSignIn('order', '../chat/chair'), null);
});
