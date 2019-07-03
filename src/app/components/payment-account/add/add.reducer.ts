import * as _ from 'lodash';
import {
  RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED,
  UPDATE_INPUTS_ACCOUNT_PAYMENT_FORM_REQUESTED,
  UPDATE_INPUTS_VALUES_PAYMENT_FORM_REQUESTED,
  SAVE_BANK_ACCOUNT_DETAIL_SUCCESSED,
  UPDATE_PAYMENT_ACCOUNT_FROM_REQUESTED,
  UPDATE_BANK_ACCOUNT_DETAIL_SUCCESSED,
  RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED,
  UPDATE_INPUTS_ADDRESS_LANDING_PAGE_REQUESTED,
  UPDATE_ALPHA_2_CODE_VALUE_ADDRESS_LANDINGPAGE_REQUESTED,
  UPDATE_SELLER_CONFIRM_ADDRESS_FROM_REQUESTED,
  SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED
} from './add.actions';
import { support } from '@vicoders/reactive-form';

export const Add = (
  state: any = {
    showAddress: false,
    type: 'created',
    fetched: false,
    payment: false
  },
  action
) => {
  switch (action.type) {
    case RENDER_FILL_BANK_ACCOUNT_FORM_REQUESTED:
      return _.assign({}, state, { inputs: action.data.inputs });
    case UPDATE_INPUTS_ACCOUNT_PAYMENT_FORM_REQUESTED:
      state.inputs = support.UpdateInputsValue(state.inputs, action.data);
      state.inputs = support.UpdateFormValue(state.inputs, {
        country: _.find(
          action.data.country,
          item => item.value === 'United Kingdom'
        ),
        currency: 'GBP'
      });
      return _.assign({}, state, { inputs: state.inputs });
    case UPDATE_INPUTS_VALUES_PAYMENT_FORM_REQUESTED:
      return _.assign({}, state, {
        inputs: support.UpdateFormValue(
          state.inputs,
          _.assign({}, action.data, {
            currency: action.data.country.currencies[0].code
          })
        )
      });
    case UPDATE_PAYMENT_ACCOUNT_FROM_REQUESTED:
      const country = _.find(
        _.find(state.inputs, i => i.key === 'country').options,
        i => i.alpha2Code === action.data.country
      );
      const fieldsAble = ['country', 'currency', 'account_number'];
      return _.assign({}, state, {
        type: 'updated',
        inputs: _.map(
          support.UpdateFormValue(
            state.inputs,
            _.assign(action.data, { country: country })
          ),
          i => {
            if (_.includes(fieldsAble, i.key)) {
              i.disabled = true;
            }
            return i;
          }
        )
      });
    case SAVE_BANK_ACCOUNT_DETAIL_SUCCESSED:
      return _.assign({}, state, { payment_account: action.data });
    case UPDATE_BANK_ACCOUNT_DETAIL_SUCCESSED:
      return _.assign({}, state, { payment_account: action.data });
    case RENDER_FILL_CONFIRM_ADDRESS_FORM_REQUESTED:
      return _.assign({}, state, { addressInputs: action.data.addressInputs });
    case UPDATE_INPUTS_ADDRESS_LANDING_PAGE_REQUESTED:
      state.addressInputs = support.UpdateInputsValue(
        state.addressInputs,
        action.data
      );
      state.addressInputs = support.UpdateFormValue(state.addressInputs, {
        phonecode: {
          code: '44',
          value: '',
          alpha2Code: 'GB'
        },
        country_alpha2_code: 'GB',
        country: _.find(
          action.data.country,
          item => item.value === 'United Kingdom'
        )
      });
      return _.assign({}, state, { addressInputs: state.addressInputs });
    case UPDATE_ALPHA_2_CODE_VALUE_ADDRESS_LANDINGPAGE_REQUESTED:
      return _.assign({}, state, {
        addressInputs: support.UpdateFormValue(
          state.addressInputs,
          _.assign({}, action.data, {
            country_alpha2_code: action.data.country.alpha2Code,
            phonecode: {
              code: action.data.country.callingCodes[0],
              alpha2Code: action.data.country.alpha2Code,
              value: action.data.phonecode.value
            }
          })
        )
      });
    case UPDATE_SELLER_CONFIRM_ADDRESS_FROM_REQUESTED:
      let addressInputs = support.UpdateFormValue(
        state.addressInputs,
        action.data
      );
      addressInputs = _.map(addressInputs, i => {
        if (i.key === 'phonecode') {
          const phone = action.data.phone.split('-');
          const code = phone[0].replace('+', '');
          const value = phone[1];
          i.value = {
            code: code,
            value: value,
            alpha2Code: action.data.country_alpha2_code
          };
        }
        if (i.key === 'country') {
          i.value = _.find(i.options, o => o.value === i.value);
        }
        return i;
      });
      return _.assign({}, state, { addressInputs: addressInputs });
    case SAVE_SELLER_CONFIRM_ADDRESS_DETAIL_REQUESTED:
      return _.assign({}, state, { showAddress: false });
    default:
      return state;
  }
};
