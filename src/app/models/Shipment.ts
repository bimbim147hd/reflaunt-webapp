import Model from './Model';

class Shipment extends Model {
  constructor(options) {
    super();
    this.bind(options);
  }
}

export default Shipment;
