import {
  CHOOSE_PAYMENT_REQUESTED,
  CHOOSE_PAYMENT_SUCCESSED,
  GET_PAYMENT_ACCOUNT_REQUESTED,
  GET_PAYMENT_ACCOUNT_SUCCESSED
} from './choose-payment.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';
import { swalAlert } from '../wallet.consts';
import {
  TRANSACTION_TYPE_CREDIT,
  TRANSACTION_TYPE_CASH
} from '../../../models/TransactionHistory';
import * as Cookies from 'js-cookie';
import { environment } from '../../../../environments/environment';

function* watchGetPaymentAccountRequested() {
  yield takeLatest(GET_PAYMENT_ACCOUNT_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.user
        .getBankAccount(Cookies.get(environment.authId))
        .toPromise();
      yield put({
        type: GET_PAYMENT_ACCOUNT_SUCCESSED,
        data: result
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchChoosePaymentRequested() {
  yield takeLatest(CHOOSE_PAYMENT_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    let alertText;
    let imgUrl;
    let iconUrl;
    try {
      const result = yield api.wallet.withdraw(action.data).toPromise();

      if (result.data.type === TRANSACTION_TYPE_CREDIT) {
        alertText = `$${
          result.data.amount_credit
        } Credit has been added to your <br /> Reflaunt Wallet`;
        imgUrl = '/assets/images/wallet.png';
        iconUrl = '/assets/images/check-icon.png';
      } else if (result.data.type === TRANSACTION_TYPE_CASH) {
        alertText = `$${
          result.data.amount_cash
        } cash has been transferred to your <br /> your bank account`;
        imgUrl = '/assets/images/transcation.png';
        iconUrl = '/assets/images/check-icon.png';
      }
      yield put({
        type: CHOOSE_PAYMENT_SUCCESSED,
        data: result
      });
      swalAlert(iconUrl, imgUrl, alertText, 'CONTINUE', () => {
        router.navigate(['/', 'wallet']);
      });
    } catch (e) {
      swalAlert(
        '',
        '/assets/images/warning.png',
        `${e.error.message}`,
        'GO BACK',
        () => {}
      );
    }
  });
}

export default [watchChoosePaymentRequested, watchGetPaymentAccountRequested];
