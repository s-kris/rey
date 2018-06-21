import React from 'react';
import { View } from 'react-native-web';
import 'normalize.css';

import './styles/variables.css';
import './styles/common.css';
import Routes from './config/Routes';
// import { clearAll } from './api/storage';

class App extends React.Component {
  render() {
    // clearAll();
    // console.log(window.location.origin);
    // if (window.location.origin !== 'http://localhost:3000' || window.location.origin !== 'https://reymusic.co') {
    //   window.location = 'https://reymusic.co';
    // }
    return (
      <View>
        <Routes />
      </View>
    );
  }
}

export default App;
