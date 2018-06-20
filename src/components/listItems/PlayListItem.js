import React from 'react';
import { View, Text } from 'react-native-web';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';

import './../../styles/song-item.css';
import playIcon from './../../assets/images/icons/play.svg';
import deleteIcon from './../../assets/images/icons/delete.svg';
import editIcon from './../../assets/images/icons/edit.svg';
import queueIcon from './../../assets/images/icons/add.svg';
import musicStore from './../../stores/musicStore';
import Playlists from '../../api/playlists';
import { showToast } from '../../utils/utils';

class PlaylistItem extends React.Component {
  _onClickPlay = () => {
    const { data, name } = this.props;
    if (data.length === 0) {
      musicStore.playTrack({
        src: data[0].src,
        id: data[0].id,
        label: this._formatLabel(data[0].label),
      });
      data.shift();
      musicStore.queuePlaylistToNowPlaying(data);
      showToast(`Playing '${name}'`);
    } else {
      showToast(`No songs in the playlist: '${name}'`);
    }
  };

  _onClickQueue = () => {
    const { data } = this.props;
    if (data.length === 0) {
      musicStore.playTrack({
        src: data[0].src,
        id: data[0].id,
        label: this._formatLabel(data[0].label),
      });
    }
    musicStore.queuePlaylistToNowPlaying(data);
    showToast('Added to Now Playing');
  };

  _onClickEdit = () => {};

  _onClickDelete = () => {
    Playlists.deletePlaylist(this.props.id);
  };

  _formatLabel = name => name;
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
        <Text className="title font" numberOfLines={1} onClick={() => this._onClickQueue()}>
          {this._formatLabel(this.props.name)} &nbsp; &nbsp; ({this.props.data.length} Songs)
        </Text>
        <View className="actions-container">
          <ReactSVG
            path={playIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickPlay();
            }}
          />
          <ReactSVG
            path={queueIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickQueue();
            }}
          />

          <ReactSVG
            path={editIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickEdit();
            }}
          />
          <ReactSVG
            path={deleteIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: '#373d3f' }}
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
