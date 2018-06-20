import { store } from 'react-easy-state';
import shortId from 'shortid';
import ReactGA from 'react-ga';

import { KEY_CURRENT_TRACK, KEY_NOW_PLAYING_LIST, KEY_PLAYLISTS } from './../config/Constants';
import { saveDataToStorage } from './../api/storage';
import Playlists from './../api/playlists';

const musicStore = store({
  nowPlayingList: [
    // { src: 'https://www.youtube.com/watch?v=KZDzO36P8Wg', label: 'Sada Nannu' },
    // { src: 'https://www.youtube.com/watch?v=XruNLPI0yQc', label: 'Cheliya Sakhiya' },
    // { src: 'https://www.youtube.com/watch?v=XruNLPI0yQc', label: 'Cheliya Sakhiya' },
    // { src: 'https://www.youtube.com/watch?v=b8Zc4WGOcE0', label: 'Enduko Emo' },
    // { src: 'https://www.youtube.com/watch?v=MtcfU0XXSfY', label: 'Ninnena Nenu' },
  ],
  currentTrack: {},
  getNowPlayingList() {
    return musicStore.nowPlayingList;
  },
  clearNowPlayingList() {
    musicStore.setNowPlayingList([]);
    musicStore.setCurrentTrack({});
    saveDataToStorage(KEY_NOW_PLAYING_LIST, []);
  },
  setNowPlayingList(array) {
    musicStore.nowPlayingList = array.slice(0);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, musicStore.nowPlayingList);
  },
  addToNowPlayingList(item) {
    if (!item.id) {
      item.id = shortId.generate();
    }
    const list = musicStore.getNowPlayingList();
    list.push(item);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, list);
  },
  insertToNowPlayingList(item, position) {
    const newItem = {
      id: shortId.generate(), // diff ids for same song(multiple) in queue
      src: item.src,
      label: item.label,
    };
    const list = musicStore.getNowPlayingList();
    list.splice(position + 1, 0, newItem);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, list);
  },
  removeFromNowPlayingList(position) {
    const list = musicStore.getNowPlayingList();
    list.splice(position, 1);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, list);
  },
  setCurrentTrack(item) {
    ReactGA.event({
      category: 'Player',
      action: 'Song Played',
      value: 1,
    });
    if (!item.id) item.id = shortId.generate();
    musicStore.currentTrack = item;
    saveDataToStorage(KEY_CURRENT_TRACK, item);
  },
  getCurrentTrack() {
    return musicStore.currentTrack;
  },
  playTrack(item) {
    ReactGA.event({
      category: 'Player',
      action: 'Song Played',
      value: 1,
    });

    musicStore.setCurrentTrack(item);
    musicStore.addToNowPlayingList(item);
  },
  playlists: Playlists.getAll(),
  getAllPlaylists() {
    return musicStore.playlists;
  },
  setPlaylists(array) {
    musicStore.playlists = array.slice(0);
    saveDataToStorage(KEY_PLAYLISTS, musicStore.playlists);
  },
  queuePlaylistToNowPlaying(array) {
    const newArray = [];
    array.forEach(element => {
      newArray.push({
        id: shortId.generate(),
        key: shortId.generate(),
        label: element.label,
        src: element.src,
      });
    });

    newArray.forEach(element => {
      console.log(element.id);
      musicStore.addToNowPlayingList(element);
    });
  },
});

export default musicStore;
