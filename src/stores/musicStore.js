import { store } from 'react-easy-state';
import shortId from 'shortid';
import ReactGA from 'react-ga';

import { showAlert } from './../utils/utils';
import { KEY_CURRENT_TRACK, KEY_NOW_PLAYING_LIST } from './../config/Constants';
import { saveDataToStorage } from './../api/storage';

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
    showAlert('All cleared');
  },
  setNowPlayingList(array) {
    musicStore.nowPlayingList = array.slice(0);
  },
  addToNowPlayingList(item) {
    showAlert('Added to queue');
    if (!item.id) item.id = shortId.generate();
    musicStore.nowPlayingList.push(item);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList());
  },
  insertToNowPlayingList(item, position) {
    showAlert('Added to queue');
    const newItem = {
      id: shortId.generate(), // diff ids for same song(multiple) in queue
      src: item.src,
      label: item.label,
    };
    musicStore.nowPlayingList.splice(position + 1, 0, newItem);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList());
  },
  removeFromNowPlayingList(position) {
    showAlert('Removed from queue');

    musicStore.nowPlayingList.splice(position, 1);
    saveDataToStorage(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList());
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
});

export default musicStore;
