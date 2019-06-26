import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FETCH_PRODUCTS_REQUESTED } from './list.actions';
import * as _ from 'lodash';
import {
  SELLING_STATUS,
  PENDING_STATUS,
  SOLD_STATUS,
  CANCELED_STATUS
} from '../../../models/Product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Wardrobe.list';
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    super();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_PRODUCTS_REQUESTED });
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  openNav() {
    document.getElementById('howSell').style.width = '100%';
    document.getElementById('howSell').style.zIndex = '9';
  }

  closeNav() {
    document.getElementById('howSell').style.width = '0%';
  }

  getRedirectUrl(item) {
    let url: any = ['/'];
    const able_statuses = [
      {
        status: SELLING_STATUS,
        url: ['/', 'wardrobe', 'selling-detail', item.id]
      },
      {
        status: PENDING_STATUS,
        url: ['/', 'wardrobe', 'pending-listing', item.id]
      },
      {
        status: SOLD_STATUS,
        url: ['/', 'wardrobe', 'pending-shipment', item.id]
      },
      {
        status: CANCELED_STATUS,
        url: ['/', 'wardrobe', 'sell-detail', item.id]
      }
    ];
    _.forEach(able_statuses, function(status) {
      if (
        !_.isEmpty(
          _.filter(item.product_meta, o => o.status_id === status.status)
        )
      ) {
        url = status.url;
      }
    });
    return url;
  }

  mapStateToProps(state) {
    return {
      payload: state.Wardrobe.list
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
