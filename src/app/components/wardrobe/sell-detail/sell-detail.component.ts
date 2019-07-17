import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import { GET_PRODUCT_DETAIL_REQUESTED } from '../selling-detail/detail.actions';

@Component({
  selector: 'app-sell-detail',
  templateUrl: './sell-detail.component.html',
  styleUrls: ['./sell-detail.component.scss']
})
export class SellDetailComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Wardrobe.detail';
  public productId;

  constructor(private route: ActivatedRoute) {
    super();
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.productId = productId;

    this.store.dispatch({
      type: GET_PRODUCT_DETAIL_REQUESTED,
      data: { id: productId },
      com: 'SELL_DETAIL_COM'
    });
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Wardrobe.detail
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
