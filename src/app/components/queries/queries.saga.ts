import { takeLatest, put } from 'redux-saga/effects';
import {
  FETCH_MESSAGES_REQUESTED,
  FETCH_MESSAGES_SUCCESSED,
  SELECTED_MESSAGES_REQUESTED,
  POST_MESSAGE_REQUESTED
} from './queries.actions';
import { AppInjector } from '../../app-injector';
import { ApiService } from '../../api/api.service';

function* watchFetchMessagesRequest() {
  yield takeLatest(FETCH_MESSAGES_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      const result = yield api.inbox.getMessageByMe().toPromise();
      yield put({
        type: FETCH_MESSAGES_SUCCESSED,
        data: result
      });
      if (action.selectedMessage) {
        yield put({
          type: SELECTED_MESSAGES_REQUESTED,
          data: action.selectedMessage
        });
      }
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

function* watchPostMessagesRequest() {
  yield takeLatest(POST_MESSAGE_REQUESTED, function*(action: any) {
    const api = AppInjector.get(ApiService);
    try {
      yield api.inbox
        .replyMessage(action.data.conversation_id, {
          message: action.messageText,
          reply_to: action.data.id
        })
        .toPromise();
      yield put({
        type: FETCH_MESSAGES_REQUESTED,
        selectedMessage: action.data
      });
    } catch (e) {
      yield put({ type: 'API_CALL_ERROR', error: e });
    }
  });
}

export default [watchFetchMessagesRequest, watchPostMessagesRequest];
