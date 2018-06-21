import React from 'react';
import { View } from 'react-native-web';
import 'normalize.css';
import firebase from 'firebase';
import ReactGA from 'react-ga';

import './styles/variables.css';
import './styles/common.css';
// import Routes from './config/Routes';
import userStore from './stores/userStore';
import { fbaseConfig } from './config/firebase';
import { getFromFirebase } from './api/firebase';
import { COL_MUSIC_DATA, GA_ID } from './config/Constants';
import musicStore from './stores/musicStore';
import HomeScreen from './screens/HomeScreen';
// import { clearAll } from './api/storage';

class App extends React.Component {
  constructor() {
    super();
    firebase.initializeApp(fbaseConfig);
    ReactGA.initialize(GA_ID);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('signed in');
        userStore.loggedIn = true;
        userStore.user = firebase.auth().currentUser;
        getFromFirebase(COL_MUSIC_DATA, data => {
          musicStore.setPlaylists(data.playlists);
        });
      } else {
        console.log('signed out');
        userStore.loggedIn = false;
        userStore.user = null;
      }
    });
  }

  render() {
    // clearAll();
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}

export default App;
