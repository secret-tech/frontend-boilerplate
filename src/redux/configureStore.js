import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';

import rootReducer from './rootReducer';
import rootSaga from '../sagas/rootSaga';

const stateTransformer = (state) => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS();
  return state;
};

const history = createHistory();
const initialState = Immutable.Map();
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer
});

const configureStoreProduction = () => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const configureStoreDev = () => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    loggerMiddleware
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = process.env.NODE_ENV === 'development'
  ? configureStoreDev()
  : configureStoreProduction();

export { store, history };
