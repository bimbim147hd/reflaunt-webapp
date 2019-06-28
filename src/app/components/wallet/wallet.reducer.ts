import { combineReducers } from 'redux';
import { List } from './list/list.reducer';
import { ChoosePayment } from './choose-payment/choose-payment.reducer';
import { DetailPayment } from './detail-past-payment/detail-past-payment.reducer';

export const Wallet = combineReducers({
  List,
  ChoosePayment,
  DetailPayment
});
