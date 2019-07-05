import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import * as moment from 'moment';

export const redeemVoucherPopup = (voucher, callBack1: Function, callBack2: Function) => {
  return Swal.fire({
    html: `
  <div id="redeem__voucher-popup">
    <div id="voucher">
      <div class="voucher_info top--voucher">
        <div class="info--item left">
          <img
            style="background-image: url(${voucher.retailer.images[0].url});
            background-size: contain;
            background-repeat: no-repeat;"
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
          <p class="valid-date">valid till ${moment(
            voucher.validity_date
          ).format('MM/DD/YYYY')}</p>
        </div>
        <div class="info--item">
          <p class="valid-date">voucher code</p>
          <p class="valid-date code">${voucher.code}</p>
        </div>
      </div>
      <div class="voucher_info terms_conditions">
        <p class="label">terms and condition</p>
        <p class="content">${voucher.terms_and_condition}</p>
      </div>
    </div>
    `,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'REDEEM VOUCHER',
    focusConfirm: false,
    confirmButtonClass: 'btn-view-voucher',
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: 'VISIT SITE'
  }).then(val => {
    if (val.value) {
      callBack1();
    } else if (val.dismiss === 'cancel') {
      callBack2();
    }
  });
};
