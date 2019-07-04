import Model from './Model';

class WalletDetail extends Model {
  constructor(options) {
    super();
    this.bind(options);
  }
  getImageBackgroundStyle(): String {
    return `url("${(this as any).retailer_logo}")`;
  }
}

export default WalletDetail;
