import {
  CHOOSE_PAYMENT_REQUESTED,
  CHOOSE_PAYMENT_SUCCESSED
} from './choose-payment.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import Notification from '@vicoders/support/services/Notification';
import { Router } from '@angular/router';

function* watchChoosePaymentRequested() {
  yield takeLatest(CHOOSE_PAYMENT_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.wallet.withdraw(action.data).toPromise();
      yield put({
        type: CHOOSE_PAYMENT_SUCCESSED,
        data: result
      });
      Notification.show('success', `Choose Payment Success`, 5000);
      router.navigate(['/', 'wallet']);
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchChoosePaymentRequested];
