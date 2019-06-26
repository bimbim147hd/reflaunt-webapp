import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PendingListingComponent } from './pending-listing/pending-listing.component';
import { EditPendingListingComponent } from './edit-pending-listing/edit-pending-listing.component';
import { PendingShipmentComponent } from './pending-shipment/pending-shipment.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardrobeRoutingModule {}
