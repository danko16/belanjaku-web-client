import { all, takeLatest, put, call } from 'redux-saga/effects';
import { authActions, AUTH_ACTIONS } from '../reducers/auth';
import authApi from '../api/auth';
import { getErrorMessage } from '../../utils/api';

function* register({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.register, value);

    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.log(getErrorMessage(error));
    yield put(authActions.error(getErrorMessage(error)));
  }
}

function* confirmOtp({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.confirmOtp, value.payload, value.token);
    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.log(getErrorMessage(error));
    yield put(authActions.error(getErrorMessage(error)));
  }
}

function* registerComplete({ value }) {
  try {
    const {
      data: { data },
    } = yield call(authApi.registerComplete, value.payload, value.token);
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
