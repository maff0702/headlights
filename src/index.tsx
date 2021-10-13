import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render((
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
), document.getElementById('root'));

reportWebVitals();
