import Model from './Model';
import Conversation from './Conversation';
import Unread from './Unread';
import User from './User';

class Message extends Model {
  constructor(options) {
    super();
    (this as any).conversation = d => {
      return new Conversation(d.data);
    };
    (this as any).read = d => {
      return new Unread(d.data);
    };
    (this as any).user = d => {
      return new User(d.data);
    };
    this.bind(options);
  }
}

export default Message;
