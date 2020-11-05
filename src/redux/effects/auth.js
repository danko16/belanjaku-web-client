import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { authActions, AUTH_ACTIONS } from '../reducers/auth';
import authApi from '../api/auth';
import { getErrorMessage } from '../../utils/api';

function* login({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.login, value);

    if (data) {
      yield put(authActions.login({ login_token: data.token, user: data.user }));
      yield put(push('/'));
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

function* register({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.register, value);

    if (data.confirm_token) {
      const { confirm_token, email, phone } = data;
      yield put(
        authActions.register({
          confirm_token,
          register_email: email ? email : null,
          register_phone: phone ? phone : null,
        })
      );
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

function* confirmOtp({ value }) {
  try {
    const {
      auth: { confirm_register_token },
    } = yield select();

    const {
      data: { data },
    } = yield call(authApi.confirmOtp, value, `Bearer ${confirm_register_token.key}`);

    if (data.register_token) {
      yield put(authActions.confirmOtp(data.register_token));
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.included === 'show_error') {
      yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
    } else {
      yield put(authActions.setData('confirm_register_token', null));
      yield put(push('/register'));
    }
  }
}

function* registerComplete({ value }) {
  try {
    const {
      auth: { register_token },
    } = yield select();
    const {
      data: { data },
    } = yield call(authApi.registerComplete, value, `Bearer ${register_token.key}`);
    if (data) {
      yield put(authActions.registerComplete({ login_token: data.token, user: data.user }));
      yield put(push('/'));
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

function* forgotPassword({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.forgotPassword, value);

    if (data) {
      yield put(
        authActions.forgotPassword({
          confirm_token: data.confirm_token,
          reset_email: data.email,
          reset_phone: data.phone,
        })
      );
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

function* confirmReset({ value }) {
  try {
    const {
      auth: { confirm_reset_token },
    } = yield select();

    const {
      data: { data },
    } = yield call(authApi.confirmResetOtp, value, `Bearer ${confirm_reset_token.key}`);

    if (data) {
      yield put(authActions.confirmReset(data.reset_token));
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}
function* resetPassword({ value }) {
  try {
    const {
      auth: { reset_token },
    } = yield select();

    const { data } = yield call(authApi.resetPassword, value, `Bearer ${reset_token.key}`);

    if (data) {
      yield put(authActions.resetPassword());
      yield put(push('/login'));
    }
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

function* authSaga() {
  try {
    yield all([
      takeLatest(AUTH_ACTIONS.REQ_LOGIN, login),
      takeLatest(AUTH_ACTIONS.REQ_REGISTER, register),
      takeLatest(AUTH_ACTIONS.REQ_CONFIRM_OTP, confirmOtp),
      takeLatest(AUTH_ACTIONS.REQ_REGISTER_COMPLETE, registerComplete),
      takeLatest(AUTH_ACTIONS.REQ_FORGOT_PASSWORD, forgotPassword),
      takeLatest(AUTH_ACTIONS.REQ_CONFIRM_RESET, confirmReset),
      takeLatest(AUTH_ACTIONS.REQ_RESET_PASSWORD, resetPassword),
    ]);
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

export default authSaga;
