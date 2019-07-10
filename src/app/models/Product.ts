import Model from './Model';
import * as _ from 'lodash';
import Category from './Category';
import Image from './Image';
import ProductMeta from './ProductMeta';
import User from './User';
import Shipment from './Shipment';
import TransactionHistory from './TransactionHistory';
import Designer from './Designer';

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
    (this as any).designer = d => {
      return new Designer(d.data);
    };
    (this as any).markets = d => {
      return _.map(d.data, item => new User(item));
    };
    (this as any).sold_market = d => {
      return new User(d.data);
    };
    (this as any).shipments = d => {
      return _.map(d.data, item => new Shipment(item));
    };
    (this as any).transaction_histories = d => {
      return _.map(d.data, item => new TransactionHistory(item));
    };
    this.bind(options);
  }

  getStatusLabel() {
    const status = {
      label: null,
      color: null
    };
    if (!_.isEmpty((this as any).product_meta)) {
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

  getLikesNumber() {
    if ((this as any).likes) {
      return (this as any).likes;
    } else {
      return 0;
    }
  }

  getConditionMask() {
    let result = 0;
    if ((this as any).condition.data.name) {
      switch ((this as any).condition.data.name) {
        case 'excellent':
          result = 4;
          break;
        case 'gently loved':
          result = 1;
          break;
        case 'new with tag':
          result = 5;
          break;
        case 'very good':
          result = 3;
          break;
        case 'good':
          result = 2;
          break;
      }
    }
    return result;
  }
}

export default Product;
