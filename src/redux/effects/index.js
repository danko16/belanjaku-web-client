import { fork } from 'redux-saga/effects';

import authSaga from './auth';

export default function* rootSagas() {
  yield fork(authSaga);
}
