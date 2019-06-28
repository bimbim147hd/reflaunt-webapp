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

function* watchFetchUserWalletRequest() {
  yield takeLatest(FETCH_USER_WALLET_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.wallet.getUserWallet().toPromise();
      yield put({ type: FETCH_USER_WALLET_SUCCESSED, data: result });
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
