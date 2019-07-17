import list from './list/list.saga';
import choosePayment from './choose-payment/choose-payment.saga';
import redeemVoucher from './redeem-voucher/redeem-voucher.saga';

export default [...list, ...choosePayment, ...redeemVoucher];
