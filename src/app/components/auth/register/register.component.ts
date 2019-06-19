import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthComponent } from '../auth.component';
import { Store } from '../../../store/store.module';
import { REGISTER_REQUESTED, renderRegisterForm } from './register.actions';
import { InputBase, TextBox, Block } from '@vicoders/reactive-form';
import { Validators } from '@angular/forms';
import { AppInjector } from 'src/app/app-injector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthComponent implements OnInit {
  public store;
  public redirectUrl = '';
  user = {
    email: '',
    password: '',
    address: ''
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
            message: 'Vui lòng điền thông tin'
          },
          {
            validator: Validators.email,
            message: 'Vui lòng điền đúng định dạng email'
          }
        ]
      }),
      new TextBox({
        key: 'username',
        label: 'Tên Khách hàng *',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'Vui lòng điền thông tin'
          }
        ]
      }),
      new TextBox({
        key: 'address',
        label: 'Địa chỉ *',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'Vui lòng điền thông tin'
          }
        ]
      }),
      new TextBox({
        key: 'password',
        type: 'password',
        label: 'Mật khẩu *',
        classes: ['col-12'],
        group_classes: ['col-12'],
        order: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'Vui lòng điền thông tin'
          },
          {
            validator: Validators.min(4),
            message: 'Vui lòng điền mật khẩu lớn hơn 4 kí tự'
          }
        ]
      }),
      new Block({
        classes: ['col-12'],
        content: `
        <div class="text-right register-link">
          <a href="/auth/login">Bạn đã có tài khoản</a>
        </div>
        `
      })
    ];
    this.store.dispatch(renderRegisterForm(inputs));
  }

  onSubmit(form) {
    const data = form.value;
    const store = AppInjector.get(Store).getInstance();
    store.dispatch({ type: REGISTER_REQUESTED, data: data });
  }
}
