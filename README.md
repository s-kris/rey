# Rey
> A beautiful and intuitive web app to use youtube as a music player 

![screenshot of main ui](https://i.redd.it/z2nrymdg2g511.png)

#### Context:
Many of us use Youtube to listen to music. But Youtube wasn't designed with music in mind. So, I created 'Rey' with simple and intuitive UI which takes youtube as data source! It is only for desktop now ( webapp and standalone app ).

**Website:** https://reymusic.co

**Details:**

Built with React ( But planning to switch to Preact )

Used react-easy-state instead of redux/mobx. It is way simpler.

Standalone app is nothing but an electron wrapper with https://desktop.appmaker.xyz/.

Used react-native-web to write the UI instead of html tags.

I wrote a detailed post on why I created rey here: https://www.reddit.com/r/Music/comments/8sxjxo/rey_reimagined_youtube_music_player_for_desktop_i/

## Config

Create 'firebase.js' in ./src/config/ with your project config from console.firebase.com

firebase.js
```bash
export const fbaseConfig = {
  apiKey: 'YOUR_FIREBASE_PROJECT_API_KEY',
  authDomain: 'YOUR_FIREBASE_PROJECT.firebaseapp.com',
  databaseURL: 'YOUR_FIREBASE_PROJECT.firebaseio.com',
  projectId: 'YOUR_FIREBASE_PROJECT',
  storageBucket: 'YOUR_FIREBASE_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_FIREBASE_PROJECT_MSG_SEN_ID',
};
```

## Run locally

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build

```
