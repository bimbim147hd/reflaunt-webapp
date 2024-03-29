import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ChoosePaymentComponent } from './choose-payment/choose-payment.component';
import { DetailPastPaymentComponent } from './detail-past-payment/detail-past-payment.component';
import { RedeemVoucherComponent } from './redeem-voucher/redeem-voucher.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id/choose-payment',
        component: ChoosePaymentComponent
      },
      {
        path: ':id/detail-payment',
        component: DetailPastPaymentComponent
      },
      {
        path: 'redeem-voucher',
        component: RedeemVoucherComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule {}
