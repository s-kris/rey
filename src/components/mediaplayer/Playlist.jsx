import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';
import ReactSVG from 'react-svg';
// import alertify from 'alertify.js';
import Modal from 'react-responsive-modal';

import './../../styles/playlist.css';
import PlaylistItem from './PlaylistItem';
import musicStore from './../../stores/musicStore';
import deleteIcon from './../../assets/images/icons/delete.svg';
import saveIcon from './../../assets/images/icons/save.svg';
// import AlertBox from './../AlertBox';
import SaveAsPlaylist from '../SaveAsPlaylist';
import { showToast } from '../../utils/utils';

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
    backgroundColor: '#373d3f',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
  },
};

class Playlist extends React.Component {
  state = {
    open: false,
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  _handleTrackClick(track) {
    this.props.onTrackClick(track);
  }

  _focusNowPlayingItem = position => {
    // this.flatListRef.scrollToIndex({ index: position - 1 });
    // console.log(document.getElementById(id));
    // document.getElementById(id).scrollTop = 10;
  };

  _saveNowPlayingList = () => {
    this.openModal();
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
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          center
          styles={{
            modal: {
              padding: 0,
            },
          }}
          showCloseIcon={false}
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        >
          <SaveAsPlaylist closeModal={() => this.closeModal()} />
          {/* <AlertBox message="save now or not" yexText="yes" noText="close" onClickNo={() => this.closeModal()} /> */}
        </Modal>
        <View style={styles.nowPlayingHeader}>
          <Text className="font">NOW PLAYING</Text>
          <View style={styles.actionsContainer}>
            <ReactSVG
              path={saveIcon}
              evalScripts="always"
              svgClassName="action-icon"
              onClick={() => {
                this._saveNowPlayingList();
              }}
            />
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
