import React from 'react';
import { ScaleLoader } from 'react-spinners';

import musicStore from '../../stores/musicStore';
import { themeColor } from './../../config/Colors';
import deleteIcon from './../../assets/images/icons/delete.png';
import copyIcon from './../../assets/images/icons/copy.png';

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointer: {
    cursor: 'pointer',
  },
};

class PlaylistItem extends React.Component {
  _onClickAdd = () => {
    musicStore.insertToNowPlayingList(this.props.track, this.props.position);
  };

  _onClickRemove = () => {
    const { track, position } = this.props;
    const nowPlayingTrack = musicStore.getCurrentTrack();
    const nowPlayingList = musicStore.getNowPlayingList();
    musicStore.removeFromNowPlayingList(this.props.position);

    if (track.id === nowPlayingTrack.id) {
      if (nowPlayingList.length === 0) {
        musicStore.setCurrentTrack({
          src: '',
        });
        return;
      }

      switch (position) {
        case nowPlayingList.length:
          musicStore.setCurrentTrack(nowPlayingList[position - 1]);
          break;
        default:
          musicStore.setCurrentTrack(nowPlayingList[position]);
          break;
      }
    }
  };

  _formatLabel = name => name.substring(0, 22);

  render() {
    const { track, currentTrack } = this.props;
    return (
      <div id={track.id} className={`media-playlist-track ${track.id === currentTrack.id ? 'is-active' : ''}`}>
        <div style={styles.row}>
          <div style={styles.pointer} onClick={() => this.props.onItemClick(track)}>
            <div style={styles.row}>
              {this._formatLabel(track.label)} &nbsp;
              <ScaleLoader height={10} width={2} color={themeColor} loading={track.id === currentTrack.id} />
            </div>
          </div>
          <div style={styles.actions}>
            <img style={styles.pointer} src={copyIcon} alt="add" onClick={() => this._onClickAdd()} />
            &nbsp;
            <img style={styles.pointer} src={deleteIcon} alt="remove" onClick={() => this._onClickRemove()} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistItem;
