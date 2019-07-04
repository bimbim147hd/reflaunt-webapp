import Model from './Model';
import * as _ from 'lodash';
import User from './User';

class Voucher extends Model {
  constructor(options) {
    super();
    (this as any).retailer = d => {
      return new User(d.data);
    };
    (this as any).seller = d => {
      return new User(d.data);
    };
    this.bind(options);
  }
}

export default Voucher;
