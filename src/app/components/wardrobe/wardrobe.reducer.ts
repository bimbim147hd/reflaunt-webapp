import { combineReducers } from 'redux';
import { list } from './list/list.reducer';

export const Wardrobe = combineReducers({ list });
