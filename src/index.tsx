import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render((
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
), document.getElementById('root'));

reportWebVitals();
