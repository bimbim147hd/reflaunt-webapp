import * as _ from 'lodash';
import { CHOOSE_PAYMENT_SUCCESSED } from './choose-payment.actions';

export const ChoosePayment = (state: any = { payment: false }, action) => {
  switch (action.type) {
    case CHOOSE_PAYMENT_SUCCESSED:
      return _.assign({}, state, {
        payment: true,
        item: action.data
      });
    default:
      return state;
  }
};
