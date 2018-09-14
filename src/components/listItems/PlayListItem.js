import React from 'react';
import { View, Text } from 'react-native-web';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';
import alertify from 'alertify.js';
import dayjs from 'dayjs';
import Modal from 'react-responsive-modal';

import './../../styles/song-item.css';
import playIcon from './../../assets/images/icons/play.svg';
import deleteIcon from './../../assets/images/icons/delete.svg';
import editIcon from './../../assets/images/icons/edit.svg';
import queueIcon from './../../assets/images/icons/add.svg';
import musicStore from './../../stores/musicStore';
import Playlists from '../../api/playlists';
import { showToast } from '../../utils/utils';
import { saveToFirebase } from '../../api/firebase';
import { COL_MUSIC_DATA } from '../../config/Constants';
import { primaryColorLight } from './../../config/Colors';
import EditPlaylist from '../EditPlaylist';

class PlaylistItem extends React.Component {
  state = {
    open: false,
  };

  _onClickPlay = () => {
    const { data, name } = this.props;
    const tmpData = data.slice(0);
    if (data.length > 0) {
      musicStore.playTrack({
        src: data[0].src,
        label: this._formatLabel(data[0].label),
      });
      tmpData.shift();
      musicStore.queuePlaylistToNowPlaying(tmpData);
      showToast(`Playing '${name}'`);
    } else {
      showToast(`No songs in the playlist: '${name}'`);
    }
  };

  _onClickQueue = () => {
    const { data, name } = this.props;
    const nowPlayingList = musicStore.getNowPlayingList();
    const tmpData = data.slice(0);
    if (data.length > 0) {
      if (nowPlayingList.length === 0) {
        musicStore.playTrack({
          src: data[0].src,
          label: this._formatLabel(data[0].label),
        });
        tmpData.shift();
      }
      musicStore.queuePlaylistToNowPlaying(tmpData);
      showToast('Added to Now Playing');
    } else {
      showToast(`No songs in the playlist: '${name}'`);
    }
  };

  _onClickEdit = () => {
    //  showToast('Edit feature is coming soon!');
    this.openModal();
  };

  _onClickDelete = () => {
    const { name, id } = this.props;
    alertify
      .okBtn('Yes, delete')
      .cancelBtn('Cancel')
      .confirm(
        `Do you want to delete the playlist '${name}' ?`,
        () => {
          Playlists.deletePlaylist(id);
          const firebaseData = {
            playlists: musicStore.getAllPlaylists(),
            updatedAt: dayjs().format(),
          };
          saveToFirebase(COL_MUSIC_DATA, firebaseData, () => {});
        },
        () => {
          // user clicked "cancel"
        }
      );
  };

  _formatLabel = name => name;

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <View
        className="song-item-container"
        style={{
          borderLeftWidth: 4,
          borderLeftStyle: 'solid',
          borderLeftColor: randomColor({
            luminosity: 'bright',
            hue: 'blue',
          }),
        }}
      >
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
          <EditPlaylist
            closeModal={() => this.closeModal()}
            data={this.props.data}
            title={this.props.name}
            playlistId={this.props.id}
          />
          {/* <AlertBox message="save now or not" yexText="yes" noText="close" onClickNo={() => this.closeModal()} /> */}
        </Modal>

        <Text className="title font" numberOfLines={1} onClick={() => this._onClickQueue()}>
          {this._formatLabel(this.props.name)} &nbsp; &nbsp; ({this.props.data.length} Songs)
        </Text>
        <View className="actions-container">
          <ReactSVG
            title="Play now"
            path={playIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: primaryColorLight }}
            onClick={() => {
              this._onClickPlay();
            }}
          />
          <ReactSVG
            title="Add to queue"
            path={queueIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: primaryColorLight }}
            onClick={() => {
              this._onClickQueue();
            }}
          />

          <ReactSVG
            title="Edit playlist"
            path={editIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: primaryColorLight }}
            onClick={() => {
              this._onClickEdit();
            }}
          />
          <ReactSVG
            title="Delete"
            path={deleteIcon}
            evalScripts="always"
            svgClassName="action-icon-delete"
            svgStyle={{ fill: primaryColorLight }}
            onClick={() => {
              this._onClickDelete();
            }}
          />
        </View>
      </View>
    );
  }
}

export default PlaylistItem;
