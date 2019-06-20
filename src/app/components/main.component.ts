import { AppInjector } from './../app-injector';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store/store.module';
import * as _ from 'lodash';
import { FETCH_LOGIN_DETAIL_REQUESTED } from './auth/login/login.actions';
import { environment } from '../../environments/environment';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public store;

  constructor(public router: Router) {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    this.store.dispatch({
      type: FETCH_LOGIN_DETAIL_REQUESTED
    });
  }

  logout() {
    Cookies.remove(environment.jwtTokenKey, { path: '/' });
    this.router.navigate(['/', 'auth', 'login']);
  }
}
