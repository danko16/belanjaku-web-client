export const AUTH_ACTIONS = Object.freeze({
  FLOW: 'belanjaku/auth/flow',
  SET_DATA: 'belanjaku/auth/set-data',
  REQ_LOGIN: 'belanjaku/auth/req/login',
  REQ_REGISTER: 'belanjaku/auth/req/register',
  REQ_CONFIRM_OTP: 'belanjaku/auth/req/confirm-otp',
  REQ_REGISTER_COMPLETE: 'belanjaku/auth/req/register-complete',
  REQ_FORGOT_PASSWORD: 'belanjaku/auth/req/forgot-password',
  REQ_CONFIRM_RESET: 'belanjaku/auth/req/confirm-reset',
  REQ_RESET_PASSWORD: 'belanjaku/auth/req/reset-password',
  LOGIN: 'belanjaku/auth/login',
  REGISTER: 'belanjaku/auth/register',
  CONFIRM_OTP: 'belanjaku/auth/confirm-otp',
  REGISTER_COMPLETE: 'belanjaku/auth/register-complete',
  FORGOT_PASSWORD: 'belanjaku/auth/forgot-password',
  CONFIRM_RESET: 'belanjaku/auth/confirm-reset',
  RESET_PASSWORD: 'belanjaku/auth/reset-password',
  MESSAGE: 'belanjaku/auth/message',
  CLEAR_MESSAGE: 'belanjaku/auth/clear-message',
  LOGOUT: 'belanjaku/auth/logout',
});

export const authActions = Object.freeze({
  flow: () => ({ type: AUTH_ACTIONS.FLOW }),
  setData: (field, value) => ({
    type: AUTH_ACTIONS.SET_DATA,
    field,
    value,
  }),
  reqLogin: (value) => ({ type: AUTH_ACTIONS.REQ_LOGIN, value }),
  reqRegister: (value) => ({ type: AUTH_ACTIONS.REQ_REGISTER, value }),
  reqConfirmOtp: (value) => ({ type: AUTH_ACTIONS.REQ_CONFIRM_OTP, value }),
  reqRegisterComplete: (value) => ({ type: AUTH_ACTIONS.REQ_REGISTER_COMPLETE, value }),
  reqForgotPassword: (value) => ({ type: AUTH_ACTIONS.REQ_FORGOT_PASSWORD, value }),
  reqConfirmReset: (value) => ({ type: AUTH_ACTIONS.REQ_CONFIRM_RESET, value }),
  reqResetPassword: (value) => ({ type: AUTH_ACTIONS.REQ_RESET_PASSWORD, value }),
  login: (value) => ({ type: AUTH_ACTIONS.LOGIN, value }),
  register: (value) => ({ type: AUTH_ACTIONS.REGISTER, value }),
  confirmOtp: (value) => ({ type: AUTH_ACTIONS.CONFIRM_OTP, value }),
  registerComplete: (value) => ({ type: AUTH_ACTIONS.REGISTER_COMPLETE, value }),
  forgotPassword: (value) => ({ type: AUTH_ACTIONS.FORGOT_PASSWORD, value }),
  confirmReset: (value) => ({ type: AUTH_ACTIONS.CONFIRM_RESET, value }),
  resetPassword: () => ({ type: AUTH_ACTIONS.RESET_PASSWORD }),
  message: (value) => ({ type: AUTH_ACTIONS.MESSAGE, value }),
  clearMsg: () => ({ type: AUTH_ACTIONS.CLEAR_MESSAGE }),
  logout: () => ({ type: AUTH_ACTIONS.LOGOUT }),
});

const initalState = {
  is_authorized: false,
  confirm_register_token: null,
  confirm_reset_token: null,
  confirm_login_token: null,
  register_token: null,
  reset_token: null,
  login_token: null,
  register_email: null,
  register_phone: null,
  reset_email: null,
  reset_phone: null,
  user: null,
  loading: false,
  is_error: false,
  message: '',
};

const reducer = (state = initalState, { type, field, value }) => {
  switch (type) {
    case AUTH_ACTIONS.FLOW:
      return {
        ...state,
      };
    case AUTH_ACTIONS.SET_DATA:
      return {
        ...state,
        [field]: value,
      };
    case AUTH_ACTIONS.REQ_LOGIN:
    case AUTH_ACTIONS.REQ_REGISTER:
    case AUTH_ACTIONS.REQ_CONFIRM_OTP:
    case AUTH_ACTIONS.REQ_REGISTER_COMPLETE:
    case AUTH_ACTIONS.REQ_FORGOT_PASSWORD:
    case AUTH_ACTIONS.REQ_CONFIRM_RESET:
    case AUTH_ACTIONS.REQ_RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.REGISTER:
      return {
        ...initalState,
        confirm_register_token: value.confirm_token,
        register_email: value.register_email,
        register_phone: value.register_phone,
      };
    case AUTH_ACTIONS.CONFIRM_OTP:
      return {
        ...initalState,
        register_token: value,
        register_email: state.register_email,
        register_phone: state.register_phone,
      };
    case AUTH_ACTIONS.LOGIN:
    case AUTH_ACTIONS.REGISTER_COMPLETE:
      return {
        ...initalState,
        is_authorized: true,
        login_token: value.login_token,
        user: value.user,
      };
    case AUTH_ACTIONS.FORGOT_PASSWORD:
      return {
        ...initalState,
        confirm_reset_token: value.confirm_token,
        reset_email: value.reset_email,
        reset_phone: value.reset_phone,
      };
    case AUTH_ACTIONS.CONFIRM_RESET:
      return {
        ...initalState,
        reset_token: value,
        reset_email: state.reset_email,
        reset_phone: state.reset_phone,
      };
    case AUTH_ACTIONS.MESSAGE:
      return {
        ...state,
        loading: false,
        is_error: value.is_error,
        message: value.message,
      };
    case AUTH_ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        loading: false,
        is_error: false,
        message: '',
      };
    case AUTH_ACTIONS.RESET_PASSWORD:
    case AUTH_ACTIONS.LOGOUT:
      return initalState;
    default:
      return state;
  }
};

export default reducer;
