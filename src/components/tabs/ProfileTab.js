import React from 'react';
import { View, Text, Button } from 'react-native-web';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { view } from 'react-easy-state';
import moment from 'moment';
import alertify from 'alertify.js';

import userStore from '../../stores/userStore';
import { themeColor } from '../../config/Colors';
import musicStore from '../../stores/musicStore';
import { COL_MUSIC_DATA, KEY_DELETE_ACCOUNT_FLAG } from './../../config/Constants';
import { saveToFirebase, deleteAccount, getFromFirebase } from './../../api/firebase';
import { showToast } from '../../utils/utils';
import { saveDataToStorage, getDataFromStorage } from '../../api/storage';

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
    // borderWidth: 2,
    // borderColor: 'grey',
    // borderStyle: 'solid',
    // borderRadius: 2,
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
      signInSuccessWithAuthResult(authResult, redirectUrl) {
        if (authResult.additionalUserInfo.isNewUser) {
          //   console.log('new user');
          const data = {
            playlists: musicStore.getAllPlaylists(),
            createdAt: moment().format(),
          };
          saveToFirebase(COL_MUSIC_DATA, data, () => {});
        } else {
          getFromFirebase(COL_MUSIC_DATA, data => {
            musicStore.setPlaylists(data.playlists);
          });
        }
        showToast('Playlists synced!');
        return false;
      },
    },

    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/terms',
  };

  _confirmDelete = () => {
    if (getDataFromStorage(KEY_DELETE_ACCOUNT_FLAG)) {
      saveDataToStorage(KEY_DELETE_ACCOUNT_FLAG, false);
      deleteAccount(() => {
        alertify
          .okBtn('Delete Cache')
          .cancelBtn('Keep')
          .confirm(
            'Account deleted. Do you want to remove cached data?',
            () => {
              // user clicked "ok"
              musicStore.setPlaylists([]);
              musicStore.setCurrentTrack({});
              musicStore.setNowPlayingList([]);
            },
            () => {
              // user clicked "cancel"
            }
          );
      });
    } else {
      showToast('You need to login again');
      saveDataToStorage(KEY_DELETE_ACCOUNT_FLAG, true);
      this._onClickLogout();
    }
  };

  _onClickDeleteAccount = () => {
    alertify
      .okBtn('Yes, delete')
      .cancelBtn('Cancel')
      .confirm(
        'Do you want to delete your account? All data will be lost and can not be recovered.',
        () => {
          this._confirmDelete();
        },
        () => {
          saveDataToStorage(KEY_DELETE_ACCOUNT_FLAG, false);
          // user clicked "cancel"
        }
      );
  };

  _onClickLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        musicStore.setPlaylists([]);
      });
  };

  render() {
    const { user } = userStore;
    const { displayName, email } = user || {};
    const signedInWith = user && user.providerData ? userStore.user.providerData[0].providerId : '';

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
              <Button title="Delete Account" color="red" onPress={() => this._onClickDeleteAccount()} />
              <Button title="logout" color={themeColor} onPress={() => this._onClickLogout()} />
            </View>
          </View>
        ) : (
          <View style={styles.centerContainer}>
            <Text className="font">You can use Rey without signing in but your playlists won't be saved to cloud</Text>
            <View style={styles.divider} />
            <Text className="font">sign-in to sync with cloud</Text>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </View>
        )}
      </View>
    );
  }
}

export default view(ProfileTab);
