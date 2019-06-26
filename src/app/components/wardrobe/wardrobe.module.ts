import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../common/pipes/pipes.module';
import { PipesModule as VicodersPipesModule } from '@vicoders/angular';
import { DirectivesModule } from '../../common/directives/directives.module';
import { WardrobeRoutingModule } from './wardrobe-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PendingListingComponent } from './pending-listing/pending-listing.component';
import { EditPendingListingComponent } from './edit-pending-listing/edit-pending-listing.component';
import { FormsModule } from '@angular/forms';
import { PendingShipmentComponent } from './pending-shipment/pending-shipment.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, PendingListingComponent, EditPendingListingComponent, PendingShipmentComponent],
  imports: [
    CommonModule,
    WardrobeRoutingModule,
    PipesModule,
    VicodersPipesModule,
    DirectivesModule,
    FormsModule
  ]
})
export class WardrobeModule {}
