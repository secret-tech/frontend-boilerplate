import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { AppContainer } from 'react-hot-loader';

import Main from './containers/app/Main';

// import 'normalize.css';
import './assets/main.css';
import './assets/fonts/Roboto/stylesheet.css';

import { history, store } from './redux/configureStore';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main/>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(require('./routes').default);
  });
}
