import { takeLatest, put } from 'redux-saga/effects';
import { AppInjector } from '../../../app-injector';
import { ApiService } from '../../../api/api.service';
import { EMAIL_ME_SHIPPING_LABEL_REQUESTED } from './pending-shipment.actions';
import Notification from '@vicoders/support/services/Notification';

function* watchSendShippingLabelRequest() {
  yield takeLatest(EMAIL_ME_SHIPPING_LABEL_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      yield api.shipment.sendShippingLabelToEmail(action.data).toPromise();
      Notification.show(
        'success',
        `An Email with Shipping Label was send to your email.`,
        5000
      );
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchSendShippingLabelRequest];
