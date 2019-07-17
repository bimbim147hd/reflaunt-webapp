import { API_CALL_ERROR } from '../../../store/action';
import { AppInjector } from '../../../app-injector';
import { put, takeLatest } from 'redux-saga/effects';
import { REGISTER_REQUESTED, REGISTER_SUCCESSED } from './register.actions';
import { ApiService } from '../../../api/api.service';
import * as Cookies from 'js-cookie';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

function parseQuery(queryString) {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function* watchRegisterRequested() {
  yield takeLatest(REGISTER_REQUESTED, function*(action: any) {
    try {
      const api = AppInjector.get(ApiService);
      const result = yield api.auth.register(action.data).toPromise();
      yield put({ type: REGISTER_SUCCESSED, data: result });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchRegisterSuccessed() {
  yield takeLatest(REGISTER_SUCCESSED, function*(action: any) {
    Cookies.set(environment.jwtTokenKey, action.data.token, { path: '/' });
    const router = AppInjector.get(Router);
    const activatedRouter = AppInjector.get(ActivatedRoute);
    if (!_.isUndefined(activatedRouter.snapshot.queryParams.redirect)) {
      const queryParams = parseQuery(activatedRouter.snapshot.queryParams.search);
      router.navigateByUrl(decodeURIComponent(activatedRouter.snapshot.queryParams.redirect), { queryParams });
    } else {
      router.navigate(['/']);
    }
  });
}

export default [watchRegisterRequested, watchRegisterSuccessed];
