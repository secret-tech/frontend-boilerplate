import { combineReducers } from 'redux-seamless-immutable';

import app from './modules/app/app';

export default combineReducers({
  app: combineReducers({
    app
  })
});
