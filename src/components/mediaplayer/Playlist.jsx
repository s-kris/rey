import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';

import PlaylistItem from './PlaylistItem';
import musicStore from './../../stores/musicStore';
import deleteIcon from './../../assets/images/icons/delete.png';

const styles = {
  nowPlaying: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#373d3f',
  },
  pointer: {
    cursor: 'pointer',
  },
};

class Playlist extends React.Component {
  _handleTrackClick(track) {
    this.props.onTrackClick(track);
  }

  _focusNowPlayingItem = position => {
    // this.flatListRef.scrollToIndex({ index: position - 1 });
    // console.log(document.getElementById(id));
    // document.getElementById(id).scrollTop = 10;
  };

  render() {
    const { tracks, currentTrack } = this.props;
    let playlistdata = [];
    playlistdata = tracks.map((p, i) => {
      // data needs a 'key' property for flatlist
      playlistdata[i] = p;
      playlistdata[i].key = p.id + i;
      return playlistdata[i];
    });

    return (
      <View className="media-playlist">
        <View style={styles.nowPlaying}>
          <Text style={{ fontStyle: 'bold', fontWeight: '600' }}>NOW PLAYING</Text>
          <img
            style={styles.pointer}
            src={deleteIcon}
            alt="clear all"
            onClick={() => musicStore.clearNowPlayingList()}
          />
        </View>
        {
          <FlatList
            style={{ marginTop: 0 }}
            data={tracks}
            renderItem={(
              { item, index } // console.log(index)
            ) => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: '#373d3f',
                }}
              >
                <PlaylistItem
                  key={item.id + index}
                  track={item}
                  position={index}
                  focus={() => this._focusNowPlayingItem(index)}
                  currentTrack={currentTrack}
                  onItemClick={() => this._handleTrackClick(item)}
                />
              </View>
            )}
          />
        }
      </View>
    );
  }
}

export default view(Playlist);
