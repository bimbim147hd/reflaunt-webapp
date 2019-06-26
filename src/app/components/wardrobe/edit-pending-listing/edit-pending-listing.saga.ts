import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import {
  PUBLISH_PRODUCT_REQUESTED,
  PUBLISH_PRODUCT_SUCCESSED
} from './edit-pending-listing.actions';
import { Router } from '@angular/router';
import Notification from '@vicoders/support/services/Notification';

function* watchPublishProductsRequest() {
  yield takeLatest(PUBLISH_PRODUCT_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    const router = AppInjector.get(Router);
    try {
      const result = yield api.product
        .update(action.data.id, action.data)
        .toPromise();
      yield api.product
        .changeStatusToSelling(result.product_meta[0].id, {})
        .toPromise();
      Notification.show('success', 'Publish Selling Success!', 5000);
      router.navigate(['/', 'wardrobe']);
      yield put({ type: PUBLISH_PRODUCT_SUCCESSED });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchPublishProductsRequest];
