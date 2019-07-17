import * as _ from 'lodash';
import {
  GET_ALL_VOUCHERS_SUCCESSED,
  REDEEM_VOUCHER_SUCCESSED
} from './vouchers.actions';

export const Voucher = (
  state = { fetched: false, redeemed: false },
  action
) => {
  switch (action.type) {
    case GET_ALL_VOUCHERS_SUCCESSED:
      return _.assign(state, {
        fetched: true,
        items: action.data,
        availableItems: _.filter(action.data, i => !i.redeem_date),
        redeemedItems: _.filter(action.data, i => i.redeem_date)
      });
    case REDEEM_VOUCHER_SUCCESSED:
      return _.assign(state, {
        redeemed: true
      });
    default:
      return state;
  }
};
