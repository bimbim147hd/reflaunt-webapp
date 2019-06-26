import {
  GET_PRODUCT_DETAIL_REQUESTED,
  GET_PRODUCT_DETAIL_SUCCESSED
} from './detail.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';

function* watchFetchProductDetailRequest() {
  yield takeLatest(GET_PRODUCT_DETAIL_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.product.show(action.data.id).toPromise();
      switch (action.com) {
        case 'PENDING_LISTING_COM':
          yield put({ type: GET_PRODUCT_DETAIL_SUCCESSED, data: result });
          break;
        case 'SELLING_DETAIL_COM':
          yield put({ type: GET_PRODUCT_DETAIL_SUCCESSED, data: result });
          break;
        case 'EDIT_PENDING_LISTING_COM':
          yield put({ type: GET_PRODUCT_DETAIL_SUCCESSED, data: result });
          break;
        case 'PENDING_SHIPMENT_COM':
          yield put({ type: GET_PRODUCT_DETAIL_SUCCESSED, data: result });
          break;
        default:
          yield put({ type: GET_PRODUCT_DETAIL_SUCCESSED, data: result });
      }
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchFetchProductDetailRequest];
