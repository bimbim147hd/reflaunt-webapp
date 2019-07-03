import { InputBase, Block, TextBox, PhoneCode, SingleSelect2 } from '@vicoders/reactive-form';
import { Validators } from '@angular/forms';

export let confirmAddressInputs: InputBase<any>[] = [
  new TextBox({
    key: 'company',
    label: 'Company',
    classes: ['col-12'],
    group_classes: ['col-12'],
    order: 1
  }),
  new TextBox({
    key: 'address_1',
    label: 'Address 1 *',
    classes: ['col-12'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ],
    placeholder: '1286 1st Avenue, New York'
  }),
  new TextBox({
    key: 'address_2',
    label: 'Address 2',
    classes: ['col-12'],
    group_classes: ['col-12'],
    order: 1,
    placeholder: '1286 1st Avenue, New York'
  }),
  new TextBox({
    key: 'city',
    label: 'City *',
    classes: ['col-6'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ],
    placeholder: 'New York'
  }),
  new TextBox({
    key: 'state',
    label: 'State',
    classes: ['col-6'],
    group_classes: ['col-12'],
    order: 1
  }),
  new SingleSelect2({
    key: 'country',
    label: 'Country *',
    classes: ['col-12'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ],
    placeholder: 'US'
  }),

  new PhoneCode({
    key: 'phonecode',
    label: 'Phone *',
    classes: ['col-12'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ]
  }),
  new TextBox({
    key: 'country_alpha2_code',
    label: 'Country Alpha2 Code *',
    classes: ['col-6'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ],
    placeholder: 'GB'
  }),
  new TextBox({
    key: 'zipcode',
    label: 'Zipcode *',
    classes: ['col-6'],
    group_classes: ['col-12'],
    order: 1,
    validators: [
      {
        validator: Validators.required,
        message: 'This field is required'
      }
    ],
    placeholder: '57000'
  })
];
