import {
  FETCH_USER_WALLET_REQUESTED,
  FETCH_USER_WALLET_ERRORS,
  FETCH_USER_WALLET_SUCCESSED,
  FETCH_PENDING_PRODUCTS_SUCCESSED
} from './list.actions';
import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { GET_DETAIL_PENDING_PRODUCT_SUCCESSED } from '../choose-payment/choose-payment.actions';
import { GET_DETAIL_PAYMENT_SUCCESSED } from '../detail-past-payment/detail-past-payment.actions';
import { FETCH_USER_WALLET_VOUCHERS_COM_SUCCESSED } from '../redeem-voucher/redeem-voucher.actions';

function* watchFetchUserWalletRequest() {
  yield takeLatest(FETCH_USER_WALLET_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.wallet.getUserWallet().toPromise();
      switch (action.com) {
        case 'DETAIL_PAYMENT':
          yield put({
            type: FETCH_USER_WALLET_SUCCESSED,
            data: result,
            productId: action.productId,
            com: action.com
          });
          break;
        case 'REDEEM_VOUCHER':
          yield put({
            type: FETCH_USER_WALLET_VOUCHERS_COM_SUCCESSED,
            data: result
          });
          break;
        default:
          yield put({
            type: FETCH_USER_WALLET_SUCCESSED,
            data: result
          });
      }
    } catch (e) {
      // tslint:disable-next-line:quotemark
      if (e.error.message === "Cannot read property 'id' of null") {
        yield put({ type: FETCH_USER_WALLET_ERRORS });
      } else {
        yield put({ type: 'API_CALL_ERROR', error: e });
      }
    }
  });
}

function* watchFetchUserWalletSuccessed() {
  yield takeLatest(FETCH_USER_WALLET_SUCCESSED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const pendingProducts = yield api.wallet.getPendingProducts().toPromise();
      const historyTransactions = yield api.wallet
        .getHistoryTransactions()
        .toPromise();

      switch (action.com) {
        case 'CHOOSE_PAYMENT_COM':
          yield put({
            type: GET_DETAIL_PENDING_PRODUCT_SUCCESSED,
            data: pendingProducts,
            productId: action.productId
          });
          break;
        case 'DETAIL_PAYMENT':
          yield put({
            type: GET_DETAIL_PAYMENT_SUCCESSED,
            data: historyTransactions,
            productId: action.productId
          });
          break;
        default:
          yield put({
            type: FETCH_PENDING_PRODUCTS_SUCCESSED,
            pendingProducts: pendingProducts,
            historyTransactions: historyTransactions
          });
      }
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchFetchUserWalletRequest, watchFetchUserWalletSuccessed];
