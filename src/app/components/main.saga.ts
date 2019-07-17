import { put, fork, takeLatest, select } from 'redux-saga/effects';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_SUCCEEDED } from './auth/login/login.actions';
import { AppMenunItems } from './app-menu-items';
import { ApiService } from '../api/api.service';
import { AppInjector } from '../app-injector';

function* initAppMenu(action) {
  const MenuItems = AppMenunItems;
  yield put({
    type: 'INIT_APP_MENU',
    data: MenuItems,
    user: action.data
  });
}

function* watchFetchLoginDetailSuccessed() {
  yield takeLatest(FETCH_LOGIN_DETAIL_SUCCEEDED, initAppMenu);
}

function* swapAppMenu(action) {
  yield put({
    type: 'INIT_APP_MENU',
    data: yield select(state => (state as any).RootReducer.MenuItems),
    user: yield select(state => (state as any).Auth.login.profile),
    levelMenu: action.levelMenu,
    isShowBtnSettings: yield select(
      state => !(state as any).RootReducer.isShowBtnSettings
    )
  });
}

function* watchSwapAppMenu() {
  yield takeLatest('SHOW_MENU_BY_LEVEL_REQUESTED', swapAppMenu);
}

function* watchGetUnreadRequest() {
  yield takeLatest('FETCH_NUMBER_OF_UNREAD_MESSAGE_REQUESTED', function*(
    action: any
  ) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.inbox.getNoUnreadMessage().toPromise();
      yield put({
        type: 'FETCH_NUMBER_OF_UNREAD_MESSAGE_SUCCEEDED',
        data: result
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchGetUnreadNotificationRequest() {
  yield takeLatest('FETCH_NUMBER_OF_UNREAD_NOTIFICATION_REQUESTED', function*(
    action: any
  ) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.notification
        .getNoUnreadNotification()
        .toPromise();
      yield put({
        type: 'FETCH_NUMBER_OF_UNREAD_NOTIFICATION_SUCCEEDED',
        data: result
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [
  watchFetchLoginDetailSuccessed,
  watchSwapAppMenu,
  watchGetUnreadRequest,
  watchGetUnreadNotificationRequest
];
