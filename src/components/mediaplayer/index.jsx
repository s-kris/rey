import React, { Component } from 'react';
import { view } from 'react-easy-state';
import DocumentTitle from 'react-document-title';
import ReactGA from 'react-ga';
import Random from 'random-js';

import MediaPlayer from './MediaPlayer';
import NowPlayingList from './NowPlayingList';
import musicStore from '../../stores/musicStore';
import {
  KEY_CURRENT_TRACK,
  KEY_NOW_PLAYING_LIST,
  GA_EVENT_CAT_MUSIC,
  GA_EVENT_ACTION_SONG_REPEATED,
  GA_EVENT_ACTION_SONG_COMPLETED,
} from '../../config/Constants';
import { getDataFromStorage } from './../../api/storage';

const mod = (num, max) => ((num % max) + max) % max;

class Index extends Component {
  constructor(props) {
    super(props);

    this._initData();
    this.state = {
      repeatTrack: false,
      autoPlay: true,
    };
  }

  _handleTrackClick = track => {
    musicStore.setCurrentTrack(track);
  };

  _getDocumentTitle = track => {
    if (track.label) return `Rey | ${track.label}`;

    return 'Rey';
  };

  _formatYoutubeUrl = track => {
    const { src, id } = track;
    if (src) {
      if (src.indexOf('youtube') !== -1) {
        return `${src}&tmp=${id}`;
      }
      return `https://www.youtube.com/watch?v=${src}&tmp=${id}`;
    }
    return '';
  };

  _initData = () => {
    const currentTrack = getDataFromStorage(KEY_CURRENT_TRACK);
    const nowPlayingList = getDataFromStorage(KEY_NOW_PLAYING_LIST);
    if (currentTrack && nowPlayingList) {
      musicStore.setCurrentTrack(currentTrack);
      musicStore.setNowPlayingList(nowPlayingList);
    }
  };

  _navigatePlaylist = direction => {
    const currentTrack = musicStore.getCurrentTrack();
    const nowPlayingList = musicStore.getNowPlayingList();
    if (nowPlayingList.length > 1) {
      let currentTrackPosition; //= nowPlayingList.indexOf(currentTrack)
      nowPlayingList.forEach((item, index) => {
        if (currentTrack.id === item.id) {
          currentTrackPosition = index;
        }
      });
      let newIndex;
      if (musicStore.isShuffleON()) {
        const engine = Random.engines.mt19937().autoSeed();
        const distribution = Random.integer(0, nowPlayingList.length - 1);
        newIndex = distribution(engine);
        while (newIndex === currentTrackPosition) {
          newIndex = distribution(engine);
        }
      } else {
        newIndex = mod(currentTrackPosition + direction, nowPlayingList.length);
      }
      musicStore.setCurrentTrack(nowPlayingList[newIndex]);
    }
  };

  render() {
    const { repeatTrack, autoPlay } = this.state;
    const currentTrack = musicStore.getCurrentTrack();
    return (
      <DocumentTitle title={this._getDocumentTitle(currentTrack)}>
        <div className="media-player-wrapper">
          <MediaPlayer
            ref={c => (this._mediaPlayer = c)}
            src={this._formatYoutubeUrl(currentTrack)} // player won't render if url is same
            autoPlay={autoPlay}
            loop={repeatTrack}
            currentTrack={currentTrack.label}
            repeatTrack={repeatTrack}
            onPrevTrack={() => this._navigatePlaylist(-1)}
            onNextTrack={() => this._navigatePlaylist(1)}
            onRepeatTrack={() => {
              ReactGA.event({
                category: GA_EVENT_CAT_MUSIC,
                action: GA_EVENT_ACTION_SONG_REPEATED,
                value: 1,
              });
              this.setState({ repeatTrack: !repeatTrack });
            }}
            onPlay={() => !autoPlay && this.setState({ autoPlay: true })}
            onPause={() => this.setState({ autoPlay: false })}
            onEnded={() => {
              ReactGA.event({
                category: GA_EVENT_CAT_MUSIC,
                action: GA_EVENT_ACTION_SONG_COMPLETED,
                value: 1,
              });
              !repeatTrack && this._navigatePlaylist(1);
            }}
          />
          <NowPlayingList
            tracks={musicStore.getNowPlayingList()}
            currentTrack={currentTrack}
            onTrackClick={this._handleTrackClick}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default view(Index);
