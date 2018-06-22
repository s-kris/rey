import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { COL_MUSIC_DATA } from '../config/Constants';
import { showToast } from '../utils/utils';
import musicStore from '../stores/musicStore';

export const saveToFirebase = (collection, data, callback) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);

  db.collection(collection)
    .doc(user.uid)
    .set(data)
    .then(() => {
      callback();
      // console.log('Document written ');
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

export const getFromFirebase = (collection, callback) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);
  db.collection(collection)
    .doc(user.uid)
    .get()
    .then(doc => {
      callback(doc.data());
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

export const deleteDataFromFirebase = (userId, callback) => {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);
  db.collection(COL_MUSIC_DATA)
    .doc(userId)
    .delete()
    .then(() => {
      // console.log('Document successfully deleted!');
      callback();
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export const deleteAccount = callback => {
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  deleteDataFromFirebase(userId, () => {
    user
      .delete()
      .then(() => {
        callback();
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/requires-recent-login') {
          showToast('Please re-login');
        }
        firebase
          .auth()
          .signOut()
          .then(() => {
            musicStore.setPlaylists([]);
          });
      });
  });
};
