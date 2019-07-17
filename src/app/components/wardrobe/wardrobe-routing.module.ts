import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PendingListingComponent } from './pending-listing/pending-listing.component';
import { EditPendingListingComponent } from './edit-pending-listing/edit-pending-listing.component';
import { PendingShipmentComponent } from './pending-shipment/pending-shipment.component';
import { DetailComponent } from './selling-detail/detail.component';
import { SellDetailComponent } from './sell-detail/sell-detail.component';
import { VouchersComponent } from './vouchers/vouchers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'selling-detail/:id',
        component: DetailComponent
      },
      {
        path: 'pending-listing/:id',
        component: PendingListingComponent
      },
      {
        path: 'pending-listing/:id/edit',
        component: EditPendingListingComponent
      },
      {
        path: 'pending-shipment/:id',
        component: PendingShipmentComponent
      },
      {
        path: 'sell-detail/:id',
        component: SellDetailComponent
      },
      {
        path: 'vouchers',
        component: VouchersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardrobeRoutingModule {}
