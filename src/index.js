import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

module.hot.accept();

if (module.hot) {
  module.hot.accept('./App', () => {
    const HApp = require('./App').default;
    ReactDOM.render(<HApp />, document.getElementById('root'));
  });
}
