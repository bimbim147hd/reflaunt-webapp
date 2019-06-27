import Model from './Model';

export const TRANSACTION_TYPE_PENDING = 0;
export const TRANSACTION_TYPE_CREDIT = 1;
export const TRANSACTION_TYPE_CASH = 2;
export const TRANSACTION_TYPE_FULL = 3;
export const TRANSACTION_TYPE_BUY_VOUCHER = 4;

class TransactionHistory extends Model {
  constructor(options) {
    super();
    this.bind(options);
  }

  getTypeLabel() {
    let label = '';
    switch ((this as any).type) {
      case 0:
        label = 'Pending';
        break;
      case 1:
        label = 'Credits';
        break;
      case 2:
        label = 'Cash';
        break;
      case 3:
        label = 'Full';
        break;
      case 4:
        label = 'Voucher';
        break;
      default:
      // code block
    }
    return label;
  }
}

export default TransactionHistory;
