import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createConfiguredIdentityClient, createIdentityClient } from './identity-client.ts';

test('T01 production configuration never selects the development Identity adapter', async () => {
  const client = createConfiguredIdentityClient({ development: false, mode: 'mock' });

  await assert.rejects(() => client.requestPhoneChallenge('+84912345678'), { code: 'DELIVERY_UNAVAILABLE' });
});

test('T01 development Identity adapter creates a new account without network access', async () => {
  const client = createConfiguredIdentityClient({ development: true, mode: 'mock', scenario: 'new-account' });

  const challenge = await client.requestPhoneChallenge('+84912345678');
  const verified = await client.verifyPhoneChallenge(challenge.challengeId, '123456');
  const authenticated = await client.createAccount(verified.token, true);

  assert.equal(verified.nextStep, 'REGISTRATION_REQUIRED');
  assert.deepEqual(authenticated, {
    accountId: 'development-account',
    sessionToken: 'development-session',
    expiresAt: '2099-01-01T00:00:00.000Z',
  });
});

test('T01 development Identity adapter returns an existing account session', async () => {
  const client = createConfiguredIdentityClient({ development: true, mode: 'mock', scenario: 'returning-account' });

  const challenge = await client.requestPhoneChallenge('+84912345678');
  const verified = await client.verifyPhoneChallenge(challenge.challengeId, '123456');

  assert.deepEqual(verified, {
    nextStep: 'AUTHENTICATED',
    token: 'development-session',
    accountId: 'development-account',
    expiresAt: '2099-01-01T00:00:00.000Z',
  });
});

test('T01 development Identity adapter verifies optional email and replacement-phone recovery', async () => {
  const client = createConfiguredIdentityClient({ development: true, mode: 'mock' });

  const emailChallenge = await client.requestEmailVerification('development-session', 'user@example.com');
  assert.deepEqual(await client.verifyEmail(emailChallenge.challengeId, '123456'), { accountId: 'development-account' });
  const recoveryChallenge = await client.requestRecovery('user@example.com');
  const recovery = await client.verifyRecoveryEmail(recoveryChallenge.challengeId, '123456');
  const phoneChallenge = await client.requestReplacementPhone(recovery.token, '+14155550123');

  assert.deepEqual(await client.completeRecovery(phoneChallenge.challengeId, '123456'), {
    accountId: 'development-account',
    sessionToken: 'development-recovered-session',
    expiresAt: '2099-01-01T00:00:00.000Z',
  });
});

test('T01 phone entry creates an account only from authoritative Identity responses', async () => {
  const requests = [];
  const responses = [
    { challengeId: 'challenge-1', expiresAt: '2026-09-23T12:05:00Z', retryAt: '2026-09-23T12:01:00Z' },
    { nextStep: 'REGISTRATION_REQUIRED', token: 'registration-1', accountId: null, expiresAt: '2026-09-23T12:10:00Z' },
    { accountId: 'account-1', sessionToken: 'session-1', expiresAt: '2026-10-23T12:00:00Z' },
  ];
  const client = createIdentityClient('https://identity.example', async (input, init) => {
    requests.push({ input, init });
    return Response.json(responses.shift());
  });

  const challenge = await client.requestPhoneChallenge('+84912345678');
  const verified = await client.verifyPhoneChallenge(challenge.challengeId, '123456');
  const authenticated = await client.createAccount(verified.token, true);

  assert.equal(authenticated.sessionToken, 'session-1');
  assert.deepEqual(requests.map(({ input }) => input), [
    'https://identity.example/api/identity/phone-challenges',
    'https://identity.example/api/identity/phone-challenges/challenge-1/verification',
    'https://identity.example/api/identity/accounts',
  ]);
  assert.deepEqual(JSON.parse(requests[0].init.body), { phone: '+84912345678' });
  assert.deepEqual(JSON.parse(requests[2].init.body), { registrationToken: 'registration-1', adultConfirmed: true });
});

test('T01 verified email recovery replaces the phone and returns the authoritative session', async () => {
  const requests = [];
  const responses = [
    { challengeId: 'email-1', expiresAt: '2026-09-23T12:05:00Z', retryAt: '2026-09-23T12:01:00Z' },
    { accountId: 'account-1' },
    { challengeId: 'recovery-1', expiresAt: '2026-09-23T12:05:00Z', retryAt: '2026-09-23T12:01:00Z' },
    { token: 'recovery-token', expiresAt: '2026-09-23T12:10:00Z' },
    { challengeId: 'phone-1', expiresAt: '2026-09-23T12:05:00Z', retryAt: '2026-09-23T12:01:00Z' },
    { accountId: 'account-1', sessionToken: 'replacement-session', expiresAt: '2026-10-23T12:00:00Z' },
  ];
  const client = createIdentityClient('https://identity.example/', async (input, init) => {
    requests.push({ input, init });
    return Response.json(responses.shift());
  });

  const emailChallenge = await client.requestEmailVerification('session-1', 'user@example.com');
  await client.verifyEmail(emailChallenge.challengeId, '111111');
  const recoveryChallenge = await client.requestRecovery('user@example.com');
  const recovery = await client.verifyRecoveryEmail(recoveryChallenge.challengeId, '222222');
  const phoneChallenge = await client.requestReplacementPhone(recovery.token, '+14155550123');
  const authenticated = await client.completeRecovery(phoneChallenge.challengeId, '333333');

  assert.equal(authenticated.sessionToken, 'replacement-session');
  assert.equal(requests[0].init.headers.Authorization, 'Bearer session-1');
  assert.deepEqual(JSON.parse(requests[4].init.body), { recoveryToken: 'recovery-token', phone: '+14155550123' });
  assert.deepEqual(requests.map(({ input }) => input), [
    'https://identity.example/api/identity/email-challenges',
    'https://identity.example/api/identity/email-challenges/email-1/verification',
    'https://identity.example/api/identity/recovery/email-challenges',
    'https://identity.example/api/identity/recovery/email-challenges/recovery-1/verification',
    'https://identity.example/api/identity/recovery/phone-challenges',
    'https://identity.example/api/identity/recovery/phone-challenges/phone-1/verification',
  ]);
});

test('T01 returning phone verification accepts only an authoritative account session', async () => {
  const client = createIdentityClient('https://identity.example', async () => Response.json({
    nextStep: 'AUTHENTICATED',
    token: 'session-2',
    accountId: 'account-2',
    expiresAt: '2026-10-23T12:00:00Z',
  }));

  const result = await client.verifyPhoneChallenge('challenge-2', '444444');

  assert.deepEqual(result, {
    nextStep: 'AUTHENTICATED',
    token: 'session-2',
    accountId: 'account-2',
    expiresAt: '2026-10-23T12:00:00Z',
  });

  const invalidClient = createIdentityClient('https://identity.example', async () => Response.json({
    nextStep: 'AUTHENTICATED', token: 'session-3', accountId: null, expiresAt: '2026-10-23T12:00:00Z',
  }));
  await assert.rejects(() => invalidClient.verifyPhoneChallenge('challenge-3', '555555'), { code: 'INVALID_RESPONSE' });

  const expiredClient = createIdentityClient('https://identity.example', async () => Response.json(
    { code: 'CHALLENGE_EXPIRED', message: 'Challenge expired' }, { status: 410 },
  ));
  await assert.rejects(() => expiredClient.verifyPhoneChallenge('challenge-4', '666666'), { code: 'CHALLENGE_EXPIRED' });

  const failedClient = createIdentityClient('https://identity.example', async () => new Response('gateway failure', { status: 502 }));
  await assert.rejects(() => failedClient.requestPhoneChallenge('+84912345678'), { code: 'FAILED' });
  const offlineClient = createIdentityClient('https://identity.example', async () => { throw new TypeError('network unavailable'); });
  await assert.rejects(() => offlineClient.requestPhoneChallenge('+84912345678'), { code: 'OFFLINE' });
});

test('T01 reports an aborted authoritative request as interrupted', async () => {
  const client = createIdentityClient('https://identity.example', async () => {
    throw new DOMException('request aborted', 'AbortError');
  });

  await assert.rejects(() => client.requestPhoneChallenge('+84912345678'), { code: 'INTERRUPTED' });
});
