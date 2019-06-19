import { PipesModule } from '../../common/pipes/pipes.module';
import { PipesModule as VicodersPipesModule } from '@vicoders/angular';
import { DirectivesModule } from '../../common/directives/directives.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularReactiveFormModule } from '@vicoders/reactive-form';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [CommonModule, ProductRoutingModule, FormsModule, PipesModule, VicodersPipesModule, DirectivesModule, AngularReactiveFormModule],
  declarations: [ProductComponent, ListComponent, DetailComponent]
})
export class ProductModule {}
