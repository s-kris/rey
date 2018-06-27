import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';
import ReactSVG from 'react-svg';
// import alertify from 'alertify.js';

import './../../styles/playlist.css';
import NowPlayingListItem from './NowPlayingListItem';
import musicStore from './../../stores/musicStore';
import deleteIcon from './../../assets/images/icons/delete.svg';
import { showToast } from '../../utils/utils';
import SaveButton from '../SaveButton';
import { primaryColorLight } from '../../config/Colors';

const styles = {
  nowPlayingHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    backgroundColor: primaryColorLight,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //   width: 50,
  },
};

// const indexOfTopItem = 0;

class NowPlayingList extends React.Component {
  _handleTrackClick(track) {
    this.props.onTrackClick(track);
  }

  _focusNowPlayingItem = position => {
    // showToast(position - indexOfTopItem);
    setTimeout(() => {
      try {
        this.flatListRef.scrollToIndex({ animated: true, index: position });
      } catch (e) {
        console.log(e);
      }
    }, 100);
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
        <View style={styles.nowPlayingHeader}>
          <Text className="font">NOW PLAYING</Text>
          <View style={styles.actionsContainer}>
            {/* <ReactSVG
              path={saveIcon}
              evalScripts="always"
              svgClassName="action-icon"
              onClick={() => {
                this._saveNowPlayingList();
              }}
            /> */}
            <SaveButton dataToSave={musicStore.getNowPlayingList()} />

            <ReactSVG
              path={deleteIcon}
              evalScripts="always"
              svgClassName="action-icon-delete"
              onClick={() => {
                musicStore.clearNowPlayingList();
                showToast('Cleared Now Playing');
              }}
            />
          </View>
        </View>
        {
          <FlatList
            style={{ marginTop: 0 }}
            // keyExtractor={item => item.id}
            data={tracks}
            ref={ref => {
              this.flatListRef = ref;
            }}
            // onScroll={e => {
            //   const offset = e.nativeEvent.contentOffset.y;
            //   const index = parseInt(offset / 50); // your cell height
            //   indexOfTopItem = index;
            // }}
            renderItem={(
              { item, index } // console.log(index)
            ) => (
              <View
                id="nowPlayingListItem"
                style={{
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColorLight,
                }}
              >
                <NowPlayingListItem
                  key={item.id + index}
                  track={item}
                  position={index}
                  focus={() => this._focusNowPlayingItem(index)}
                  currentTrack={currentTrack}
                  //  getItemLayout={this._getItemLayout}
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

export default view(NowPlayingList);
