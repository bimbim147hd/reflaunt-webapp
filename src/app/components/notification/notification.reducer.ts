import * as _ from 'lodash';
import { FETCH_NOTIFICATIONS_SUCCESSED } from './notification.actions';

export const Notification = (state = { fetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESSED:
      return _.assign({}, state, {
        fetched: true,
        items: action.data,
        pagination: action.pagination
      });
    case 'UPDATE_NOTIFICATION_REAL_TIME_REQUESTED':
      return _.assign({}, state, {
        items: [action.data, ...state.items]
      });
    default:
      return state;
  }
};
