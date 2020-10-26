import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { authActions, AUTH_ACTIONS } from '../reducers/auth';
import authApi from '../api/auth';
import { getErrorMessage } from '../../utils/api';

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
      auth: { confirm_token },
    } = yield select();

    const {
      data: { data },
    } = yield call(authApi.confirmOtp, value, `Bearer ${confirm_token.key}`);

    if (data.register_token) {
      yield put(authActions.confirmOtp(data.register_token));
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.included === 'unmatch_otp') {
      yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
    } else {
      yield put(authActions.setData('confirm_token', null));
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

function* authSaga() {
  try {
    yield all([
      takeLatest(AUTH_ACTIONS.REQ_REGISTER, register),
      takeLatest(AUTH_ACTIONS.REQ_CONFIRM_OTP, confirmOtp),
      takeLatest(AUTH_ACTIONS.REQ_REGISTER_COMPLETE, registerComplete),
    ]);
  } catch (error) {
    yield put(authActions.message({ is_error: true, message: getErrorMessage(error) }));
  }
}

export default authSaga;
