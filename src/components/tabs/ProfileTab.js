import React from 'react';
import { View, Text, Button } from 'react-native-web';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { view } from 'react-easy-state';

import userStore from '../../stores/userStore';
import { themeColor } from '../../config/Colors';

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
};

class ProfileTab extends React.Component {
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult(authResult, redirectUrl) {
        console.log(authResult);
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown() {},
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/terms',
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        {userStore.loggedIn ? (
          <View>
            <Text>Logged in</Text>
            <Button title="logout" color={themeColor} onPress={() => firebase.auth().signOut()} />
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </View>
        )}
      </View>
    );
  }
}

export default view(ProfileTab);
