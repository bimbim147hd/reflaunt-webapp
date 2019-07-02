import * as _ from 'lodash';
import {
  CHOOSE_PAYMENT_SUCCESSED,
  GET_DETAIL_PENDING_PRODUCT_SUCCESSED,
  GET_PAYMENT_ACCOUNT_SUCCESSED
} from './choose-payment.actions';

export const ChoosePayment = (
  state: any = { fetched: false, payment: false },
  action
) => {
  switch (action.type) {
    case GET_DETAIL_PENDING_PRODUCT_SUCCESSED:
      return _.assign({}, state, {
        fetched: true,
        item: _.find(action.data, i => i.id === Number(action.productId))
      });
    case CHOOSE_PAYMENT_SUCCESSED:
      return _.assign({}, state, {
        payment: true,
        result: action.data
      });
    case GET_PAYMENT_ACCOUNT_SUCCESSED:
      return _.assign({}, state, {
        accountPayment: action.data
      });
    default:
      return state;
  }
};
