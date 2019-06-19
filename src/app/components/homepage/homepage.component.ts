import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import {
  fetchHomepageProductRequested,
  fetchProductHightlightRequested,
  fetchMostPopularProductRequested,
  fetchSliderRequested
} from './homepage.actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Homepage';
  public supportedCategory = [
    {
      label: 'Shop Online',
      category_id: 1
    },
    {
      label: 'BLOG',
      category_id: 2
    },
    {
      label: 'TECHNOLOGY',
      category_id: 3
    },
    {
      label: 'BUSINESS',
      category_id: 4
    }
  ];
  constructor() {
    super();

    this.store.dispatch(
      fetchHomepageProductRequested({
        'product-per-category': 4,
        category_ids: this.supportedCategory.map(item => item.category_id),
        include: 'categories'
      })
    );

    this.store.dispatch(fetchProductHightlightRequested({ constraints: JSON.stringify({ is_highlight: 1 }), limit: 4 }));
    this.store.dispatch(fetchMostPopularProductRequested({ order_by: JSON.stringify({ id: 'desc' }), limit: 4 }));
    this.store.dispatch(fetchSliderRequested());
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Homepage
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
