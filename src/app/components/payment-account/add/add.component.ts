import { Component, OnInit } from '@angular/core';
import {
  InputBase,
  Block,
  TextBox,
  SingleSelect2,
  Radio
} from '@vicoders/reactive-form';
import { Validators } from '@angular/forms';
import { Store } from '../../../store/store.module';
import {
  RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED,
  UPDATE_INPUTS_VALUES_PAYMENT_FORM_REQUESTED,
  SAVE_BANK_ACCOUNT_DETAIL_REQUESTED,
  UPDATE_BANK_ACCOUNT_DETAIL_REQUESTED,
  RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED,
  UPDATE_ALPHA_2_CODE_VALUE_ADDRESS_LANDINGPAGE_REQUESTED,
  SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED,
  UPDATE_INPUTS_ADDRESS_LANDING_PAGE_REQUESTED,
  GET_DEFAULT_ADDRESS_REQUESTED
} from './add.actions';
import { BaseComponent } from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';
import * as Cookies from 'js-cookie';
import { confirmAddressInputs } from './add.const';
import Notification from '@vicoders/support/services/Notification';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends BaseComponent implements OnInit {
  public store;
  public location;
  public keysChange = ['country'];
  public reducer = 'PaymentAccount.Add';
  public preItem;

  constructor(store: Store, private route: ActivatedRoute) {
    super();
    this.store = store.getInstance();
    this.route.queryParams.subscribe(params => {
      this.preItem = Number(params.preItem);
    });
  }

  ngOnInit() {
    this.init();
    const inputs: InputBase<any>[] = [
      new SingleSelect2({
        key: 'country',
        label: 'Country *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 1,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'bank_name',
        label: 'Bank Name *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 2,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new Radio({
        key: 'type',
        label: 'Account Type *',
        classes: ['col-6', 'rf--radio'],
        group_classes: ['col-12'],
        options: [
          { label: 'Current', value: 'current' },
          { label: 'Savings', value: 'savings' }
        ],
        group: 3,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'currency',
        label: 'Currency *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 4,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ],
        placeholder: 'sgd'
      }),
      new TextBox({
        key: 'routing_number',
        label: 'Routing Number',
        classes: ['col-6'],
        group: 4,
        group_classes: ['col-12'],
        placeholder: '1100-000'
      }),
      new TextBox({
        key: 'branch_code',
        label: 'Branch Code *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 5,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'bank_code',
        label: 'Bank Code *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 5,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new TextBox({
        key: 'account_number',
        label: 'Account Number *',
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 6,
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ],
        placeholder: '000123456'
      }),
      new TextBox({
        key: 'bank_account_name',
        label: 'Name *',
        classes: ['col-6'],
        group: 6,
        group_classes: ['col-12'],
        validators: [
          {
            validator: Validators.required,
            message: 'This field is required'
          }
        ]
      }),
      new Block({
        classes: ['col-6'],
        group_classes: ['col-12'],
        group: 7,
        content: ''
      }),
      new Block({
        classes: ['col-6', 'rf--block'],
        group_classes: ['col-12'],
        group: 7,
        content:
          // tslint:disable-next-line:max-line-length
          'Make sure your name and bank information match your bank account. Otherwise, your transactions won’t go through and you’ll be charged a fee.'
      })
    ];
    this.store.dispatch({
      type: RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED,
      data: { inputs: inputs }
    });
    const addressInputs = confirmAddressInputs;
    this.store.dispatch({
      type: RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED,
      data: { addressInputs: addressInputs }
    });
  }

  onChange = form => {
    if (form.value.country) {
      this.store.dispatch({
        type: UPDATE_ALPHA_2_CODE_VALUE_ADDRESS_LANDINGPAGE_REQUESTED,
        data: form.value
      });
    }
    // tslint:disable-next-line:semicolon
  };

  onChangePayment = form => {
    if (form.value.country) {
      this.store.dispatch({
        type: UPDATE_INPUTS_VALUES_PAYMENT_FORM_REQUESTED,
        data: form.value
      });
    }
    // tslint:disable-next-line:semicolon
  };

  addPaymentAccount = form => {
    if (form.valid) {
      form.value = _.assign({}, form.value, {
        country: form.value.country.alpha2Code
      });
      if (this.payload.type === 'created') {
        this.store.dispatch({
          type: SAVE_BANK_ACCOUNT_DETAIL_REQUESTED,
          data: form.value,
          user_id: Cookies.get(environment.authId),
          redirectTo: {
            url: ['/', 'wallet', this.preItem, 'choose-payment'],
            params: {
              goFrom: 'add-bank-account'
            }
          }
        });
      }
      if (this.payload.type === 'updated') {
        this.store.dispatch({
          type: UPDATE_BANK_ACCOUNT_DETAIL_REQUESTED,
          data: form.value,
          user_id: Cookies.get(environment.authId),
          redirectTo: {
            url: ['/', 'wallet', this.preItem, 'choose-payment'],
            params: {
              goFrom: 'add-bank-account'
            }
          }
        });
      }
    }
    // tslint:disable-next-line:semicolon
  };

  confirmAddress = form => {
    if (form.valid) {
      if (form.value.country_alpha2_code !== form.value.phonecode.alpha2Code) {
        Notification.show(
          'warning',
          'Country alpha 2 code & Phone code not match',
          3000
        );
        return false;
      }
      this.store.dispatch({
        type: SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED,
        data: _.assign({}, form.value, {
          country: form.value.country.value,
          phone: `+${form.value.phonecode.code}-${form.value.phonecode.value}`
        })
      });
    }
    // tslint:disable-next-line:semicolon
  };

  showAddress() {
    this.payload.showAddress = !this.payload.showAddress;
    if (this.payload.showAddress === true) {
      this.store.dispatch({
        type: GET_DEFAULT_ADDRESS_REQUESTED
      });
    }
  }

  mapStateToProps(state) {
    return { payload: state.PaymentAccount.Add };
  }

  mapDispatchToProps(dispatch) {
    return { dispatch };
  }
}
