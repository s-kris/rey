import React from 'react';
import 'normalize.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/common.css';

import Routes from './config/Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes />
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default App;
