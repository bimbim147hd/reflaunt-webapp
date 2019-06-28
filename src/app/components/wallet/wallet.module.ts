import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../common/pipes/pipes.module';
import { PipesModule as VicodersPipesModule } from '@vicoders/angular';
import { DirectivesModule } from '../../common/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { WalletRoutingModule } from './wallet-routing.module';
import { ListComponent } from './list/list.component';
import { ChoosePaymentComponent } from './choose-payment/choose-payment.component';
import { DetailPastPaymentComponent } from './detail-past-payment/detail-past-payment.component';

@NgModule({
  declarations: [ListComponent, ChoosePaymentComponent, DetailPastPaymentComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    PipesModule,
    VicodersPipesModule,
    DirectivesModule,
    FormsModule
  ]
})
export class WalletModule {}