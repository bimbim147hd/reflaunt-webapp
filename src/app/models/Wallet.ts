import Model from './Model';

class Wallet extends Model {
  constructor(options) {
    super();
    this.bind(options);
  }
}

export default Wallet;
