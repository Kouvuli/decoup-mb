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
