import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { Auth } from '../components/auth/auth.reducer';
import { Homepage } from '../components/homepage/homepage.reducer';
import { environment } from '../../environments/environment';
import { Wardrobe } from '../components/wardrobe/wardrobe.reducer';
import { Notification } from '../components/notification/notification.reducer';
import { Wallet } from '../components/wallet/wallet.reducer';
import { PaymentAccount } from '../components/payment-account/payment-account.reducer';

const RootReducer = (
  state = { config: environment, isShowBtnSettings: false },
  action
) => {
  switch (action.type) {
    case 'INIT_APP_MENU':
      const target = _.cloneDeep(action.data);
      const MenuItems = _.map(target, item => {
        item.main = _.map(item.main, menu => {
          if (_.isArray(menu.permissions) && menu.permissions.length > 0) {
            menu.show = action.user.hasOneOf(menu.permissions);
          } else {
            menu.show = true;
          }
          if (_.isArray(menu.states)) {
            menu.states = menu.states.map(i => {
              if (i === 'CURRENT_USER_ID') {
                return action.user.id;
              }
              if (i === 'CURRENT_USER_EMAIL') {
                return action.user.email;
              }
              return i;
            });
          }
          return menu;
        });
        item.show = !_.isUndefined(_.find(item.main, i => i.show));
        return item;
      });
      return _.assign({}, state, {
        MenuItems: MenuItems,
        isShowBtnSettings: action.isShowBtnSettings
      });
    default:
      return state;
  }
};

export default combineReducers({
  Auth,
  Homepage,
  RootReducer,
  Wardrobe,
  Notification,
  Wallet,
  PaymentAccount
});
