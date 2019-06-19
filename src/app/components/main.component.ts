import { AppInjector } from './../app-injector';
import { Component, OnInit } from '@angular/core';
import { Store } from '../store/store.module';
// import { FETCH_LOGIN_DETAIL_REQUESTED } from './auth/login/login.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public store;

  constructor() {
    this.store = AppInjector.get(Store).getInstance();
  }

  ngOnInit() {
    // this.store.dispatch({ type: FETCH_LOGIN_DETAIL_REQUESTED });
  }
}
