import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { detail } from './selling-detail/detail.reducer';
import { PendingShipment } from './pending-shipment/pending-shipment.reducer';
import { EditPendingListing } from './edit-pending-listing/edit.pending-listing.reducer';
import { Voucher } from './vouchers/vouchers.reducer';

export const Wardrobe = combineReducers({
  list,
  detail,
  PendingShipment,
  EditPendingListing,
  Voucher
});
