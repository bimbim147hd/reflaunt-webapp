import Model from './Model';
import Product from './Product';

class Conversation extends Model {
  constructor(options) {
    super();
    (this as any).product = d => {
      return new Product(d.data);
    };
    this.bind(options);
  }
}

export default Conversation;
