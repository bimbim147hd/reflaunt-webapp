import { takeEvery, fork, all } from 'redux-saga/effects';
import main from '../components/main.saga';
import auth from '../components/auth/auth.saga';
import Homepage from '../components/homepage/homepage.saga';
import { API_CALL_ERROR } from './action';
import Loader from '@vicoders/support/services/Loader';
import Notification from '@vicoders/support/services/Notification';

function* watchApiCallError() {
  yield takeEvery(API_CALL_ERROR, function*(action) {
    Loader.hide();
    if ((action as any).error !== undefined) {
      if ((action as any).error.error !== undefined && (action as any).error.error.message !== undefined) {
        Notification.show('warning', (action as any).error.error.message, 5000);
      }
    }
  });
}

export default function* sagas() {
  yield all([...main, ...auth, ...Homepage, watchApiCallError].map(item => fork(item)));
}
