import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import 'normalize.css';
import './assets/main.css';
import './assets/fonts/Roboto/stylesheet.css';

// import configureStore from './redux/configureStore';
import App from './containers/App';

// const store = configureStore({});

console.info(process.env.API_HOST);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(require('./containers/App').default);
  });
}
