import list from './list/list.saga';
import choosePayment from './choose-payment/choose-payment.saga';

export default [...list, ...choosePayment];
