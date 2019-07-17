import Model from './Model';
import WalletDetail from './WalletDetail';
import * as _ from 'lodash';

class Wallet extends Model {
  constructor(options) {
    super();
    (this as any).wallet_detail = d => {
      return _.map(d.data, item => new WalletDetail(item));
    };
    this.bind(options);
  }
}

export default Wallet;
