import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../../store/store.module';
import { CHOOSE_PAYMENT_REQUESTED } from './choose-payment.actions';
declare const $: any;

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent implements OnInit {
  public paymentMethod = 'credit';
  public productId;
  public store;

  constructor(private route: ActivatedRoute, store: Store) {
    this.store = store.getInstance();
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

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
}
