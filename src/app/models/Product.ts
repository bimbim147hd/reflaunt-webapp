import Model from './Model';
import * as _ from 'lodash';
import Category from './Category';
import Image from './Image';
import ProductMeta from './ProductMeta';
import User from './User';

export const PENDING_STATUS = 1;
export const FLAUNT_STATUS = 2;
export const READY_FOR_SALE_STATUS = 3;
export const SELLING_STATUS = 4;
export const SOLD_STATUS = 5;
export const CANCELED_STATUS = 6;
export const WANTED_STATUS = 7;
export const SOLD_CONFIRMED_STATUS = 8;

class Product extends Model {
  constructor(options) {
    super();
    (this as any).categories = d => {
      return _.map(d.data, item => new Category(item));
    };
    (this as any).images = d => {
      return _.map(d.data, item => new Image(item));
    };
    (this as any).product_meta = d => {
      return _.map(d.data, item => new ProductMeta(item));
    };
    (this as any).retailer = d => {
      return new User(d.data);
    };
    this.bind(options);
  }

  getStatusLabel() {
    const status = {
      label: null,
      color: null
    };
    switch ((this as any).product_meta[0].status_id) {
      case PENDING_STATUS:
        status.label = 'Pending';
        status.color = '#f7b500';
        break;
      case FLAUNT_STATUS:
        status.label = 'Flaunt';
        status.color = '#34495e';
        break;
      case READY_FOR_SALE_STATUS:
        status.label = 'Ready for sale';
        status.color = '#34495e';
        break;
      case SELLING_STATUS:
        status.label = 'Selling';
        status.color = '#90c25d';
        break;
      case SOLD_STATUS:
        status.label = 'Sold';
        status.color = '#b5b5b5';
        break;
      case CANCELED_STATUS:
        status.label = 'Canceled';
        status.color = '#34495e';
        break;
      case WANTED_STATUS:
        status.label = 'Wanted';
        status.color = '#34495e';
        break;
      case SOLD_CONFIRMED_STATUS:
        status.label = 'Sold Confirmed';
        status.color = '#34495e';
        break;
      default:
        status.label = 'Not Found';
        status.color = '#34495e';
    }
    return status;
  }

  hasImage(): Boolean {
    return _.isArray((this as any).images) && (this as any).images.length > 0;
  }

  getImageUrl(): String {
    if (this.hasImage()) {
      return (this as any).images[0].url;
    } else {
      return '';
    }
  }

  getImageBackgroundStyle(): String {
    return `url("${this.getImageUrl()}")`;
  }
}

export default Product;
