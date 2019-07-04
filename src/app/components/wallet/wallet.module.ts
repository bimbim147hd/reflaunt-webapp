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
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { RedeemVoucherComponent } from './redeem-voucher/redeem-voucher.component';

@NgModule({
  declarations: [
    ListComponent,
    ChoosePaymentComponent,
    DetailPastPaymentComponent,
    RedeemVoucherComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    PipesModule,
    VicodersPipesModule,
    DirectivesModule,
    FormsModule,
    SweetAlert2Module
  ]
})
export class WalletModule {}
