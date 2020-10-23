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
      yield put(authActions.register(data.confirm_token));
    }
  } catch (error) {
    yield put(authActions.error(getErrorMessage(error)));
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
      yield put(authActions.error(getErrorMessage(error)));
    } else {
      yield put(authActions.setData('confirm_token', null));
      yield put(push('/register'));
    }
  }
}

function* registerComplete({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.registerComplete, value);
    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.log(getErrorMessage(error));
    yield put(authActions.error(getErrorMessage(error)));
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
    yield put(authActions.error(getErrorMessage(error)));
  }
}

export default authSaga;
