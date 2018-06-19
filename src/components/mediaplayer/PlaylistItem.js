import React from 'react';
import { View, Text } from 'react-native-web';
import { ScaleLoader } from 'react-spinners';
import { view } from 'react-easy-state';
import ReactSVG from 'react-svg';

import './../../styles/playlist.css';
import musicStore from '../../stores/musicStore';
import { themeColor } from './../../config/Colors';
import deleteIcon from './../../assets/images/icons/delete.svg';
import copyIcon from './../../assets/images/icons/copy.svg';

const styles = {
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    width: 51,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    const isActive = track.id === currentTrack.id;
    if (isActive) {
      this.props.focus();
    }
    return (
      <View id={track.id} className={`media-playlist-track ${isActive ? 'is-active' : ''}`}>
        <View style={styles.row}>
          <View style={styles.pointer} onClick={() => this.props.onItemClick(track)}>
            <View style={styles.row}>
              <Text className="font" numberOfLines={1} style={{ fontSize: 16, letterSpacing: 0 }}>
                {this._formatLabel(track.label)} &nbsp;
              </Text>
              <ScaleLoader height={10} width={2} color={themeColor} loading={track.id === currentTrack.id} />
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <ReactSVG
              path={copyIcon}
              evalScripts="always"
              svgClassName="action-icon"
              onClick={() => {
                this._onClickAdd();
              }}
            />
            <Text className="font">&nbsp;</Text>
            <ReactSVG
              path={deleteIcon}
              evalScripts="always"
              svgClassName="action-icon-delete"
              onClick={() => {
                this._onClickRemove();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default view(PlaylistItem);
