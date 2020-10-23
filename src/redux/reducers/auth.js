export const AUTH_ACTIONS = Object.freeze({
  SET_DATA: 'belanjaku/auth/set-data',
  REQ_REGISTER: 'belanjaku/auth/req/register',
  REQ_CONFIRM_OTP: 'belanjaku/auth/req/confirm-otp',
  REQ_REGISTER_COMPLETE: 'belanjaku/auth/req/register-complete',
  REGISTER: 'belanjaku/auth/register',
  CONFIRM_OTP: 'belanjaku/auth/confirm-otp',
  REGISTER_COMPLETE: 'belanjaku/auth/register-complete',
  ERROR: 'belanjaku/auth/error',
  CLEAR_ERROR: 'belanjaku/auth/clear-error',
});

export const authActions = Object.freeze({
  setData: (field, value) => ({
    type: AUTH_ACTIONS.SET_DATA,
    field,
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
  register: (value) => ({
    type: AUTH_ACTIONS.REGISTER,
    value,
  }),
  confirmOtp: (value) => ({
    type: AUTH_ACTIONS.CONFIRM_OTP,
    value,
  }),
  registerComplete: () => ({
    type: AUTH_ACTIONS.REGISTER_COMPLETE,
  }),
  error: (value) => ({
    type: AUTH_ACTIONS.ERROR,
    value,
  }),
  clearError: () => ({
    type: AUTH_ACTIONS.CLEAR_ERROR,
  }),
});

const initalState = {
  is_authorized: false,
  confirm_token: null,
  register_token: null,
  login_token: null,
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
        confirm_token: value,
        register_token: null,
        loading: false,
        is_error: false,
      };
    case AUTH_ACTIONS.CONFIRM_OTP:
      return {
        ...state,
        confirm_token: null,
        register_token: value,
        loading: false,
        is_error: false,
      };
    case AUTH_ACTIONS.REGISTER_COMPLETE:
      return {
        ...state,
        confirm_token: null,
        register_token: null,
        loading: false,
        is_error: false,
      };
    case AUTH_ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        is_error: true,
        message: value,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        is_error: false,
        message: '',
      };
    default:
      return state;
  }
};

export default reducer;
