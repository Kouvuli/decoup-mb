import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyAccessOutcome, beginEmailSetup, beginRecovery, confirmAdult, deferEmail, initialAccessState, isChallengeCodeOutcome, submitAccountEmail, submitPhone, submitRecoveryEmail, submitReplacementPhone } from './account-access.ts';

test('T01 access state advances only after authoritative outcomes and supports challenge resend', () => {
  assert.equal(confirmAdult(initialAccessState, true).session, 'guest');
  const pendingPhone = submitPhone(initialAccessState);
  assert.equal(pendingPhone.step, 'phoneOtp');
  assert.match(pendingPhone.message, /không cho biết số điện thoại/i);

  for (const outcome of ['invalid', 'expired', 'replayed', 'rateLimited', 'cooldown', 'offline', 'interrupted', 'failed']) {
    const rejected = applyAccessOutcome(pendingPhone, outcome);
    assert.equal(rejected.step, 'phoneOtp');
    assert.equal(rejected.session, 'guest');
  }
  assert.deepEqual(['invalid', 'expired', 'replayed'].filter(isChallengeCodeOutcome), ['invalid', 'expired', 'replayed']);
  assert.equal(isChallengeCodeOutcome('offline'), false);
  assert.match(submitPhone(applyAccessOutcome(pendingPhone, 'expired')).message, /không cho biết số điện thoại/i);

  const returning = applyAccessOutcome(pendingPhone, 'returning');
  assert.equal(returning.step, 'emailOffer');
  assert.equal(deferEmail(returning).step, 'complete');
  const emailCode = submitAccountEmail(beginEmailSetup(returning));
  assert.equal(emailCode.step, 'accountEmailOtp');
  assert.equal(applyAccessOutcome(emailCode, 'emailVerified').step, 'complete');

  const newAccount = applyAccessOutcome(pendingPhone, 'newAccount');
  assert.equal(newAccount.step, 'adult');
  assert.equal(confirmAdult(newAccount, false).session, 'guest');
  assert.equal(confirmAdult(newAccount, true).step, 'emailOffer');

  const recoveryEmail = submitRecoveryEmail(beginRecovery());
  assert.equal(recoveryEmail.step, 'recoveryEmailOtp');
  assert.equal(submitRecoveryEmail(recoveryEmail).step, 'recoveryEmailOtp');
  const replacementPhone = submitReplacementPhone(applyAccessOutcome(recoveryEmail, 'emailVerified'));
  const interruptedRecovery = applyAccessOutcome(replacementPhone, 'interrupted');
  assert.equal(interruptedRecovery.step, 'recoveryPhoneOtp');
  assert.equal(interruptedRecovery.session, 'guest');

  const recovered = applyAccessOutcome(replacementPhone, 'recovered');
  assert.equal(recovered.step, 'complete');
  assert.equal(recovered.session, 'active');
  assert.match(recovered.message, /phiên trước đã bị thu hồi/i);
});
