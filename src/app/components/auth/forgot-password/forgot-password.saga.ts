import { AppInjector } from './../../../app-injector';
import { FORGOT_PASSWORD_REQUESTED, FORGOT_PASSWORD_SUCCEEDED, FORGOT_PASSWORD_FAILEDED } from './forgot-password.actions';
import { takeEvery, put } from 'redux-saga/effects';
import * as _ from 'lodash';
import { ApiService } from '../../../api/api.service';
import Notification from '@vicoders/support/services/Notification';

function* watchForgotPasswordRequest() {
  yield takeEvery(FORGOT_PASSWORD_REQUESTED, function*(action: any) {
    try {
      const result = yield AppInjector.get(ApiService)
        .auth.forgotPassword(action.data)
        .toPromise();
      yield put({ type: FORGOT_PASSWORD_SUCCEEDED, data: result });
    } catch (e) {
      if (e.error.error_code === 1001 && e.error.message === 'User not found') {
        yield put({ type: FORGOT_PASSWORD_FAILEDED, data: { message: 'Email không tồn tại' } });
      } else {
        yield put({ type: FORGOT_PASSWORD_FAILEDED, data: { message: 'Có lỗi xảy ra vui lòng thử lại sau' } });
      }
    }
  });
}

function* watchForgotPasswordFailed() {
  yield takeEvery(FORGOT_PASSWORD_FAILEDED, function*(action: any) {
    Notification.show('warning', action.data.message, 5000);
  });
}

function* watchForgotPasswordSuccessed() {
  yield takeEvery(FORGOT_PASSWORD_SUCCEEDED, function*(action: any) {
    Notification.show('success', 'Một email đã gửi đến email của bạn, vui lòng kiểm tra và làm theo hướng dẫn', 5000);
  });
}

export default [watchForgotPasswordRequest, watchForgotPasswordFailed, watchForgotPasswordSuccessed];
