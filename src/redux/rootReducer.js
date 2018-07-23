import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form';

import counter from './modules/app/counter';

export default combineReducers({
  form,

  app: combineReducers({
    counter
  })
});
