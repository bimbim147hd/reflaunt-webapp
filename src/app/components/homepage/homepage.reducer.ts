import * as _ from 'lodash';
import {
  FETCH_PRODUCT_HOMEPAGE_SUCCESSED,
  FETCH_PRODUCT_HIGHLIGHT_SUCCESSED,
  FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED,
  FETCH_SLIDER_HOMEPAGE_SUCCESSED
} from './homepage.actions';

export const Homepage = (
  state = {
    products: { fetched: false, data: [] },
    highlight: { fetched: false },
    most_popular: { fetched: false },
    sliders: { fetched: false },
  },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_HOMEPAGE_SUCCESSED:
      return _.assign({}, state, { products: { fetched: true, data: action.data } });
    case FETCH_PRODUCT_HIGHLIGHT_SUCCESSED:
      return _.assign({}, state, { highlight: { fetched: true, data: action.data } });
    case FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED:
      return _.assign({}, state, { most_popular: { fetched: true, data: action.data } });
    case FETCH_SLIDER_HOMEPAGE_SUCCESSED:
      return _.assign({}, state, { sliders: { fetched: true, data: action.data } });
    default:
      return state;
  }
};
