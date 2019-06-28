import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../../store/store.module';
import { CHOOSE_PAYMENT_REQUESTED } from './choose-payment.actions';
import { FETCH_USER_WALLET_SUCCESSED } from '../list/list.actions';
import { BaseComponent } from '../../base.component';
declare const $: any;

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent extends BaseComponent implements OnInit {
  public paymentMethod = 'credit';
  public productId;
  public store;
  public reducer: String = 'Wallet.ChoosePayment';

  constructor(private route: ActivatedRoute, store: Store) {
    super();
    this.store = store.getInstance();
    this.productId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch({
      type: FETCH_USER_WALLET_SUCCESSED,
      com: 'CHOOSE_PAYMENT_COM',
      productId: this.productId
    });
  }

  ngOnInit() {
    this.init();
  }

  choosePayment(val) {
    $('.optional').removeClass('active');
    if (val === 'cash') {
      $('.optional.cash').addClass('active');
    }
    if (val === 'credit') {
      $('.optional.credits').addClass('active');
    }
    this.paymentMethod = val;
  }

  widthDraw() {
    this.store.dispatch({
      type: CHOOSE_PAYMENT_REQUESTED,
      data: {
        product_id: Number(this.productId),
        type: this.paymentMethod,
        seller_id: this.store.getState().Auth.login.profile.id
      }
    });
  }

  mapStateToProps(state) {
    return {
      payload: state.Wallet.ChoosePayment
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
