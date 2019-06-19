import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeRoutingModule } from './wardrobe-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    WardrobeRoutingModule
  ]
})
export class WardrobeModule { }
