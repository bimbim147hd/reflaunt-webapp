import Model from './Model';
import * as _ from 'lodash';
import Category from './Category';

class Product extends Model {
  constructor(options) {
    super();
    (this as any).categories = d => {
      return _.map(d.data, item => new Category(item));
    };
    this.bind(options);
  }
}

export default Product;
