import * as _ from 'lodash';
import { PUBLISH_PRODUCT_SUCCESSED } from './edit-pending-listing.actions';

export const EditPendingListing = (state = { published: false }, action) => {
  switch (action.type) {
    case PUBLISH_PRODUCT_SUCCESSED:
      return _.assign(state, {
        published: true
      });
    default:
      return state;
  }
};
