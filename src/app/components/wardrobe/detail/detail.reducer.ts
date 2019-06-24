import { GET_PRODUCT_DETAIL_SUCCESSED } from './detail.actions';
import * as _ from 'lodash';

export const detail = (state = { fetched: false }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESSED:
      console.log(
        _.assign(action.data, {
          item_includes: _.chunk(action.data.item_includes, 5)
        })
      );
      return _.assign(state, {
        fetched: true,
        item: _.assign(action.data, {
          item_includes: _.chunk(action.data.item_includes, 5)
        })
      });
    default:
      return state;
  }
};
