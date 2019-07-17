import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Router, NavigationEnd } from '@angular/router';
import { FETCH_USER_WALLET_REQUESTED } from './list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Wallet.List';

  constructor(private router: Router) {
    super();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_USER_WALLET_REQUESTED });
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Wallet.List
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
