import { Router, ActivatedRoute } from '@angular/router';
import { API_CALL_ERROR } from './../../../store/action';
import { AppInjector } from './../../../app-injector';
import { takeEvery, put, takeLatest, select, call } from 'redux-saga/effects';
import { LOGIN_REQUESTED, LOGIN_SUCCEEDED, FETCH_LOGIN_DETAIL_REQUESTED, FETCH_LOGIN_DETAIL_SUCCEEDED } from './login.actions';
import { ApiService } from '../../../api/api.service';
import * as Cookies from 'js-cookie';
import { environment } from '../../../../environments/environment';
import Notification from '@vicoders/support/services/Notification';
import * as _ from 'lodash';
import { redirectAfterLoginRouter } from '../auth.const';

function parseQuery(queryString) {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function* watchLoginRequest() {
  yield takeEvery(LOGIN_REQUESTED, function*(action: any) {
    try {
      const result = yield AppInjector.get(ApiService)
        .auth.login(action.data)
        .toPromise();
      yield put({ type: LOGIN_SUCCEEDED, data: result });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchLoginSuccessed() {
  yield takeLatest(LOGIN_SUCCEEDED, function*(action: any) {
    Cookies.set(environment.jwtTokenKey, action.data.token, { path: '/' });
    Notification.show('success', 'Login Success', 5000);
    yield put({ type: FETCH_LOGIN_DETAIL_REQUESTED });
  });
}

function* redirect(action) {
  const router = AppInjector.get(Router);
  const activatedRouter = AppInjector.get(ActivatedRoute);
  if (!_.isUndefined(activatedRouter.snapshot.queryParams.redirect)) {
    const queryParams = parseQuery(activatedRouter.snapshot.queryParams.search);
    router.navigateByUrl(decodeURIComponent(activatedRouter.snapshot.queryParams.redirect), { queryParams });
  } else {
    router.navigate(redirectAfterLoginRouter());
  }
}

function* watchFetchLoginDetailSuccessed() {
  yield takeLatest(FETCH_LOGIN_DETAIL_SUCCEEDED, redirect);
}

export function* loggedInUser() {
  const api = AppInjector.get(ApiService);
  const fetched = yield select((state: any) => state.Auth.login.fetched);
  if (!fetched) {
    try {
      const result = yield api.user.profile({ includes: 'roles' }).toPromise();
      return result;
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  } else {
    return yield select((state: any) => state.Auth.login.profile);
  }
}

function* fetchProfileDetail(action) {
  const profile = yield call(loggedInUser);
  yield put({ type: FETCH_LOGIN_DETAIL_SUCCEEDED, data: profile });
}

function* watchFetchProfileRequest() {
  yield takeLatest(FETCH_LOGIN_DETAIL_REQUESTED, fetchProfileDetail);
}

export default [watchLoginRequest, watchLoginSuccessed, watchFetchLoginDetailSuccessed, watchFetchProfileRequest];
