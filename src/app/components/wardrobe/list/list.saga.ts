import {
  FETCH_PRODUCTS_REQUESTED,
  FETCH_PRODUCTS_SUCCESSED
} from './list.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';

function* watchFetchProductsRequest() {
  yield takeLatest(FETCH_PRODUCTS_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.product.get({ per_page: 100 }).toPromise();
      yield put({ type: FETCH_PRODUCTS_SUCCESSED, data: result.items });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchFetchProductsRequest];
