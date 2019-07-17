import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PRODUCT_DETAIL_REQUESTED,
  FETCH_PRODUCT_DETAIL_SUCCESSED,
  PRODUCT_DETAIL_COMPONENT
} from './detail.actions';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';


function* watchFetchProductDetailRequest() {
  yield takeLatest(FETCH_PRODUCT_DETAIL_REQUESTED, function*(action: any) {
    try {
      const result = yield AppInjector.get(ApiService)
        .product.getProductBySlug(action.data)
        .toPromise();

      yield put({ type: FETCH_PRODUCT_DETAIL_SUCCESSED, data: result , component: action.component});
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [
  watchFetchProductDetailRequest
];
