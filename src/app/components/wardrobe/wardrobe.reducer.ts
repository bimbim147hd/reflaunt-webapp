import { combineReducers } from 'redux';
import { list } from './list/list.reducer';
import { detail } from './selling-detail/detail.reducer';

export const Wardrobe = combineReducers({ list, detail });
