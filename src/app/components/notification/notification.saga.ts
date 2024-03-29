import {
  FETCH_NOTIFICATIONS_REQUESTED,
  FETCH_NOTIFICATIONS_SUCCESSED
} from './notification.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../app-injector';
import { ApiService } from '../../api/api.service';
import * as _ from 'lodash';

function* watchFetchNotificationsRequest() {
  yield takeLatest(FETCH_NOTIFICATIONS_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.notification.get({}).toPromise();
      yield api.notification
        .getMaskAsNotification(_.map(result.items, i => i.id))
        .toPromise();
      yield put({
        type: 'FETCH_NUMBER_OF_UNREAD_NOTIFICATION_REQUESTED'
      });
      yield put({
        type: FETCH_NOTIFICATIONS_SUCCESSED,
        data: result.items,
        pagination: result.pagination
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchFetchNotificationsRequest];
