import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { FETCH_USER_WALLET_REQUESTED } from '../list/list.actions';
import * as _ from 'lodash';
import {
  CHOOSE_BRANCH_REQUESTED,
  GET_VOUCHERS_REQUESTED
} from './redeem-voucher.actions';

@Component({
  selector: 'app-redeem-voucher',
  templateUrl: './redeem-voucher.component.html',
  styleUrls: ['./redeem-voucher.component.scss']
})
export class RedeemVoucherComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public reducer: String = 'Wallet.RedeemVoucher';
  constructor() {
    super();
    this.store.dispatch({
      type: FETCH_USER_WALLET_REQUESTED,
      com: 'REDEEM_VOUCHER'
    });
  }

  ngOnInit() {
    this.init();
  }

  chooseBranch(val) {
    this.store.dispatch({
      type: CHOOSE_BRANCH_REQUESTED,
      data: val
    });
  }

  changeAmount(val) {
    if (val === '-' && this.payload.choosedBranch.current_amount > 0) {
      this.payload.choosedBranch.current_amount -= 1;
    }
    if (
      val === '+' &&
      this.payload.choosedBranch.current_amount <
        this.payload.choosedBranch.amount_credit
    ) {
      this.payload.choosedBranch.current_amount += 1;
    }
  }

  getVoucher() {
    this.store.dispatch({
      type: GET_VOUCHERS_REQUESTED,
      data: {
        retailer_id: this.payload.choosedBranch.retailer_id,
        credit_amount: this.payload.choosedBranch.current_amount
      }
    });
  }

  ngOnDestroy() {
    this.payload.choosedBranch = undefined;
  }

  mapStateToProps(state) {
    return {
      payload: state.Wallet.RedeemVoucher
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
