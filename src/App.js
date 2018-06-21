import React from 'react';
import { View } from 'react-native-web';
import 'normalize.css';
import firebase from 'firebase';

import './styles/variables.css';
import './styles/common.css';
import Routes from './config/Routes';
import userStore from './stores/userStore';
import { fbaseConfig } from './config/firebase';
// import { clearAll } from './api/storage';

class App extends React.Component {
  constructor() {
    super();
    firebase.initializeApp(fbaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userStore.loggedIn = true;
        userStore.user = firebase.auth().currentUser;
        console.log('signed in');
      } else {
        console.log('signed out');
        userStore.loggedIn = false;
        userStore.user = null;
      }
    });
  }

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
