import { fork, call, put, take, takeLatest } from 'redux-saga/effects';
import authApi from '../api/auth';
import { authActions, AUTH_ACTIONS } from '../reducers/auth';

import authSaga from './auth';

function* isAllow() {
  try {
    yield call(authApi.isAllow);
    return true;
  } catch (error) {
    yield put(authActions.logout());
    return false;
  }
}

function* authFlow() {
  while (true) {
    yield fork(authSaga);
    const isAuthorized = yield call(isAllow);
    if (!isAuthorized) {
      yield take([AUTH_ACTIONS.LOGIN, AUTH_ACTIONS.REGISTER]);
    }

    yield take(AUTH_ACTIONS.LOGOUT);
  }
}

export default function* rootSagas() {
  yield takeLatest(AUTH_ACTIONS.FLOW, authFlow);
}
