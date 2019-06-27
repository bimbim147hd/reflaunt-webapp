import * as _ from 'lodash';
import {
  FETCH_USER_WALLET_ERRORS,
  FETCH_USER_WALLET_SUCCESSED,
  FETCH_PENDING_PRODUCTS_SUCCESSED
} from './list.actions';

export const List = (
  state: any = { walletExist: false, fetched: false, items: [] },
  action
) => {
  switch (action.type) {
    case FETCH_USER_WALLET_ERRORS:
      return _.assign({}, state, {
        walletExist: false,
        items: action.data
      });
    case FETCH_USER_WALLET_SUCCESSED:
      return _.assign({}, state, {
        walletExist: true,
        wallet: action.data
      });
    case FETCH_PENDING_PRODUCTS_SUCCESSED:
      return _.assign({}, state, {
        fetched: true,
        pendingProducts: action.pendingProducts,
        historyTransactions: action.historyTransactions
      });
    default:
      return state;
  }
};
