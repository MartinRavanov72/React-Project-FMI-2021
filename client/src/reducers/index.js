import { combineReducers } from 'redux';

import posts from './postReducer';
import users from './userReducer';
import albums from './albumReducer';
import events from './eventReducer';

export const reducers = combineReducers({ posts, users, albums, events });
