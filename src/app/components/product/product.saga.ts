import { put, select, takeLatest, call } from 'redux-saga/effects';
import * as _ from 'lodash';
import detail from './detail/detail.saga';
import { FETCH_PRODUCT_REQUESTED, FETCH_PRODUCT_SUCCESSED } from './product.action';
import { ApiService } from '../../api/api.service';
import { AppInjector } from '../../app-injector';
import list from './list/list.saga';
// import { list } from './list/list.reducer';

export const fetchProduct = function*(params?) {
  params = params || {};
  const result = yield AppInjector.get(ApiService)
    .product.get(params)
    .toPromise();
  return result;
};

export const fetchAllProduct = function*(params?) {
  params = params || {};
  const result = yield AppInjector.get(ApiService)
    .product.list(params)
    .toPromise();
  return result;
};

function* watchFetchProductRequest() {
  yield takeLatest(FETCH_PRODUCT_REQUESTED, function*(action: any) {
    try {
      const products = yield call(fetchProduct);
      yield put({ type: FETCH_PRODUCT_SUCCESSED, data: products });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [  ...list, ...detail, watchFetchProductRequest];
