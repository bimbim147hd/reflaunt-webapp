import { LOGIN_SUCCEEDED, FETCH_LOGIN_DETAIL_SUCCEEDED, RENDER_LOGIN_FORM_REQUESTED } from './login.actions';
import * as _ from 'lodash';

export const login = (state = { loggedin: false, inputs: [] }, action) => {
  switch (action.type) {
    case RENDER_LOGIN_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data });
    case LOGIN_SUCCEEDED:
      return _.assign({}, state, { loggedin: true });

    case FETCH_LOGIN_DETAIL_SUCCEEDED:
      return _.assign({}, state, { loggedin: true, fetched: true, profile: action.data });

    default:
      return state;
  }
};
