import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { FETCH_PRODUCT_DETAIL_REQUESTED, PRODUCT_DETAIL_COMPONENT } from './detail.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Product.DetailProduct';
  public url = window.location.href;
  constructor(private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.init();
    this.store.dispatch({
      type: FETCH_PRODUCT_DETAIL_REQUESTED,
      data: this.route.snapshot.params.slug,
      component: PRODUCT_DETAIL_COMPONENT
    });
  }

  redirectToContactPage(url) {
    this.router.navigate(['/', 'contact'], { queryParams: { url } });
  }

  mapStateToProps(state) {
    return {
      payload: state.Product.DetailProduct
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
