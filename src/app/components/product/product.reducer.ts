import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { GET_ALL_PRODUCT_SUCCESSED } from './product.action';
import { DetailProduct } from './detail/detail.reducer';
const all = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_SUCCESSED:
      return {
        fetched: true,
        items: [...action.data]
      };
    default:
      return state;
  }
};
export const Product = combineReducers({list, all, DetailProduct });
