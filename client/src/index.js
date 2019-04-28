import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
