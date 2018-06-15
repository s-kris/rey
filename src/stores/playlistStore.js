import { store } from 'react-easy-state';
import shortId from 'shortid';

const playlistStore = store({
  playlist: [
    // { src: 'https://www.youtube.com/watch?v=KZDzO36P8Wg', label: 'Sada Nannu' },
    // { src: 'https://www.youtube.com/watch?v=XruNLPI0yQc', label: 'Cheliya Sakhiya' },
    // { src: 'https://www.youtube.com/watch?v=XruNLPI0yQc', label: 'Cheliya Sakhiya' },
    // { src: 'https://www.youtube.com/watch?v=b8Zc4WGOcE0', label: 'Enduko Emo' },
    // { src: 'https://www.youtube.com/watch?v=MtcfU0XXSfY', label: 'Ninnena Nenu' },
  ],
  currentTrack: {},
  getPlaylist() {
    return playlistStore.playlist;
  },
  addToPlaylist(item) {
    item.id = shortId.generate();
    playlistStore.playlist.push(item);
  },
  insertToPlaylist(item, position) {
    const newItem = {
      id: shortId.generate(), // diff ids for same song(multiple) in queue
      src: item.src,
      label: item.label,
    };
    playlistStore.playlist.splice(position + 1, 0, newItem);
  },
  removeFromPlaylist(position) {
    playlistStore.playlist.splice(position, 1);
  },
  setCurrentTrack(item) {
    // save data here cause this is called everytime i guess
    if (!item.id) item.id = shortId.generate();
    playlistStore.currentTrack = item;
  },
  getCurrentTrack() {
    return playlistStore.currentTrack;
  },
  playTrack(item) {
    playlistStore.setCurrentTrack(item);
    // playlistStore.currentTrack = item;
    playlistStore.playlist.push(item);
  },
});

export default playlistStore;
