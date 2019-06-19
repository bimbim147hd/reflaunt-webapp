import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthComponent } from '../auth.component';
import { Store } from './../../../store/store.module';
import { LOGIN_REQUESTED, renderLoginForm } from './login.actions';
import { AppInjector } from '../../../app-injector';
import { InputBase, TextBox, Block } from '@vicoders/reactive-form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent implements OnInit {
  public store;
  public redirectUrl = 'product';
  user = {
    email: '',
    password: ''
  };
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, store: Store) {
    super();
    this.store = store.getInstance();
    _activatedRoute.queryParams.subscribe(params => {
      if (!_.isUndefined(params.url)) {
        this.redirectUrl = params.url;
      }
    });
  }

  ngOnInit() {
    const inputs: InputBase<any>[] = [
      new TextBox({
        key: 'email',
        type: 'email',
        label: 'Email *',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          },
          {
            validator: Validators.email,
            message: 'Your email address is invalid'
          }
        ]
      }),
      new TextBox({
        key: 'password',
        type: 'password',
        label: 'Password *',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          },
          {
            validator: Validators.min(4),
            message: 'Password should more than 4 characters'
          }
        ]
      }),
      new Block({
        classes: ['col-12'],
        content: `
        <div class="text-right register-link">
          <a href="/auth/register">Bạn chưa có tài khoản</a>
        </div>
        `
      })
    ];
    this.store.dispatch(renderLoginForm(inputs));
  }

  onSubmit(form) {
    const store = AppInjector.get(Store).getInstance();
    store.dispatch({ type: LOGIN_REQUESTED, data: form.value });
  }
}
