import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { ScaleLoader } from 'react-spinners';

import musicStore from '../../stores/musicStore';
import { themeColor } from './../../config/Colors';

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
});

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

  render() {
    const { track, currentTrack } = this.props;
    return (
      <div className={`media-playlist-track ${track === currentTrack ? 'is-active' : ''}`}>
        <View style={styles.row}>
          <Text style={styles.pointer} onClick={() => this.props.onItemClick(track)}>
            {track.label} &nbsp; &nbsp;
            <View>
              <ScaleLoader height={10} width={1} color={themeColor} loading={track === currentTrack} />
            </View>
          </Text>
          <View style={styles.actions}>
            <Text style={styles.pointer} onClick={() => this._onClickAdd()}>
              +
            </Text>
            <Text style={styles.pointer} onClick={() => this._onClickRemove()}>
              -
            </Text>
          </View>
        </View>
      </div>
    );
  }
}

export default PlaylistItem;
