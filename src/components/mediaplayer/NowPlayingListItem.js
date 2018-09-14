import React from 'react';
import { View, Text } from 'react-native-web';
import { view } from 'react-easy-state';
import ReactSVG from 'react-svg';
import ReactGA from 'react-ga';

import './../../styles/playlist.css';
import musicStore from '../../stores/musicStore';
import { accentColor } from './../../config/Colors';
import deleteIcon from './../../assets/images/icons/delete.svg';
import queueIcon from './../../assets/images/icons/add.svg';
import { showToast } from '../../utils/utils';
import SaveButton from '../SaveButton';
import { GA_EVENT_ACTION_SONG_COPIED, GA_EVENT_CAT_MUSIC } from '../../config/Constants';
import Loader from '../Loader';

const styles = {
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackNameWrapper: {
    cursor: 'pointer',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '30',
    // backgroundColor: 'green',
  },
  actionsContainer: {
    // width: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
};

class NowPlayingListItem extends React.Component {
  _onClickAdd = () => {
    ReactGA.event({
      category: GA_EVENT_CAT_MUSIC,
      action: GA_EVENT_ACTION_SONG_COPIED,
      value: 1,
    });
    showToast('Added to Now Playing');
    musicStore.insertToNowPlayingList(this.props.track, this.props.position);
  };

  _onClickRemove = () => {
    const { track, position } = this.props;
    const nowPlayingTrack = musicStore.getCurrentTrack();
    const nowPlayingList = musicStore.getNowPlayingList();

    showToast('Removed from Now Playing');
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
          <View style={styles.trackNameWrapper} onClick={() => this.props.onItemClick(track)}>
            <Text className="font" numberOfLines={2} style={{ fontSize: 14, letterSpacing: 0 }}>
              {/* {this._formatLabel(track.label)} &nbsp; */}
              {track.label}
            </Text>
          </View>
          {isActive && <Loader height={20} width={40} barGap={2} barWidth={2} color={accentColor} loading={isActive} />}
          <View style={styles.actionsContainer}>
            <ReactSVG
              title="Add to queue"
              path={queueIcon}
              evalScripts="always"
              svgClassName="action-icon"
              onClick={() => {
                this._onClickAdd();
              }}
            />
            {/* <ReactSVG
              path={saveIcon}
              evalScripts="always"
              svgClassName="action-icon"
              onClick={() => {
                this.openModal();
              }}
            /> */}
            <SaveButton dataToSave={[track]} />
            <ReactSVG
              title="Remove from queue"
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

export default view(NowPlayingListItem);
