import Model from './Model';

class PaymentAccount extends Model {
  constructor(options) {
    super();
    this.bind(options);
  }
}

export default PaymentAccount;
