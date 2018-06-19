import shortid from 'shortid';
import moment from 'moment';

import { getDataFromStorage, saveDataToStorage } from './../api/storage';
import { KEY_PLAYLISTS } from './../config/Constants';
import musicStore from './../stores/musicStore';
import { showToast } from './../utils/utils';

class Playlists {
  static getAll() {
    if (!getDataFromStorage(KEY_PLAYLISTS)) {
      return [];
    }
    return getDataFromStorage(KEY_PLAYLISTS);
  }

  static createNew(playlistName, array) {
    let playlists = getDataFromStorage(KEY_PLAYLISTS);
    if (!playlists) {
      playlists = [];
    }
    playlists.push({
      id: shortid.generate(),
      name: playlistName,
      data: array,
      created: moment().format(),
    });
    saveDataToStorage(KEY_PLAYLISTS, playlists);
    musicStore.setPlaylists(playlists);
    showToast('New playlist saved');
  }

  static addToPlaylist(playlistId, array) {
    const playlists = getDataFromStorage(KEY_PLAYLISTS);
    let playlistName = '';
    playlists.forEach(p => {
      if (p.id === playlistId) {
        const newData = p.data.concat(array);
        p.data = newData;
        p.updated = moment().format();
        playlistName = p.name;
      }
    });
    musicStore.setPlaylists(playlists);
    showToast(`Added to ${playlistName}`);
  }

  static deletePlaylist(playlistId) {
    const playlists = getDataFromStorage(KEY_PLAYLISTS);
    let playlistName = '';
    playlists.forEach((p, position) => {
      if (p.id === playlistId) {
        playlists.splice(position, 1);
        playlistName = p.name;
      }
    });
    musicStore.setPlaylists(playlists);
    showToast(`${playlistName} deleted!`);
  }
}

export default Playlists;
