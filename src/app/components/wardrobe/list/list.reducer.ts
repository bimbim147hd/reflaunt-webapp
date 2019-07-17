import { FETCH_PRODUCTS_SUCCESSED } from './list.actions';
import * as _ from 'lodash';
import { PENDING_STATUS, SOLD_STATUS } from '../../../models/Product';

export const list = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESSED:
      return _.assign(state, {
        fetched: true,
        items: action.data,
        pendingProdutcs: _.filter(
          action.data,
          i =>
            !_.isEmpty(
              _.filter(i.product_meta, o => o.status_id === PENDING_STATUS)
            )
        ),
        soldProducts: _.filter(
          action.data,
          i =>
            !_.isEmpty(
              _.filter(i.product_meta, o => o.status_id === SOLD_STATUS)
            )
        ),
        totalValueMade: _.sumBy(action.data, function(o) {
          return o.price.price;
        }),
        totalPotentialValue: _.sumBy(action.data, function(o) {
          return (
            o.price.price +
            o.price.price * (o.retailer.retailer.default_percentage / 100)
          );
        })
      });
    default:
      return state;
  }
};
