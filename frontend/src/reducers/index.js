import { combineReducers } from 'redux';
import users from './userReducer';
import posts from './postReducer';

export default combineReducers({
  users: users,
  posts: posts
})
