import firebase from 'firebase';
import userStore from './../stores/userStore';
import { COL_PLAYLISTS } from '../config/Constants';

export const saveToFirebase = (collection, data, callback) => {
  console.log('in fbase fun save');
  const { user } = userStore;
  console.log(`user: ${user.uid}`);
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);

  const dataToSave = { allPlaylists: data, addedBy: user.uid };

  db.collection(collection)
    .doc(user.uid)
    .set(dataToSave) // array to object cause of fbase
    .then(() => {
      callback();
      console.log('Document written ');
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

export const getFromFirebase = (collection, data, callback) => {
  const { user } = userStore;
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);
  db.collection(collection)
    .doc(user.uid)
    .set({ data }) // array to object cause of fbase
    .then(docRef => {
      callback();
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
};

export const deleteDataFromFirebase = callback => {
  const { user } = userStore;
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);
  db.collection(COL_PLAYLISTS)
    .doc(user.uid)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
      callback();
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export const deleteAccount = callback => {
  deleteDataFromFirebase(() => {
    const user = firebase.auth().currentUser;
    user
      .delete()
      .then(() => {
        // User deleted.
        callback();
      })
      .catch(error => {
        // An error happened.
      });
  });
};
