import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import * as moment from 'moment';

export const swalAlert = (
  iconUrl,
  imgUrl,
  title,
  buttonText,
  callBack: Function
) => {
  return Swal.fire({
    html: `
    <div style="text-align: center;">
      <p><img src="${iconUrl}" width="60px" style="margin-top: 50px;"/></p>
      <p><img src="${imgUrl}" width="150px" style="margin-bottom: 50px; margin-top: 30px;"/></p>
      <p style="
        font-family: 'Lato';
        font-size: 19px;
        color: #000000;
        font-weight: bold;
        margin-bottom: 70px;
      ">${title}</p>
    </div>
    `,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: buttonText
  }).then(item => {
    if (item.value) {
      callBack();
    }
  });
};

export const voucherAlert = (voucher, callBack: Function) => {
  return Swal.fire({
    html: `
    <div id="voucher-popup" style="text-align: center;">
      <p><img src="/assets/images/check-icon.png" width="60px" style="margin-top: 50px; margin-bottom: 30px;"/></p>
      <p class="title">$${voucher.amount} ${
      voucher.retailer.retailer.first_name
    } ${
      voucher.retailer.retailer.last_name
    } credits has been <br /> added to your account</p>
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
      callBack();
    }
  });
};
