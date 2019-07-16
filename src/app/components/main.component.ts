import { AppInjector } from './../app-injector';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../store/store.module';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_REQUESTED } from './auth/login/login.actions';
import { environment } from '../../environments/environment';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';
import { NotificationService } from '../api/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NotificationService]
})
export class MainComponent implements OnInit {
  public store;

  constructor(
    public router: Router,
    private _notificationService: NotificationService
  ) {
    this.store = AppInjector.get(Store).getInstance();
    // this._notificationService.getNotificationFromSocketIo().subscribe(data => {
    //   this.store.dispatch({
    //     type: 'UPDATE_NOTIFICATION_REAL_TIME_REQUESTED',
    //     data: data
    //   });
    // });
    this._notificationService.getNotificationFromPusher().subscribe(data => {
      console.log('data', data);
      this.store.dispatch({
        type: 'UPDATE_NOTIFICATION_REAL_TIME_REQUESTED',
        data: data
      });
    });
    this.store.dispatch({
      type: 'FETCH_NUMBER_OF_UNREAD_MESSAGE_REQUESTED'
    });
    this.store.dispatch({
      type: 'FETCH_NUMBER_OF_UNREAD_NOTIFICATION_REQUESTED'
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: FETCH_LOGIN_DETAIL_REQUESTED
    });
  }

  logout() {
    Cookies.remove(environment.jwtTokenKey, { path: '/' });
    Cookies.remove(environment.authId, { path: '/' });
    this.router.navigate(['/', 'auth', 'login']);
  }

  openNav() {
    document.getElementById('myNav').style.width = '100%';
    document.getElementById('myNav').style.zIndex = '9';
  }

  closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }
}
