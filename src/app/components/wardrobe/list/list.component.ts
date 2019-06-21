import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FETCH_PRODUCTS_REQUESTED } from './list.actions';

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
