export const HOMEPAGE_COMPONENT = 'HOMEPAGE_COMPONENT';
export const FETCH_PRODUCT_HOMEPAGE_REQUESTED = 'FETCH_PRODUCT_HOMEPAGE_REQUESTED';
export const FETCH_PRODUCT_HOMEPAGE_SUCCESSED = 'FETCH_PRODUCT_HOMEPAGE_SUCCESSED';
export const FETCH_PRODUCT_HIGHLIGHT_REQUESTED = 'FETCH_PRODUCT_HIGHLIGHT_REQUESTED';
export const FETCH_PRODUCT_HIGHLIGHT_SUCCESSED = 'FETCH_PRODUCT_HIGHLIGHT_SUCCESSED';
export const FETCH_POPULAR_PRODUCT_HOMEPAGE_REQUESTED = 'FETCH_POPULAR_PRODUCT_HOMEPAGE_REQUESTED';
export const FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED = 'FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED';
export const FETCH_SLIDER_HOMEPAGE_REQUESTED = 'FETCH_SLIDER_HOMEPAGE_REQUESTED';
export const FETCH_SLIDER_HOMEPAGE_SUCCESSED = 'FETCH_SLIDER_HOMEPAGE_SUCCESSED';

export const fetchHomepageProductRequested = (payload?) => {
  return {
    type: FETCH_PRODUCT_HOMEPAGE_REQUESTED,
    data: payload
  };
};

export const fetchSliderRequested = (payload?) => {
  return {
    type: FETCH_SLIDER_HOMEPAGE_REQUESTED,
    data: payload
  };
};

export const fetchProductHightlightRequested = (payload?) => {
  return {
    type: FETCH_PRODUCT_HIGHLIGHT_REQUESTED,
    data: payload
  };
};
export const fetchMostPopularProductRequested = (payload?) => {
  return {
    type: FETCH_POPULAR_PRODUCT_HOMEPAGE_REQUESTED,
    data: payload
  };
};
