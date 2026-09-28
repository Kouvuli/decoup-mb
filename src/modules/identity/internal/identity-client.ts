export type Challenge = { challengeId: string; expiresAt: string; retryAt: string };
export type Authentication = { accountId: string; sessionToken: string; expiresAt: string };
export type PhoneVerification = {
  nextStep: 'AUTHENTICATED' | 'REGISTRATION_REQUIRED';
  token: string;
  accountId: string | null;
  expiresAt: string;
};
export type RecoveryAuthorization = { token: string; expiresAt: string };

type Send = (input: string, init: RequestInit) => Promise<Response>;

export class IdentityClientError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export function createIdentityClient(baseUrl: string | undefined, send: Send = fetch) {
  const post = async (path: string, body: object, sessionToken?: string) => {
    if (!baseUrl?.trim()) throw new IdentityClientError('DELIVERY_UNAVAILABLE', 'Identity service is not configured');
    try {
      const response = await send(`${baseUrl.replace(/\/$/, '')}${path}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
        body: JSON.stringify(body),
      });
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        if (!response.ok) throw new IdentityClientError('FAILED', 'Identity request failed');
        invalidResponse();
      }
      if (!response.ok) {
        const problem = record(payload);
        throw new IdentityClientError(optionalString(problem.code) ?? 'FAILED', optionalString(problem.message) ?? 'Identity request failed');
      }
      return record(payload);
    } catch (error) {
      if (error instanceof IdentityClientError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new IdentityClientError('INTERRUPTED', 'Identity request was interrupted');
      }
      throw new IdentityClientError('OFFLINE', 'Identity service is unavailable');
    }
  };

  return {
    async requestPhoneChallenge(phone: string): Promise<Challenge> {
      return challenge(await post('/api/identity/phone-challenges', { phone }));
    },
    async verifyPhoneChallenge(challengeId: string, code: string): Promise<PhoneVerification> {
      const value = await post(`/api/identity/phone-challenges/${encodeURIComponent(challengeId)}/verification`, { code });
      const nextStep = requiredString(value.nextStep);
      if (nextStep !== 'AUTHENTICATED' && nextStep !== 'REGISTRATION_REQUIRED') invalidResponse();
      const accountId = value.accountId === null ? null : requiredString(value.accountId);
      if ((nextStep === 'AUTHENTICATED') !== Boolean(accountId)) invalidResponse();
      return {
        nextStep,
        token: requiredString(value.token),
        accountId,
        expiresAt: requiredString(value.expiresAt),
      };
    },
    async createAccount(registrationToken: string, adultConfirmed: boolean): Promise<Authentication> {
      return authentication(await post('/api/identity/accounts', { registrationToken, adultConfirmed }));
    },
    async requestEmailVerification(sessionToken: string, email: string): Promise<Challenge> {
      return challenge(await post('/api/identity/email-challenges', { email }, sessionToken));
    },
    async verifyEmail(challengeId: string, code: string): Promise<{ accountId: string }> {
      const value = await post(`/api/identity/email-challenges/${encodeURIComponent(challengeId)}/verification`, { code });
      return { accountId: requiredString(value.accountId) };
    },
    async requestRecovery(email: string): Promise<Challenge> {
      return challenge(await post('/api/identity/recovery/email-challenges', { email }));
    },
    async verifyRecoveryEmail(challengeId: string, code: string): Promise<RecoveryAuthorization> {
      const value = await post(`/api/identity/recovery/email-challenges/${encodeURIComponent(challengeId)}/verification`, { code });
      return { token: requiredString(value.token), expiresAt: requiredString(value.expiresAt) };
    },
    async requestReplacementPhone(recoveryToken: string, phone: string): Promise<Challenge> {
      return challenge(await post('/api/identity/recovery/phone-challenges', { recoveryToken, phone }));
    },
    async completeRecovery(challengeId: string, code: string): Promise<Authentication> {
      return authentication(await post(`/api/identity/recovery/phone-challenges/${encodeURIComponent(challengeId)}/verification`, { code }));
    },
  };
}

export function createConfiguredIdentityClient({ baseUrl, development, mode, scenario = 'new-account' }: { baseUrl?: string; development: boolean; mode?: string; scenario?: string }) {
  if (development && mode === 'mock') return createDevelopmentIdentityClient(scenario);
  return createIdentityClient(baseUrl);
}

function createDevelopmentIdentityClient(scenario: string) {
  return {
    async requestPhoneChallenge(): Promise<Challenge> {
      return { challengeId: 'development-phone', expiresAt: '2099-01-01T00:00:00.000Z', retryAt: '2000-01-01T00:00:00.000Z' };
    },
    async verifyPhoneChallenge(): Promise<PhoneVerification> {
      if (scenario === 'returning-account') {
        return { nextStep: 'AUTHENTICATED', token: 'development-session', accountId: 'development-account', expiresAt: '2099-01-01T00:00:00.000Z' };
      }
      if (scenario !== 'new-account') throw new IdentityClientError('FAILED', 'Unknown development Identity scenario');
      return { nextStep: 'REGISTRATION_REQUIRED', token: 'development-registration', accountId: null, expiresAt: '2099-01-01T00:00:00.000Z' };
    },
    async createAccount(_registrationToken: string, adultConfirmed: boolean): Promise<Authentication> {
      if (!adultConfirmed) throw new IdentityClientError('ADULT_REQUIRED', 'Adult confirmation is required');
      return { accountId: 'development-account', sessionToken: 'development-session', expiresAt: '2099-01-01T00:00:00.000Z' };
    },
    async requestEmailVerification(): Promise<Challenge> {
      return { challengeId: 'development-email', expiresAt: '2099-01-01T00:00:00.000Z', retryAt: '2000-01-01T00:00:00.000Z' };
    },
    async verifyEmail(): Promise<{ accountId: string }> {
      return { accountId: 'development-account' };
    },
    async requestRecovery(): Promise<Challenge> {
      return { challengeId: 'development-recovery-email', expiresAt: '2099-01-01T00:00:00.000Z', retryAt: '2000-01-01T00:00:00.000Z' };
    },
    async verifyRecoveryEmail(): Promise<RecoveryAuthorization> {
      return { token: 'development-recovery', expiresAt: '2099-01-01T00:00:00.000Z' };
    },
    async requestReplacementPhone(): Promise<Challenge> {
      return { challengeId: 'development-recovery-phone', expiresAt: '2099-01-01T00:00:00.000Z', retryAt: '2000-01-01T00:00:00.000Z' };
    },
    async completeRecovery(): Promise<Authentication> {
      return { accountId: 'development-account', sessionToken: 'development-recovered-session', expiresAt: '2099-01-01T00:00:00.000Z' };
    },
  };
}

function challenge(value: Record<string, unknown>): Challenge {
  return {
    challengeId: requiredString(value.challengeId),
    expiresAt: requiredString(value.expiresAt),
    retryAt: requiredString(value.retryAt),
  };
}

function authentication(value: Record<string, unknown>): Authentication {
  return {
    accountId: requiredString(value.accountId),
    sessionToken: requiredString(value.sessionToken),
    expiresAt: requiredString(value.expiresAt),
  };
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) invalidResponse();
  return value as Record<string, unknown>;
}

function requiredString(value: unknown): string {
  if (typeof value !== 'string' || !value) invalidResponse();
  return value;
}

function optionalString(value: unknown) {
  return typeof value === 'string' && value ? value : null;
}

function invalidResponse(): never {
  throw new IdentityClientError('INVALID_RESPONSE', 'Identity service returned an invalid response');
}
