import React from 'react';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/common.css';
import Routes from './config/Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
