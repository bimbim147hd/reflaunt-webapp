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

  hasRetailerImage(): Boolean {
    return (
      _.isArray((this as any).retailer.images) &&
      (this as any).retailer.images.length > 0
    );
  }

  getImageUrl(): String {
    if (this.hasRetailerImage()) {
      return (this as any).retailer.images[0].url;
    } else {
      return '';
    }
  }

  getImageBackgroundStyle(): String {
    return `url("${this.getImageUrl()}")`;
  }
}

export default Voucher;
