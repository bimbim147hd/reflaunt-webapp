import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { fetchListProductRequested } from './list.actions';
import { BaseComponent } from '../../base.component';
import { categoryDetailPage } from 'src/app/app.const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Product.list';
  public categoryDetailPage = categoryDetailPage;
  private activatedRoute;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    super();
    this.activatedRoute = activatedRoute;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const queryParams = this.activatedRoute.snapshot.params;
        if (_.has(queryParams, 'slug')) {
          this.store.dispatch(
            fetchListProductRequested({
              ...{ category: queryParams.slug },
              ...this.queryParser.parse(['page', 'per_page'], activatedRoute)
            })
          );
        } else {
          this.store.dispatch(fetchListProductRequested(this.queryParser.parse(['page', 'per_page'], activatedRoute)));
        }
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Product.list
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }

}
