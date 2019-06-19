import * as _ from 'lodash';
import {
    FETCH_PRODUCT_DETAIL_SUCCESSED,
    PRODUCT_DETAIL_COMPONENT
} from './detail.actions';

export const DetailProduct = (
  state = {
    product: { fetched: false, data: [] }
  },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAIL_SUCCESSED:
      if (!_.isNil(action.component)) {
        switch (action.component) {
          case PRODUCT_DETAIL_COMPONENT:

            return _.assign({}, state, { product: { fetched: true, data: action.data } });
        }
      }
      return _.assign({}, state);

    default:
      return state;
  }
};


