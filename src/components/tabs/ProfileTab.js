import React from 'react';
import { View, Text, Button } from 'react-native-web';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { view } from 'react-easy-state';

import userStore from '../../stores/userStore';
import { themeColor } from '../../config/Colors';
import musicStore from '../../stores/musicStore';
import { COL_PLAYLISTS } from './../../config/Constants';
import { saveToFirebase, deleteAccount } from './../../api/firebase';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  centerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 300,
    height: 3,
    margin: 25,
    backgroundColor: themeColor,
  },
  profileContainer: {
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
};

class ProfileTab extends React.Component {
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult(authResult, redirectUrl){
        if (authResult.additionalUserInfo.isNewUser) {
          console.log('ss');
          saveToFirebase(COL_PLAYLISTS, musicStore.getAllPlaylists(), () => {});
        }
        return false;
      },
    },

    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/terms',
  };

  render() {
    const { user } = userStore;
    const { displayName, email } = user || {};
    const signedInWith = user ? userStore.user.providerData[0].providerId : '';

    return (
      <View style={styles.rootContainer}>
        {userStore.loggedIn ? (
          <View style={styles.profileContainer}>
            <View style={styles.row}>
              <Text className="font">Name:</Text>
              <Text className="font">{displayName} </Text>
            </View>
            <View style={styles.row}>
              <Text className="font">E-Mail:</Text>
              <Text className="font">{email} </Text>
            </View>
            <View style={styles.row}>
              <Text className="font">Signed-In with:</Text>
              <Text className="font">{signedInWith} </Text>
            </View>
            <View style={styles.row}>
              <Button title="Delete Account" color="red" onPress={() => deleteAccount(() => {})} />
              <Button title="logout" color={themeColor} onPress={() => firebase.auth().signOut()} />
            </View>
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text className="font">You can use Rey without signing in but your playlists won't be saved to cloud</Text>
            <View style={styles.divider} />
            <Text className="font">sign-in to save to cloud</Text>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </View>
        )}
      </View>
    );
  }
}

export default view(ProfileTab);
