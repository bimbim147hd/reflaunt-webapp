import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { RESET_PASSWORD_REQUESTED } from './reset-password.actions';
import * as _ from 'lodash';
import Notification from '@vicoders/support/services/Notification';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public store;
  public data: any = {
    password: '',
    password_confirmation: ''
  };

  constructor(private route: ActivatedRoute, store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {}

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      const token = params.token;

      if (_.isEmpty(params)) {
        Notification.show('warning', 'Token is invalid', 3000);
        return false;
      }

      if (this.data.password === '' || this.data.password_confirmation === '') {
        return false;
      }

      if (this.data.password !== this.data.password_confirmation) {
        return false;
      }

      const data = {
        password: this.data.password,
        token: token
      };
      this.store.dispatch({ type: RESET_PASSWORD_REQUESTED, data: data });
    });
  }
}
