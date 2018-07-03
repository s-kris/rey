import React from 'react';
import { View } from 'react-native-web';
import 'normalize.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReactGA from 'react-ga';
// import { hot } from 'react-hot-loader';

import './styles/variables.css';
import './styles/common.css';
// import Routes from './config/Routes';
import userStore from './stores/userStore';
import { fbaseConfig } from './config/firebase';
import { getFromFirebase } from './api/firebase';
import { COL_MUSIC_DATA, GA_ID } from './config/Constants';
import musicStore from './stores/musicStore';
import HomeScreen from './screens/HomeScreen';
import DesktopApp from './screens/DesktopApp';
import playerStore from './stores/playerStore';
// import { clearAll } from './api/storage';

class App extends React.Component {
  constructor() {
    super();
    firebase.initializeApp(fbaseConfig);
    ReactGA.initialize(GA_ID);
    ReactGA.pageview(window.location.pathname);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //  console.log('signed in');
        userStore.loggedIn = true;
        userStore.user = firebase.auth().currentUser;
        getFromFirebase(COL_MUSIC_DATA, data => {
          musicStore.setPlaylists(data.playlists);
        });
      } else {
        // console.log('signed out');
        userStore.loggedIn = false;
        userStore.user = null;
      }
    });
  }

  renderUI = currentUrl => {
    if (currentUrl === '/standaloneapp') {
      return <DesktopApp />;
    }

    const script = document.createElement('script');
    script.src =
      'https://platform-api.sharethis.com/js/sharethis.js#property=5b2c936fa7603d0012fa8905&product=sticky-share-buttons';
    script.async = true;
    document.body.appendChild(script);
    return <HomeScreen />;
  };

  render() {
    // clearAll();
    playerStore.showControls = true;
    return <View>{this.renderUI(window.location.pathname)}</View>;
  }
}

// export default hot(module)(App);
export default App;
