import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { FETCH_USER_WALLET_REQUESTED } from '../list/list.actions';
import { ActivatedRoute } from '@angular/router';
import { TRANSACTION_TYPE_CREDIT, TRANSACTION_TYPE_CASH } from '../../../models/TransactionHistory';

@Component({
  selector: 'app-detail-past-payment',
  templateUrl: './detail-past-payment.component.html',
  styleUrls: ['./detail-past-payment.component.scss']
})
export class DetailPastPaymentComponent extends BaseComponent
  implements OnInit {
  public reducer: String = 'Wallet.DetailPayment';
  public productId;
  public TRANSACTION_TYPE_CREDIT = TRANSACTION_TYPE_CREDIT;
  public TRANSACTION_TYPE_CASH = TRANSACTION_TYPE_CASH;
  constructor(private route: ActivatedRoute) {
    super();
    this.productId = this.route.snapshot.paramMap.get('id');

    this.store.dispatch({
      type: FETCH_USER_WALLET_REQUESTED,
      com: 'DETAIL_PAYMENT',
      productId: this.productId
    });
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Wallet.DetailPayment
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
