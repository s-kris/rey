import shortid from 'shortid';
import dayjs from 'dayjs';
import ReactGA from 'react-ga';

import { getDataFromStorage, saveDataToStorage } from './../api/storage';
import { KEY_PLAYLISTS, GA_EVENT_ACTION_PLAYLIST_CREATED, GA_EVENT_CAT_MUSIC } from './../config/Constants';
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
      created: dayjs().format(),
    });
    saveDataToStorage(KEY_PLAYLISTS, playlists);
    musicStore.setPlaylists(playlists);
    showToast('New playlist saved');
    ReactGA.event({
      category: GA_EVENT_CAT_MUSIC,
      action: GA_EVENT_ACTION_PLAYLIST_CREATED,
      value: 1,
    });
  }

  static addToPlaylist(playlistId, array) {
    const playlists = getDataFromStorage(KEY_PLAYLISTS);
    let playlistName = '';
    playlists.forEach(p => {
      if (p.id === playlistId) {
        const newData = p.data.concat(array);
        p.data = newData;
        p.updated = dayjs().format();
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
