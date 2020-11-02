export const AUTH_ACTIONS = Object.freeze({
  SET_DATA: 'belanjaku/auth/set-data',
  REQ_LOGIN: 'belanjaku/auth/req/login',
  REQ_REGISTER: 'belanjaku/auth/req/register',
  REQ_CONFIRM_OTP: 'belanjaku/auth/req/confirm-otp',
  REQ_REGISTER_COMPLETE: 'belanjaku/auth/req/register-complete',
  LOGIN: 'belanjaku/auth/login',
  REGISTER: 'belanjaku/auth/register',
  CONFIRM_OTP: 'belanjaku/auth/confirm-otp',
  REGISTER_COMPLETE: 'belanjaku/auth/register-complete',
  MESSAGE: 'belanjaku/auth/message',
  CLEAR_MESSAGE: 'belanjaku/auth/clear-message',
  LOGOUT: 'belanjaku/auth/logout',
});

export const authActions = Object.freeze({
  setData: (field, value) => ({
    type: AUTH_ACTIONS.SET_DATA,
    field,
    value,
  }),
  reqLogin: (value) => ({
    type: AUTH_ACTIONS.REQ_LOGIN,
    value,
  }),
  reqRegister: (value) => ({
    type: AUTH_ACTIONS.REQ_REGISTER,
    value,
  }),
  reqConfirmOtp: (value) => ({
    type: AUTH_ACTIONS.REQ_CONFIRM_OTP,
    value,
  }),
  reqRegisterComplete: (value) => ({
    type: AUTH_ACTIONS.REQ_REGISTER_COMPLETE,
    value,
  }),
  login: (value) => ({
    type: AUTH_ACTIONS.LOGIN,
    value,
  }),
  register: (value) => ({
    type: AUTH_ACTIONS.REGISTER,
    value,
  }),
  confirmOtp: (value) => ({
    type: AUTH_ACTIONS.CONFIRM_OTP,
    value,
  }),
  registerComplete: (value) => ({
    type: AUTH_ACTIONS.REGISTER_COMPLETE,
    value,
  }),
  message: (value) => ({
    type: AUTH_ACTIONS.MESSAGE,
    value,
  }),
  clearMsg: () => ({
    type: AUTH_ACTIONS.CLEAR_MESSAGE,
  }),
  logout: () => ({ type: AUTH_ACTIONS.LOGOUT }),
});

const initalState = {
  is_authorized: false,
  confirm_token: null,
  register_token: null,
  register_email: null,
  register_phone: null,
  login_token: null,
  user: null,
  loading: false,
  is_error: false,
  message: '',
};

const reducer = (state = initalState, { type, field, value }) => {
  switch (type) {
    case AUTH_ACTIONS.SET_DATA:
      return {
        ...state,
        [field]: value,
      };
    case AUTH_ACTIONS.REQ_LOGIN:
    case AUTH_ACTIONS.REQ_REGISTER:
    case AUTH_ACTIONS.REQ_CONFIRM_OTP:
    case AUTH_ACTIONS.REQ_REGISTER_COMPLETE:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.REGISTER:
      return {
        ...state,
        is_authorized: false,
        login_token: null,
        user: null,
        confirm_token: value.confirm_token,
        register_email: value.register_email,
        register_phone: value.register_phone,
        register_token: null,
        loading: false,
        is_error: false,
      };
    case AUTH_ACTIONS.CONFIRM_OTP:
      return {
        ...state,
        is_authorized: false,
        login_token: null,
        user: null,
        confirm_token: null,
        register_token: value,
        loading: false,
        is_error: false,
      };
    case AUTH_ACTIONS.LOGIN:
    case AUTH_ACTIONS.REGISTER_COMPLETE:
      return {
        ...state,
        is_authorized: true,
        login_token: value.login_token,
        user: value.user,
        confirm_token: null,
        register_token: null,
        register_email: null,
        register_phone: null,
        loading: false,
        is_error: false,
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
    case AUTH_ACTIONS.LOGOUT:
      return initalState;
    default:
      return state;
  }
};

export default reducer;
