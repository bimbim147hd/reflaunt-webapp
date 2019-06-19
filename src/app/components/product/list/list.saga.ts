import { FETCH_PRODUCT_LISTPRODUCT_REQUESTED, FETCH_PRODUCT_LISTPRODUCT_SUCCESSED } from './list.actions';
import * as _ from 'lodash';
import { put, takeLatest, call } from 'redux-saga/effects';
import { AppInjector } from 'src/app/app-injector';
import { ApiService } from 'src/app/api/api.service';


export const fetchProduct = function*(params?) {
  params = params || {};

  const result = yield AppInjector.get(ApiService)
    .product.get(params)
    .toPromise();
  return result;
};

function* watchFetchDataRequest() {
  yield takeLatest(FETCH_PRODUCT_LISTPRODUCT_REQUESTED, function*(action: any) {
    try {
      const products = yield call(fetchProduct, action.data);
      yield put({ type: FETCH_PRODUCT_LISTPRODUCT_SUCCESSED, data: products });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [
  watchFetchDataRequest
];
