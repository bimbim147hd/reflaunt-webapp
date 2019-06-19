import * as _ from 'lodash';
import { RENDER_REGISTER_FORM_REQUESTED } from './register.actions';

export const Register = (state = {}, action) => {
  switch (action.type) {
    case RENDER_REGISTER_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data });
    default:
      return state;
  }
};
