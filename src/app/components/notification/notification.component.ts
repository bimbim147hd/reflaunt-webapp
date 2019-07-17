import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Router, NavigationEnd } from '@angular/router';
import { FETCH_NOTIFICATIONS_REQUESTED } from './notification.actions';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {
  public reducer: String = 'Notification';
  public timeFormat = time => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(time));
    // tslint:disable-next-line:semicolon
  };
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
