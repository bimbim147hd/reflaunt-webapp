import { takeEvery, put } from 'redux-saga/effects';
import {
  RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED,
  UPDATE_INPUTS_ACCOUNT_PAYMENT_FORM_REQUESTED,
  SAVE_BANK_ACCOUNT_DETAIL_REQUESTED,
  SAVE_BANK_ACCOUNT_DETAIL_SUCCESSED,
  UPDATE_PAYMENT_ACCOUNT_FROM_REQUESTED,
  UPDATE_BANK_ACCOUNT_DETAIL_REQUESTED,
  UPDATE_BANK_ACCOUNT_DETAIL_SUCCESSED,
  RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED,
  UPDATE_INPUTS_ADDRESS_LANDING_PAGE_REQUESTED,
  UPDATE_SELLER_CONFIRM_ADDRESS_FROM_REQUESTED,
  SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED,
  SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_SUCCESSED,
  GET_DEFAULT_ADDRESS_REQUESTED
} from './add.actions';
import * as _ from 'lodash';
import { Countries } from './countries';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { Router } from '@angular/router';
import { API_CALL_ERROR } from '../../../store/action';
import { environment } from '../../../../environments/environment';
import * as Cookies from 'js-cookie';

function* watchRenderAccountPaymnetFormRequest() {
  yield takeEvery(RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED, function*(
    action: any
  ) {
    const COUNTRIES = Countries;
    const optionsData = {
      country: _.map(COUNTRIES, (item, key) =>
        _.assign(item, { value: item.name, label: item.name })
      )
    };
    yield put({
      type: UPDATE_INPUTS_ACCOUNT_PAYMENT_FORM_REQUESTED,
      data: optionsData
    });
  });
}

function* watchGetBankAccountDetailRequest() {
  yield takeEvery(UPDATE_INPUTS_ACCOUNT_PAYMENT_FORM_REQUESTED, function*(
    action: any
  ) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.user
        .getBankAccount(Cookies.get(environment.authId))
        .toPromise();
      if (Object.keys(result).length > 0) {
        yield put({
          type: UPDATE_PAYMENT_ACCOUNT_FROM_REQUESTED,
          data: result
        });
      }
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

function* watchCreateAccountPaymnetRequest() {
  yield takeEvery(SAVE_BANK_ACCOUNT_DETAIL_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.user
        .createAccountPayment(action.user_id, action.data)
        .toPromise();
      yield put({
        type: SAVE_BANK_ACCOUNT_DETAIL_SUCCESSED,
        data: result
      });
      router.navigate(action.redirectTo.url, {
        queryParams: action.redirectTo.params
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchUpdateAccountPaymnetRequest() {
  yield takeEvery(UPDATE_BANK_ACCOUNT_DETAIL_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.user
        .updateAccountPayment(action.user_id, action.data)
        .toPromise();
      yield put({
        type: UPDATE_BANK_ACCOUNT_DETAIL_SUCCESSED,
        data: result
      });
      router.navigate(action.redirectTo.url, {
        queryParams: action.redirectTo.params
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* renderForm(action) {
  const COUNTRIES = Countries;
  const optionsData = {
    country: _.map(COUNTRIES, (item, key) =>
      _.assign(item, { value: item.name, label: item.name })
    )
  };
  yield put({
    type: UPDATE_INPUTS_ADDRESS_LANDING_PAGE_REQUESTED,
    data: optionsData
  });
  yield put({
    type: GET_DEFAULT_ADDRESS_REQUESTED,
  });
}

function* watchRenderAddressLandingPageFormRequest() {
  yield takeEvery(RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED, renderForm);
}

function* watchGetDefaultAddressRequest() {
  yield takeEvery(GET_DEFAULT_ADDRESS_REQUESTED, function*(
    action: any
  ) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.user
        .getDefaultAddress(Cookies.get(environment.authId))
        .toPromise();
      if (Object.keys(result).length > 0) {
        yield put({
          type: UPDATE_SELLER_CONFIRM_ADDRESS_FROM_REQUESTED,
          data: result
        });
      }
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchSaveSellerConfirmAddressDetailRequest() {
  yield takeEvery(SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED, function*(
    action: any
  ) {
    const api = AppInjector.get(ApiService);
    try {
      yield api.user.saveAddress(action.data).toPromise();
      window.scrollTo(0, 0);
      yield put({ type: SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_SUCCESSED });
    } catch (e) {
      yield put({ type: API_CALL_ERROR, error: e });
    }
  });
}

export default [
  watchRenderAccountPaymnetFormRequest,
  watchCreateAccountPaymnetRequest,
  watchGetBankAccountDetailRequest,
  watchUpdateAccountPaymnetRequest,
  watchRenderAddressLandingPageFormRequest,
  watchGetDefaultAddressRequest,
  watchSaveSellerConfirmAddressDetailRequest
];
