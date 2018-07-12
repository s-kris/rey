import React from 'react';
import 'normalize.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReactGA from 'react-ga';
// import { hot } from 'react-hot-loader';

import './styles/variables.css';
import './styles/common.css';
import Routes from './config/Routes';
import userStore from './stores/userStore';
import { fbaseConfig } from './config/firebase';
import { getFromFirebase } from './api/firebase';
import { COL_MUSIC_DATA, GA_ID } from './config/Constants';
import musicStore from './stores/musicStore';
import playerStore from './stores/playerStore';

class App extends React.Component {
  constructor() {
    super();
    firebase.initializeApp(fbaseConfig);
    ReactGA.initialize(GA_ID);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userStore.loggedIn = true;
        userStore.user = firebase.auth().currentUser;
        getFromFirebase(COL_MUSIC_DATA, data => {
          musicStore.setPlaylists(data.playlists);
        });
      } else {
        userStore.loggedIn = false;
        userStore.user = null;
      }
    });
  }

  componentDidMount() {
    if (window.location.pathname !== '/standaloneapp') {
      const script = document.createElement('script');
      script.src =
        'https://platform-api.sharethis.com/js/sharethis.js#property=5b2c936fa7603d0012fa8905&product=sticky-share-buttons';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  render() {
    playerStore.showControls = true;
    return <Routes />;
  }
}

// export default hot(module)(App);
export default App;
