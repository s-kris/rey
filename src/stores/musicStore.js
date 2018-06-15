import { store } from 'react-easy-state';
import shortId from 'shortid';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';

import { KEY_CURRENT_TRACK, KEY_NOW_PLAYING_LIST } from './../config/Constants';

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
  setNowPlayingList(array) {
    musicStore.nowPlayingList = array.slice(0);
  },
  addToNowPlayingList(item) {
    if (!item.id) item.id = shortId.generate();
    musicStore.nowPlayingList.push(item);
    Cookies.set(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList(), { expires: 300 });
  },
  insertToNowPlayingList(item, position) {
    const newItem = {
      id: shortId.generate(), // diff ids for same song(multiple) in queue
      src: item.src,
      label: item.label,
    };
    musicStore.nowPlayingList.splice(position + 1, 0, newItem);
    Cookies.set(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList(), { expires: 300 });
  },
  removeFromNowPlayingList(position) {
    musicStore.nowPlayingList.splice(position, 1);
    Cookies.set(KEY_NOW_PLAYING_LIST, musicStore.getNowPlayingList(), { expires: 300 });
  },
  setCurrentTrack(item) {
    ReactGA.event({
      category: 'Player',
      action: 'Song Played',
      value: 1,
    });
    if (!item.id) item.id = shortId.generate();
    musicStore.currentTrack = item;
    Cookies.set(KEY_CURRENT_TRACK, item, { expires: 300 });
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
