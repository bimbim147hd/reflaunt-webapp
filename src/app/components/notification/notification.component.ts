import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Router, NavigationEnd } from '@angular/router';
import { FETCH_NOTIFICATIONS_REQUESTED } from './notification.actions';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Notification';
  constructor(private router: Router) {
    super();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: FETCH_NOTIFICATIONS_REQUESTED });
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  mapStateToProps(state) {
    return {
      payload: state.Notification
    };
  }

  mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
}
