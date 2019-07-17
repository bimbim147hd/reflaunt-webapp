import list from './list/list.saga';
import detail from './selling-detail/detail.saga';
import pendingShipment from './pending-shipment/pending-shipment.saga';
import editPendingListing from './edit-pending-listing/edit-pending-listing.saga';
import voucher from './vouchers/vouchers.saga';

export default [...list, ...detail, ...pendingShipment, ...editPendingListing, ...voucher];
