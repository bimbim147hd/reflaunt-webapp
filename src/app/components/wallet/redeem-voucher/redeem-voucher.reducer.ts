import * as _ from 'lodash';
import {
  FETCH_USER_WALLET_VOUCHERS_COM_SUCCESSED,
  CHOOSE_BRANCH_REQUESTED,
  GET_VOUCHERS_SUCCESSED
} from './redeem-voucher.actions';

export const RedeemVoucher = (
  state: any = { fetched: false, choosedBranch: undefined },
  action
) => {
  switch (action.type) {
    case FETCH_USER_WALLET_VOUCHERS_COM_SUCCESSED:
      action.data.wallet_detail = _.map(action.data.wallet_detail, i => {
        if (i.retailer_logo === '' || !i.retailer_logo) {
          i.retailer_logo = '/assets/images/17-512.png';
        }
        return i;
      });
      return _.assign({}, state, {
        fetched: true,
        wallet: action.data
      });
    case CHOOSE_BRANCH_REQUESTED:
      return _.assign({}, state, {
        choosedBranch: _.assign({}, action.data, {
          current_amount: action.data.amount_credit
        }),
        wallet: _.assign({}, state.wallet, {
          wallet_detail: _.map(state.wallet.wallet_detail, i => {
            delete i.choosed;
            if (i.id === action.data.id) {
              i.choosed = true;
            }
            return i;
          })
        })
      });
    case GET_VOUCHERS_SUCCESSED:
      return _.assign({}, state, {
        choosedBranch: undefined,
        voucher: action.data
      });
    default:
      return state;
  }
};
