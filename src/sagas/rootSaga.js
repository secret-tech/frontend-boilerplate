import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import counterSaga from './app/counterSaga';

export default function* () {
  yield all([
    fork(formActionSaga),
    fork(counterSaga)
  ]);
}
