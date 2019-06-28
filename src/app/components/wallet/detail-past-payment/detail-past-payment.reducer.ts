import { GET_DETAIL_PAYMENT_SUCCESSED } from './detail-past-payment.actions';
import * as _ from 'lodash';

export const DetailPayment = (state: any = { fetched: false }, action) => {
  switch (action.type) {
    case GET_DETAIL_PAYMENT_SUCCESSED:
      return _.assign({}, state, {
        fetched: true,
        item: _.find(action.data, i => i.id === Number(action.productId))
      });
    default:
      return state;
  }
};
