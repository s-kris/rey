import React from 'react';
import { View } from 'react-native-web';
import 'normalize.css';

import './styles/variables.css';
import './styles/common.css';
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
