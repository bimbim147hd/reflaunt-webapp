import { FORGOT_PASSWORD_SUCCEEDED, FORGOT_PASSWORD_FAILEDED, RENDER_FORGOT_PASSWORD_FORM_REQUESTED } from './forgot-password.actions';
import * as _ from 'lodash';

export const ForgotPassword = (state = { isUser: true }, action) => {
  switch (action.type) {
    case RENDER_FORGOT_PASSWORD_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data });
    case FORGOT_PASSWORD_SUCCEEDED:
      return _.assign({}, state, { isSent: true });
    case FORGOT_PASSWORD_FAILEDED:
      return _.assign({}, state, { isUser: false });
    default:
      return state;
  }
};
