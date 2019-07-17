import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_PRODUCT_HOMEPAGE_REQUESTED,
  FETCH_PRODUCT_HOMEPAGE_SUCCESSED,
  FETCH_PRODUCT_HIGHLIGHT_REQUESTED,
  FETCH_PRODUCT_HIGHLIGHT_SUCCESSED,
  FETCH_POPULAR_PRODUCT_HOMEPAGE_REQUESTED,
  FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED,
  FETCH_SLIDER_HOMEPAGE_REQUESTED,
  FETCH_SLIDER_HOMEPAGE_SUCCESSED
} from './homepage.actions';
import { fetchAllProduct } from '../product/product.saga';
import { AppInjector } from 'src/app/app-injector';
import { ApiService } from 'src/app/api/api.service';

function* watchFetchDataRequest() {
  yield takeLatest(FETCH_PRODUCT_HOMEPAGE_REQUESTED, function*(action: any) {
    try {
      const products = yield call(fetchAllProduct, action.data);
      yield put({ type: FETCH_PRODUCT_HOMEPAGE_SUCCESSED, data: products });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchFetchHighlightProductRequest() {
  yield takeLatest(FETCH_PRODUCT_HIGHLIGHT_REQUESTED, function*(action: any) {
    try {
      const products = yield call(fetchAllProduct, action.data);
      yield put({ type: FETCH_PRODUCT_HIGHLIGHT_SUCCESSED, data: products });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchFetchMostPopularProductRequest() {
  yield takeLatest(FETCH_POPULAR_PRODUCT_HOMEPAGE_REQUESTED, function*(action: any) {
    try {
      const products = yield call(fetchAllProduct, action.data);
      yield put({ type: FETCH_POPULAR_PRODUCT_HOMEPAGE_SUCCESSED, data: products });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchFetchSliderDataRequest() {
  yield takeLatest(FETCH_SLIDER_HOMEPAGE_REQUESTED, function*(action: any) {
    try {
      const sliders = yield call(fetchAllSlider, action.data);
      yield put({ type: FETCH_SLIDER_HOMEPAGE_SUCCESSED, data: sliders });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export const fetchAllSlider = function*(params?) {
  params = params || {};
  const result = yield AppInjector.get(ApiService)
    .slider.get(params)
    .toPromise();
  return result;
};

export default [watchFetchDataRequest, watchFetchHighlightProductRequest, watchFetchMostPopularProductRequest, watchFetchSliderDataRequest];
