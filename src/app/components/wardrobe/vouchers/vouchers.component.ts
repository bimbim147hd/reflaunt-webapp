import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../base.component';
import {
  GET_ALL_VOUCHERS_REQUESTED,
  REDEEM_VOUCHER_REQUESTED
} from './vouchers.actions';
import { ActivatedRoute } from '@angular/router';
import { redeemVoucherPopup } from './vouchers.consts';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public reducer: String = 'Wardrobe.Voucher';
  public tabActive;
  constructor(private route: ActivatedRoute) {
    super();
    this.store.dispatch({
      type: GET_ALL_VOUCHERS_REQUESTED
    });
  }

  ngOnInit() {
    this.init();
  }

  openNav() {
    document.getElementById('howSellVoucher').style.width = '100%';
    document.getElementById('howSellVoucher').style.zIndex = '9';
  }

  closeNav() {
    document.getElementById('howSellVoucher').style.width = '0%';
  }

  redeemVoucher(voucher) {
    this.payload.redeemed = false;
    redeemVoucherPopup(
      voucher,
      () => {
        this.store.dispatch({
          type: REDEEM_VOUCHER_REQUESTED,
          data: voucher
        });
      },
      () => {
        console.log('VISIT SITE');
      }
    );
  }

  mapStateToProps(state) {
    return {
      payload: state.Wardrobe.Voucher
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }

  ngOnDestroy() {
    this.payload.redeemed = false;
  }
}
