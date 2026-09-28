export type AccessStep = 'phone' | 'phoneOtp' | 'adult' | 'emailOffer' | 'accountEmail' | 'accountEmailOtp' | 'recoveryEmail' | 'recoveryEmailOtp' | 'recoveryPhone' | 'recoveryPhoneOtp' | 'complete';
export type AccessOutcome = 'returning' | 'newAccount' | 'emailVerified' | 'recovered' | 'invalid' | 'expired' | 'replayed' | 'rateLimited' | 'cooldown' | 'offline' | 'interrupted' | 'failed';

export type AccessState = {
  step: AccessStep;
  session: 'guest' | 'active';
  message: string;
};

export const initialAccessState: AccessState = { step: 'phone', session: 'guest', message: '' };

const errors: Record<Exclude<AccessOutcome, 'returning' | 'newAccount' | 'emailVerified' | 'recovered'>, string> = {
  invalid: 'Mã không đúng. Kiểm tra mã mới nhất rồi thử lại.',
  expired: 'Mã đã hết hạn. Yêu cầu mã mới để tiếp tục.',
  replayed: 'Mã này đã được sử dụng. Yêu cầu mã mới để tiếp tục.',
  rateLimited: 'Đã có quá nhiều lần thử. Hãy chờ thời gian do máy chủ cung cấp rồi thử lại.',
  cooldown: 'Chưa thể gửi mã mới. Hãy chờ thời gian do máy chủ cung cấp.',
  offline: 'Cần kết nối mạng để xác nhận. Không có thay đổi nào được ghi nhận.',
  interrupted: 'Lần xác nhận bị gián đoạn. Trạng thái chưa thay đổi; hãy kiểm tra lại trực tuyến.',
  failed: 'Không thể xác nhận lúc này. Hãy thử lại sau.',
};

export function submitPhone(state: AccessState): AccessState {
  if (state.step !== 'phone' && state.step !== 'phoneOtp') return state;
  return { step: 'phoneOtp', session: 'guest', message: 'Nếu có thể tiếp tục, bạn sẽ nhận được mã. Phản hồi này không cho biết số điện thoại đã có tài khoản hay chưa.' };
}

export function beginRecovery(): AccessState {
  return { step: 'recoveryEmail', session: 'guest', message: '' };
}

export function submitRecoveryEmail(state: AccessState): AccessState {
  if (state.step !== 'recoveryEmail' && state.step !== 'recoveryEmailOtp') return state;
  return { step: 'recoveryEmailOtp', session: 'guest', message: 'Nếu có thể tiếp tục, hướng dẫn khôi phục sẽ được gửi. Phản hồi này không xác nhận tài khoản tồn tại.' };
}

export function submitReplacementPhone(state: AccessState): AccessState {
  if (state.step !== 'recoveryPhone' && state.step !== 'recoveryPhoneOtp') return state;
  return { step: 'recoveryPhoneOtp', session: 'guest', message: 'Số điện thoại thay thế cần được xác nhận trực tuyến trước khi khôi phục.' };
}

export function confirmAdult(state: AccessState, confirmed: boolean): AccessState {
  if (state.step !== 'adult') return state;
  return confirmed
    ? { step: 'emailOffer', session: 'active', message: 'Tài khoản mới chỉ được tạo sau khi máy chủ xác nhận mã và lựa chọn 18+.' }
    : { ...initialAccessState, message: 'Bạn phải xác nhận đủ 18 tuổi để tạo tài khoản. Bạn vẫn có thể tiếp tục xem nội dung công khai.' };
}

export function beginEmailSetup(state: AccessState): AccessState {
  return state.step === 'emailOffer' ? { step: 'accountEmail', session: 'active', message: '' } : state;
}

export function submitAccountEmail(state: AccessState): AccessState {
  return state.step === 'accountEmail' || state.step === 'accountEmailOtp' ? { step: 'accountEmailOtp', session: 'active', message: 'Email chỉ được thêm sau khi máy chủ xác nhận mã.' } : state;
}

export function deferEmail(state: AccessState): AccessState {
  return state.session === 'active' && (state.step === 'emailOffer' || state.step === 'accountEmail' || state.step === 'accountEmailOtp')
    ? { step: 'complete', session: 'active', message: 'Bạn có thể thêm email khôi phục sau. Hồ sơ Người bán và Nhà cung cấp dịch vụ vẫn yêu cầu email đã xác minh.' }
    : state;
}

export function applyAccessOutcome(state: AccessState, outcome: AccessOutcome): AccessState {
  if (outcome in errors) return { ...state, message: errors[outcome as keyof typeof errors] };
  if (state.step === 'phoneOtp' && outcome === 'returning') return { step: 'emailOffer', session: 'active', message: 'Phiên đăng nhập đã được máy chủ xác nhận.' };
  if (state.step === 'phoneOtp' && outcome === 'newAccount') return { step: 'adult', session: 'guest', message: 'Số điện thoại đã được xác nhận. Xác nhận đủ 18 tuổi để tạo tài khoản.' };
  if (state.step === 'accountEmailOtp' && outcome === 'emailVerified') return { step: 'complete', session: 'active', message: 'Email khôi phục đã được máy chủ xác nhận.' };
  if (state.step === 'recoveryEmailOtp' && outcome === 'emailVerified') return { step: 'recoveryPhone', session: 'guest', message: 'Email khôi phục đã được máy chủ xác nhận. Thêm số điện thoại thay thế để tiếp tục.' };
  if (state.step === 'recoveryPhoneOtp' && outcome === 'recovered') return { step: 'complete', session: 'active', message: 'Tài khoản đã được khôi phục, các phiên trước đã bị thu hồi và phiên mới đã được máy chủ xác nhận.' };
  return { ...state, message: 'Phản hồi không phù hợp với bước hiện tại. Không có thay đổi nào được ghi nhận.' };
}

export function isChallengeCodeOutcome(outcome: AccessOutcome) {
  return outcome === 'invalid' || outcome === 'expired' || outcome === 'replayed';
}
