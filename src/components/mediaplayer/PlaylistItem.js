import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { ScaleLoader } from 'react-spinners';

import playlistStore from '../../stores/playlistStore';
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
    playlistStore.insertToPlaylist(this.props.track, this.props.position);
  };

  _onClickRemove = () => {
    playlistStore.removeFromPlaylist(this.props.position);
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
