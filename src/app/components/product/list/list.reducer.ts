import { FETCH_PRODUCT_LISTPRODUCT_SUCCESSED } from './list.actions';
import * as _ from 'lodash';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LISTPRODUCT_SUCCESSED:
      return _.assign(state, { fetched: true, items: action.data.items, pagination: action.data.pagination });

    default:
      return state;
  }
};
