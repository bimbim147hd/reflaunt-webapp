import * as _ from 'lodash';
import {
  FETCH_MESSAGES_SUCCESSED,
  SELECTED_MESSAGES_REQUESTED
} from './queries.actions';

export const Queries = (
  state = {
    fetched: false,
    items: [],
    messageSelected: undefined,
    replyMessage: undefined
  },
  action
) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESSED:
      let queries = _.filter(action.data, i => !i.reply_to);
      queries = _.map(queries, i => {
        const reply_mess = _.filter(action.data, o => o.reply_to === i.id);
        if (!_.isEmpty(reply_mess)) {
          i.reply_mess = _.sortBy(reply_mess, ['id']);
        }
        if (i.read.read_date) {
          i.unread = false;
        } else {
          i.unread = true;
        }
        return i;
      });
      return _.assign({}, state, {
        fetched: true,
        items: queries
      });
    case SELECTED_MESSAGES_REQUESTED:
      state.replyMessage = undefined;
      return _.assign({}, state, {
        messageSelected: _.find(state.items, i => i.id === action.data.id),
        items: _.map(state.items, i => {
          delete i.selected;
          if (i.id === action.data.id) {
            i.selected = true;
          }
          return i;
        })
      });
    default:
      return state;
  }
};
