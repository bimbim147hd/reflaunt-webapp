import { takeLatest, put } from 'redux-saga/effects';
import {
  GET_VOUCHERS_REQUESTED,
  GET_VOUCHERS_SUCCESSED
} from './redeem-voucher.actions';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { FETCH_USER_WALLET_REQUESTED } from '../list/list.actions';
import { voucherAlert } from '../wallet.consts';
import { Router } from '@angular/router';
function* watchGetVouchersRequested() {
  yield takeLatest(GET_VOUCHERS_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.voucher.getVouchers(action.data).toPromise();
      const voucher = yield api.voucher.show(result.id).toPromise();
      voucherAlert(voucher, () => {
        router.navigate(['/', 'wardrobe', 'vouchers']);
      });
      yield put({
        type: GET_VOUCHERS_SUCCESSED,
        data: result
      });
      yield put({
        type: FETCH_USER_WALLET_REQUESTED,
        com: 'REDEEM_VOUCHER'
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchGetVouchersRequested];
