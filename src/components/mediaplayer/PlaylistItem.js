import React from 'react';
import { View, Text } from 'react-native-web';
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
      <View id={track.id} className={`media-playlist-track ${track.id === currentTrack.id ? 'is-active' : ''}`}>
        <View style={styles.row}>
          <View style={styles.pointer} onClick={() => this.props.onItemClick(track)}>
            <View style={styles.row}>
              <Text numberOfLines={1}>{this._formatLabel(track.label)} &nbsp;</Text>
              <ScaleLoader height={10} width={2} color={themeColor} loading={track.id === currentTrack.id} />
            </View>
          </View>
          <View style={styles.actions}>
            <img style={styles.pointer} src={copyIcon} alt="add" onClick={() => this._onClickAdd()} />
            <Text>&nbsp;</Text>
            <img style={styles.pointer} src={deleteIcon} alt="remove" onClick={() => this._onClickRemove()} />
          </View>
        </View>
      </View>
    );
  }
}

export default PlaylistItem;
