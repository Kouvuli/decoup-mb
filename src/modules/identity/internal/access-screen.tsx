import { useEffect, useRef, useState, type RefObject } from 'react';
import { AccessibilityInfo, findNodeHandle, Pressable, Switch, Text, TextInput, View } from 'react-native';
import { Action, Notice, radius, spacing, typography, useColors } from '../../../shared/ui';
import { applyAccessOutcome, beginEmailSetup, beginRecovery, confirmAdult, deferEmail, initialAccessState, isChallengeCodeOutcome, submitAccountEmail, submitPhone, submitRecoveryEmail, submitReplacementPhone, type AccessOutcome, type AccessState } from './account-access';
import { IdentityClientError, type Authentication, type createConfiguredIdentityClient } from './identity-client';

type Mode = 'phone' | 'recovery';
type FieldName = 'countryCode' | 'phone' | 'email' | 'code';
type FieldError = { field: FieldName; message: string } | null;

export function AccessScreen({ mode = 'phone', client, onAuthenticated, onComplete, onCancel }: { mode?: Mode; client: ReturnType<typeof createConfiguredIdentityClient>; onAuthenticated: (authentication: Authentication) => void; onComplete: () => void; onCancel: () => void }) {
  const colors = useColors();
  const [state, setState] = useState<AccessState>(() => mode === 'recovery' ? beginRecovery() : initialAccessState);
  const [countryCode, setCountryCode] = useState('+84');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [adult, setAdult] = useState(false);
  const [fieldError, setFieldError] = useState<FieldError>(null);
  const [challengeId, setChallengeId] = useState('');
  const [registrationToken, setRegistrationToken] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [retryAt, setRetryAt] = useState('');
  const [pending, setPending] = useState(false);
  const [clock, setClock] = useState(Date.now);
  const active = useRef(true);
  const pendingRequest = useRef(false);
  const heading = useRef<Text>(null);
  const countryCodeInput = useRef<TextInput>(null);
  const phoneInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const codeInput = useRef<TextInput>(null);
  const previousStep = useRef(state.step);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);
  useEffect(() => {
    const delay = Date.parse(retryAt) - Date.now();
    if (!(delay > 0)) return;
    const timeout = setTimeout(() => setClock(Date.now()), delay);
    return () => clearTimeout(timeout);
  }, [retryAt]);
  useEffect(() => {
    if (previousStep.current === state.step) return;
    previousStep.current = state.step;
    const timeout = setTimeout(() => {
      const handle = findNodeHandle(heading.current);
      if (handle) AccessibilityInfo.setAccessibilityFocus(handle);
    }, 0);
    return () => clearTimeout(timeout);
  }, [state.step]);
  useEffect(() => {
    if (process.env.EXPO_OS === 'ios' && fieldError?.message) AccessibilityInfo.announceForAccessibilityWithOptions(fieldError.message, { queue: true });
  }, [fieldError?.message]);
  useEffect(() => {
    if (process.env.EXPO_OS === 'ios' && pending) AccessibilityInfo.announceForAccessibilityWithOptions('Đang xác nhận…', { queue: true });
  }, [pending]);
  useEffect(() => {
    if (process.env.EXPO_OS === 'ios' && state.message) AccessibilityInfo.announceForAccessibilityWithOptions(state.message, { queue: true });
  }, [state.message]);

  const showFieldError = (field: FieldName, message: string) => {
    setFieldError({ field, message });
    requestAnimationFrame(() => ({ countryCode: countryCodeInput, phone: phoneInput, email: emailInput, code: codeInput })[field].current?.focus());
  };

  const validatePhone = () => {
    if (!/^\+[1-9]\d{0,3}$/.test(countryCode.trim())) {
      showFieldError('countryCode', 'Nhập mã quốc gia bắt đầu bằng dấu +.');
      return false;
    }
    if (!phone.trim()) {
      showFieldError('phone', 'Nhập số điện thoại.');
      return false;
    }
    setFieldError(null);
    return true;
  };

  const edit = (field: FieldName, update: (value: string) => void, value: string) => {
    update(value);
    setFieldError(current => current?.field === field ? null : current);
  };

  const requestPhone = async (recovery = false) => {
    if (!validatePhone()) return;
    await run(async () => {
      const challenge = recovery
        ? await client.requestReplacementPhone(recoveryToken, `${countryCode.trim()}${phone.trim()}`)
        : await client.requestPhoneChallenge(`${countryCode.trim()}${phone.trim()}`);
      if (!active.current) return;
      setChallengeId(challenge.challengeId);
      setRetryAt(challenge.retryAt);
      setClock(Date.now());
      setCode('');
      setState(current => recovery ? submitReplacementPhone(current) : submitPhone(current));
    });
  };

  const requestRecoveryEmail = async () => {
    if (!email.trim().includes('@')) return showFieldError('email', 'Nhập email khôi phục hợp lệ.');
    await run(async () => {
      const challenge = await client.requestRecovery(email.trim());
      if (!active.current) return;
      setChallengeId(challenge.challengeId);
      setRetryAt(challenge.retryAt);
      setClock(Date.now());
      setCode('');
      setState(current => submitRecoveryEmail(current));
    });
  };

  const requestAccountEmail = async () => {
    if (!email.trim().includes('@')) return showFieldError('email', 'Nhập email khôi phục hợp lệ.');
    await run(async () => {
      const challenge = await client.requestEmailVerification(sessionToken, email.trim());
      if (!active.current) return;
      setChallengeId(challenge.challengeId);
      setRetryAt(challenge.retryAt);
      setClock(Date.now());
      setCode('');
      setState(current => submitAccountEmail(current));
    });
  };

  const resend = () => {
    if (state.step === 'phoneOtp') return void requestPhone();
    if (state.step === 'accountEmailOtp') return void requestAccountEmail();
    if (state.step === 'recoveryEmailOtp') return void requestRecoveryEmail();
    if (state.step === 'recoveryPhoneOtp') return void requestPhone(true);
  };

  const cancel = () => {
    active.current = false;
    onCancel();
  };

  const verify = async () => {
    if (!code.trim()) {
      showFieldError('code', 'Nhập mã được gửi cho bước này.');
      return;
    }
    await run(async () => {
      if (state.step === 'phoneOtp') {
        const result = await client.verifyPhoneChallenge(challengeId, code.trim());
        if (!active.current) return;
        if (result.nextStep === 'REGISTRATION_REQUIRED') {
          setRegistrationToken(result.token);
          setState(current => applyAccessOutcome(current, 'newAccount'));
        } else {
          const authentication = { accountId: result.accountId!, sessionToken: result.token, expiresAt: result.expiresAt };
          setSessionToken(authentication.sessionToken);
          onAuthenticated(authentication);
          setState(current => applyAccessOutcome(current, 'returning'));
        }
      } else if (state.step === 'accountEmailOtp') {
        await client.verifyEmail(challengeId, code.trim());
        if (!active.current) return;
        setState(current => applyAccessOutcome(current, 'emailVerified'));
      } else if (state.step === 'recoveryEmailOtp') {
        const result = await client.verifyRecoveryEmail(challengeId, code.trim());
        if (!active.current) return;
        setRecoveryToken(result.token);
        setState(current => applyAccessOutcome(current, 'emailVerified'));
      } else if (state.step === 'recoveryPhoneOtp') {
        const authentication = await client.completeRecovery(challengeId, code.trim());
        if (!active.current) return;
        setSessionToken(authentication.sessionToken);
        onAuthenticated(authentication);
        setState(current => applyAccessOutcome(current, 'recovered'));
      }
    }, 'code');
  };

  const run = async (request: () => Promise<void>, errorField?: FieldName) => {
    if (pendingRequest.current) return;
    pendingRequest.current = true;
    setPending(true);
    setFieldError(null);
    setState(current => current.message ? { ...current, message: '' } : current);
    try {
      await request();
    } catch (error) {
      if (active.current) {
        const outcome = outcomeFor(error);
        if (errorField && isChallengeCodeOutcome(outcome)) {
          showFieldError(errorField, applyAccessOutcome(state, outcome).message);
        } else {
          setState(current => applyAccessOutcome(current, outcome));
        }
      }
    } finally {
      pendingRequest.current = false;
      if (active.current) setPending(false);
    }
  };

  const title = {
    phone: 'Tiếp tục với điện thoại',
    phoneOtp: 'Nhập mã xác nhận',
    adult: 'Xác nhận độ tuổi',
    emailOffer: 'Bảo vệ quyền truy cập',
    accountEmail: 'Thêm email khôi phục',
    accountEmailOtp: 'Xác nhận email khôi phục',
    recoveryEmail: 'Khôi phục bằng email',
    recoveryEmailOtp: 'Xác nhận email',
    recoveryPhone: 'Thêm số điện thoại thay thế',
    recoveryPhoneOtp: 'Xác nhận số điện thoại mới',
    complete: state.message.includes('khôi phục') ? 'Đã khôi phục quyền truy cập' : 'Đã xác nhận',
  }[state.step];
  const retryTime = Date.parse(retryAt);

  return <View style={{ width: '100%', maxWidth: 520, alignSelf: 'center', gap: spacing.xl }}>
    <View style={{ gap: spacing.sm }}>
      <Text ref={heading} accessibilityRole="header" style={[typography.title, { color: colors.primaryText }]}>{title}</Text>
      <Text style={[typography.body, { color: colors.secondaryText }]}>{descriptionFor(state.step)}</Text>
    </View>
    {state.message ? <View accessibilityLiveRegion="polite"><Notice>{state.message}</Notice></View> : null}
    {pending ? <View accessibilityLiveRegion="polite"><Notice>Đang xác nhận…</Notice></View> : null}

    {state.step === 'phone' && <View style={{ gap: spacing.md }}>
      <PhoneFields countryCodeRef={countryCodeInput} phoneRef={phoneInput} countryCode={countryCode} phone={phone} countryError={fieldError?.field === 'countryCode' ? fieldError.message : undefined} phoneError={fieldError?.field === 'phone' ? fieldError.message : undefined} disabled={pending} onCountryCode={value => edit('countryCode', setCountryCode, value)} onPhone={value => edit('phone', setPhone, value)} onSubmit={() => void requestPhone()} />
      <View style={{ gap: spacing.sm }}>
        <Action label="Gửi mã xác nhận" disabled={pending} onPress={() => void requestPhone()} />
        <Action label="Tôi không còn dùng số điện thoại này" variant="quiet" disabled={pending} onPress={() => { setFieldError(null); setPhone(''); setState(beginRecovery()); }} />
      </View>
    </View>}

    {state.step === 'recoveryEmail' && <View style={{ gap: spacing.md }}>
      <Field inputRef={emailInput} label="Email khôi phục đã xác minh" value={email} error={fieldError?.field === 'email' ? fieldError.message : undefined} disabled={pending} onChange={value => edit('email', setEmail, value)} onSubmit={() => void requestRecoveryEmail()} keyboard="email-address" autoComplete="email" textContentType="emailAddress" returnKeyType="send" />
      <Action label="Gửi hướng dẫn khôi phục" disabled={pending} onPress={() => void requestRecoveryEmail()} />
    </View>}

    {(state.step === 'phoneOtp' || state.step === 'accountEmailOtp' || state.step === 'recoveryEmailOtp' || state.step === 'recoveryPhoneOtp') && <View style={{ gap: spacing.md }}>
      <View style={{ gap: spacing.xs }}>
        <Field inputRef={codeInput} label="Mã xác nhận" value={code} error={fieldError?.field === 'code' ? fieldError.message : undefined} disabled={pending} onChange={value => edit('code', setCode, value)} onSubmit={() => void verify()} keyboard="number-pad" autoComplete={state.step === 'phoneOtp' || state.step === 'recoveryPhoneOtp' ? 'sms-otp' : 'email-otp'} textContentType="oneTimeCode" returnKeyType="done" />
        <Text style={[typography.caption, { color: colors.secondaryText }]}>Có thể yêu cầu mã mới sau: {retryLabel(retryAt)}.</Text>
      </View>
      <View style={{ gap: spacing.sm }}>
        <Action label="Xác nhận mã" disabled={pending} onPress={() => void verify()} />
        <Action label="Gửi lại mã" variant="secondary" disabled={pending || Number.isNaN(retryTime) || retryTime > clock} onPress={resend} />
      </View>
    </View>}

    {state.step === 'adult' && <View style={{ gap: spacing.md }}>
      <View style={{ gap: spacing.sm }}>
        <Pressable accessibilityRole="switch" accessibilityLabel="Tôi xác nhận mình đủ 18 tuổi" accessibilityState={{ checked: adult, disabled: pending }} disabled={pending} onPress={() => setAdult(value => !value)} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 48, opacity: pending ? 0.45 : pressed ? 0.72 : 1 })}>
          <Switch accessible={false} pointerEvents="none" disabled={pending} value={adult} />
          <Text style={[typography.body, { color: colors.primaryText, flex: 1 }]}>Tôi xác nhận mình đủ 18 tuổi.</Text>
        </Pressable>
        <Text style={[typography.body, { color: colors.secondaryText }]}>DecoUp không yêu cầu ngày sinh trong bước này.</Text>
      </View>
      <View style={{ gap: spacing.sm }}>
        <Action label="Tạo tài khoản" disabled={!adult || pending} onPress={() => void run(async () => {
          const authentication = await client.createAccount(registrationToken, true);
          if (!active.current) return;
          setSessionToken(authentication.sessionToken);
          onAuthenticated(authentication);
          setState(current => confirmAdult(current, true));
        })} />
        <Action label="Tôi chưa đủ 18 tuổi" variant="quiet" disabled={pending} onPress={() => { setAdult(false); setState(confirmAdult(state, false)); }} />
      </View>
    </View>}

    {state.step === 'emailOffer' && <View style={{ gap: spacing.sm }}>
      <Action label="Thêm email khôi phục" onPress={() => setState(beginEmailSetup(state))} />
      <Action label="Để sau" variant="secondary" onPress={() => setState(deferEmail(state))} />
    </View>}

    {state.step === 'accountEmail' && <View style={{ gap: spacing.md }}>
      <Field inputRef={emailInput} label="Email khôi phục" value={email} error={fieldError?.field === 'email' ? fieldError.message : undefined} disabled={pending} onChange={value => edit('email', setEmail, value)} onSubmit={() => void requestAccountEmail()} keyboard="email-address" autoComplete="email" textContentType="emailAddress" returnKeyType="send" />
      <Action label="Gửi mã xác nhận email" disabled={pending} onPress={() => void requestAccountEmail()} />
    </View>}

    {state.step === 'recoveryPhone' && <View style={{ gap: spacing.md }}>
      <PhoneFields countryCodeRef={countryCodeInput} phoneRef={phoneInput} countryCode={countryCode} phone={phone} countryError={fieldError?.field === 'countryCode' ? fieldError.message : undefined} phoneError={fieldError?.field === 'phone' ? fieldError.message : undefined} disabled={pending} onCountryCode={value => edit('countryCode', setCountryCode, value)} onPhone={value => edit('phone', setPhone, value)} onSubmit={() => void requestPhone(true)} />
      <Action label="Gửi mã đến số điện thoại thay thế" disabled={pending} onPress={() => void requestPhone(true)} />
    </View>}

    {state.step === 'complete' && <Action label="Tiếp tục" onPress={onComplete} />}
    {(state.step === 'accountEmail' || state.step === 'accountEmailOtp') && <Action label="Để sau" variant="secondary" disabled={pending} onPress={() => setState(deferEmail(state))} />}
    {state.session === 'guest' && <Action label="Hủy và tiếp tục xem nội dung công khai" variant="secondary" onPress={cancel} />}
  </View>;
}

function PhoneFields({ countryCodeRef, phoneRef, countryCode, phone, countryError, phoneError, disabled, onCountryCode, onPhone, onSubmit }: { countryCodeRef: RefObject<TextInput | null>; phoneRef: RefObject<TextInput | null>; countryCode: string; phone: string; countryError?: string; phoneError?: string; disabled: boolean; onCountryCode: (value: string) => void; onPhone: (value: string) => void; onSubmit: () => void }) {
  return <View style={{ gap: spacing.sm }}>
    <Field inputRef={countryCodeRef} label="Mã quốc gia" value={countryCode} error={countryError} disabled={disabled} onChange={onCountryCode} onSubmit={() => phoneRef.current?.focus()} keyboard="phone-pad" autoComplete="tel-country-code" textContentType="none" returnKeyType="next" />
    <Field inputRef={phoneRef} label="Số điện thoại" value={phone} error={phoneError} disabled={disabled} onChange={onPhone} onSubmit={onSubmit} keyboard="phone-pad" autoComplete="tel-national" textContentType="telephoneNumber" returnKeyType="send" />
  </View>;
}

function Field({ inputRef, label, value, error, disabled, onChange, onSubmit, keyboard, autoComplete, textContentType, returnKeyType }: { inputRef: RefObject<TextInput | null>; label: string; value: string; error?: string; disabled: boolean; onChange: (value: string) => void; onSubmit: () => void; keyboard: 'email-address' | 'number-pad' | 'phone-pad'; autoComplete: 'email' | 'email-otp' | 'sms-otp' | 'tel-country-code' | 'tel-national'; textContentType: 'emailAddress' | 'none' | 'oneTimeCode' | 'telephoneNumber'; returnKeyType: 'done' | 'next' | 'send' }) {
  const colors = useColors();
  return <View style={{ gap: spacing.xs }}>
    <Text accessible={false} style={[typography.label, { color: colors.primaryText }]}>{label}</Text>
    <TextInput ref={inputRef} accessibilityLabel={label} accessibilityHint={error} accessibilityState={{ disabled }} editable={!disabled} value={value} onChangeText={onChange} onSubmitEditing={disabled ? undefined : onSubmit} keyboardType={keyboard} autoComplete={autoComplete} textContentType={textContentType} returnKeyType={returnKeyType} submitBehavior="blurAndSubmit" autoCapitalize="none" autoCorrect={false} style={[typography.body, { minHeight: 48, color: colors.primaryText, backgroundColor: colors.surface, borderWidth: 1, borderColor: error ? colors.primaryAction : colors.controlBorder, borderRadius: radius.sm, borderCurve: 'continuous', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, opacity: disabled ? 0.6 : 1 }]} />
    {error ? <Text accessibilityLiveRegion="assertive" style={[typography.caption, { color: colors.primaryText }]}>{error}</Text> : null}
  </View>;
}

function descriptionFor(step: AccessState['step']) {
  if (step === 'phone') return 'Một luồng dùng cho cả tài khoản mới và tài khoản đã có. Mã quốc gia mặc định là Việt Nam (+84).';
  if (step === 'phoneOtp') return 'Nhập mã mới nhất. Kết quả chỉ được chấp nhận sau khi máy chủ xác nhận trực tuyến.';
  if (step === 'adult') return 'Tài khoản mới chỉ được tạo cho người xác nhận đủ 18 tuổi.';
  if (step === 'emailOffer') return 'Email khôi phục là tùy chọn cho Người mua và Khách hàng, nhưng bắt buộc trước khi kích hoạt Người bán hoặc Nhà cung cấp dịch vụ.';
  if (step === 'accountEmail') return 'Bạn có thể thêm email đã xác minh ngay hoặc để sau.';
  if (step === 'accountEmailOtp') return 'Email chỉ được lưu sau khi mã được máy chủ xác nhận trực tuyến.';
  if (step === 'recoveryEmail') return 'Dùng email đã xác minh khi bạn không còn truy cập số điện thoại cũ.';
  if (step === 'recoveryEmailOtp') return 'Xác nhận email trước khi thêm số điện thoại thay thế.';
  if (step === 'recoveryPhone') return 'Phiên cũ chỉ bị thu hồi sau khi số điện thoại thay thế được xác nhận.';
  if (step === 'recoveryPhoneOtp') return 'Khôi phục cần xác nhận trực tuyến; gián đoạn không bao giờ được xem là thành công.';
  return 'Bạn có thể tiếp tục đến nội dung đã được xác thực lại.';
}

function retryLabel(value: string) {
  const time = Date.parse(value);
  return Number.isNaN(time) ? 'thời gian do máy chủ cung cấp' : new Date(time).toLocaleTimeString('vi-VN');
}

function outcomeFor(error: unknown): AccessOutcome {
  if (!(error instanceof IdentityClientError)) return 'failed';
  if (error.code === 'INVALID_CODE' || error.code === 'INVALID_CHALLENGE') return 'invalid';
  if (error.code === 'CHALLENGE_EXPIRED') return 'expired';
  if (error.code === 'CHALLENGE_REPLAYED') return 'replayed';
  if (error.code === 'TOO_MANY_ATTEMPTS') return 'rateLimited';
  if (error.code === 'INTERRUPTED') return 'interrupted';
  if (error.code === 'OFFLINE') return 'offline';
  return 'failed';
}
