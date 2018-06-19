import shortid from 'shortid';
import moment from 'moment';

import { getDataFromStorage, saveDataToStorage } from './../api/storage';
import { KEY_PLAYLISTS } from './../config/Constants';
import musicStore from './../stores/musicStore';
import { showToast } from './../utils/utils';

class Playlists {
  static createNew(playlistName) {
    let playlists = getDataFromStorage(KEY_PLAYLISTS);
    if (!playlists) {
      playlists = [];
    }
    playlists.push({
      id: shortid.generate(),
      name: playlistName,
      data: musicStore.getNowPlayingList(),
      created: moment().format(),
    });
    saveDataToStorage(KEY_PLAYLISTS, playlists);
    showToast('New playlist saved');
  }

  static addToPlaylist(playlistId) {
    const playlists = getDataFromStorage(KEY_PLAYLISTS);
    let playlistName = '';
    playlists.forEach(p => {
      if (p.id === playlistId) {
        const newData = p.data.concat(musicStore.getNowPlayingList());
        p.data = newData;
        playlistName = p.name;
      }
    });
    saveDataToStorage(KEY_PLAYLISTS, playlists);
    showToast(`Added to ${playlistName}`);
  }

  static getAll() {
    return getDataFromStorage(KEY_PLAYLISTS);
  }
}

export default Playlists;
