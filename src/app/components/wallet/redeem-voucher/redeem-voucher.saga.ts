import { takeLatest, put } from 'redux-saga/effects';
import {
  GET_VOUCHERS_REQUESTED,
  GET_VOUCHERS_SUCCESSED
} from './redeem-voucher.actions';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { FETCH_USER_WALLET_REQUESTED } from '../list/list.actions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
function* watchGetVouchersRequested() {
  yield takeLatest(GET_VOUCHERS_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.voucher.getVouchers(action.data).toPromise();
      const voucher = yield api.voucher.show(result.id).toPromise();
      Swal.fire({
        html: `
        <div id="voucher-popup" style="text-align: center;">
          <p class="title">$${voucher.amount} ${
          voucher.retailer.retailer.first_name
        } ${
          voucher.retailer.retailer.last_name
        } credits has been <br /> added to your account</p>
          <div id="voucher">
            <div class="voucher_info top--voucher">
              <div class="info--item left">
                <img
                  style="background-image: url(${
                    voucher.retailer.images[0].url
                  });
                  background-size: contain;
                  background-repeat: no-repeat;
                  background-position: center;"
                  src="/assets/images/98x30.png"
                  alt=""
                />
              </div>
              <div class="info--item right">
                <p class="amount">$${voucher.amount}<span>with</span></p>
                <p class="branch">${voucher.brand}</p>
              </div>
            </div>
            <div class="voucher_info bottom--voucher">
              <div class="info--item">
                <p class="valid-date">valid till ${voucher.validity_date}</p>
              </div>
              <div class="info--item">
                <p class="valid-date">voucher code</p>
                <p class="valid-date code">${voucher.code}</p>
              </div>
            </div>
          </div>
        </div>
        `,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'View voucher',
        focusConfirm: false,
        confirmButtonClass: 'btn-view-voucher',
        showCloseButton: true
      }).then(item => {
        if (item.value) {
        }
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
