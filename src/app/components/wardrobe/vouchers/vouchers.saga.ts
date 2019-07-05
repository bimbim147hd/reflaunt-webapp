import { takeLatest, put } from 'redux-saga/effects';
import {
  GET_ALL_VOUCHERS_REQUESTED,
  GET_ALL_VOUCHERS_SUCCESSED,
  REDEEM_VOUCHER_REQUESTED,
  REDEEM_VOUCHER_SUCCESSED
} from './vouchers.actions';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';

function* watchFetchAllVoucherRequest() {
  yield takeLatest(GET_ALL_VOUCHERS_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.voucher.list().toPromise();
      yield put({ type: GET_ALL_VOUCHERS_SUCCESSED, data: result });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchRedeemVoucherRequest() {
  yield takeLatest(REDEEM_VOUCHER_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      yield api.voucher.markAsRedeem(action.data.id).toPromise();
      yield put({ type: GET_ALL_VOUCHERS_REQUESTED });
      yield put({ type: REDEEM_VOUCHER_SUCCESSED });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}
export default [watchFetchAllVoucherRequest, watchRedeemVoucherRequest];
