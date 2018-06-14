import React from 'react';
import { View } from 'react-primitives';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './config/Routes';

class App extends React.Component {
  render() {
    return (
      <View>
        <Routes />
      </View>
    );
  }
}

export default App;
