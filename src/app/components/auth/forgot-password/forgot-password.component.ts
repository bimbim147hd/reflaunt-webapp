import { Component, OnInit } from '@angular/core';
import { Store } from './../../../store/store.module';
import { FORGOT_PASSWORD_REQUESTED, renderForgotPasswordForm } from './forgot-password.actions';
import { AppInjector } from '../../../app-injector';
import { InputBase, TextBox } from '@vicoders/reactive-form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  store: any;
  constructor(store: Store) {
    this.store = store.getInstance();
  }

  ngOnInit() {
    const inputs: InputBase<any>[] = [
      new TextBox({
        key: 'email',
        type: 'email',
        label: 'Vui lòng nhập địa chỉ email đăng nhập của bạn',
        placeholder: 'Email',
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
      })
    ];
    this.store.dispatch(renderForgotPasswordForm(inputs));
  }

  onSubmit(form) {
    const data = form.value;
    const store = AppInjector.get(Store).getInstance();
    store.dispatch({ type: FORGOT_PASSWORD_REQUESTED, data: data });
  }
}
