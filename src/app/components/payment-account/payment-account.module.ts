import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule as VicodersPipesModule } from '@vicoders/angular';
import { PaymentAccountRoutingModule } from './payment-account-routing.module';
import { AddComponent } from './add/add.component';
import { PipesModule } from '../../common/pipes/pipes.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { AngularReactiveFormModule } from '@vicoders/reactive-form';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    PaymentAccountRoutingModule,
    PipesModule,
    VicodersPipesModule,
    DirectivesModule,
    FormsModule,
    AngularReactiveFormModule
  ]
})
export class PaymentAccountModule {}
