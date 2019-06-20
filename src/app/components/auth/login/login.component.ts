import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthComponent } from '../auth.component';
import { Store } from './../../../store/store.module';
import { LOGIN_REQUESTED, renderLoginForm } from './login.actions';
import { FORGOT_PASSWORD_REQUESTED } from '../forgot-password/forgot-password.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent
  implements OnInit, AfterViewInit {
  public showForgotPassForm = false;
  public store;
  public redirectUrl = 'product';
  user = {
    email: '',
    password: ''
  };
  forgot = {
    email: '',
    from: 'WEB_APP'
  };
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    store: Store
  ) {
    super();
    this.store = store.getInstance();
    _activatedRoute.queryParams.subscribe(params => {
      if (!_.isUndefined(params.url)) {
        this.redirectUrl = params.url;
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }

  onSubmit(form) {
    const data = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch({ type: LOGIN_REQUESTED, data: data });
  }

  onSubmitForgot(form) {
    this.store.dispatch({ type: FORGOT_PASSWORD_REQUESTED, data: this.forgot });
  }

  goToForgotPass() {
    this.showForgotPassForm = !this.showForgotPassForm;
  }
}
