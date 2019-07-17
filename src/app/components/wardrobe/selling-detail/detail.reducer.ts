import { GET_PRODUCT_DETAIL_SUCCESSED } from './detail.actions';
import * as _ from 'lodash';

export const detail = (state = { fetched: false }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESSED:
      let condition_description_item;
      Object.keys(action.data.condition_description_items).forEach(function(
        key
      ) {
        if (
          key.split('_').join('') ===
          action.data.condition.data.name.split(' ').join('')
        ) {
          condition_description_item =
            action.data.condition_description_items[key];
        }
      });
      const images = _.map(action.data.images, 'url');
      return _.assign(state, {
        fetched: true,
        item: _.assign(action.data, {
          item_includes: _.chunk(action.data.item_includes, 5),
          condition_description_item: condition_description_item,
          images: images,
          signs_of_wear: [
            { title: 'Exterior scruffle or marks', checked: false },
            { title: 'Interior Lining or Wear', checked: false },
            { title: 'Leather Aging', checked: true },
            { title: 'Odour', checked: true },
            { title: 'Zipper Broken', checked: false }
          ]
        })
      });
    default:
      return state;
  }
};
