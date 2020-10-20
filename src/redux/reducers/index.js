import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { history } from '..';

import auth from './auth';

const createRootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return combineReducers({
    router: connectRouter(history),
    auth,
  });
};

export default createRootReducer;
