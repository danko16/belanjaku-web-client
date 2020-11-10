import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, call, put, take, takeLatest, select, cancel } from 'redux-saga/effects';
import authApi from '../api/auth';
import { authActions, AUTH_ACTIONS } from '../reducers/auth';
import { SERVER_DOMAIN } from '../../utils/api';

import authSaga from './auth';

function connect() {
  const socket = io(SERVER_DOMAIN, { transports: ['websocket', 'polling', 'flashsocket'] });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('login', () => {
      emit(authActions.setData('is_online', true));
    });
    socket.on('logout', () => {
      emit(authActions.setData('is_online', false));
    });
    socket.on('disconnect', () => {
      emit(authActions.setData('is_online', false));
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
}

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
    const socket = yield call(connect);
    yield fork(authSaga);
    const isAuthorized = yield call(isAllow);
    if (!isAuthorized) {
      yield take([AUTH_ACTIONS.LOGIN, AUTH_ACTIONS.REGISTER]);
    }

    const {
      auth: { user },
    } = yield select();

    socket.emit('login', { userId: user.id });
    const ioTask = yield fork(handleIO, socket);

    yield take(AUTH_ACTIONS.LOGOUT);
    socket.emit('logout');
    yield cancel([ioTask]);
  }
}

export default function* rootSagas() {
  yield takeLatest(AUTH_ACTIONS.FLOW, authFlow);
}
