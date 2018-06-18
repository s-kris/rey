import React, { Component } from 'react';
import { view } from 'react-easy-state';
import Cookies from 'js-cookie';
import DocumentTitle from 'react-document-title';

import MediaPlayer from './MediaPlayer';
import Playlist from './Playlist';
import musicStore from '../../stores/musicStore';
import { KEY_CURRENT_TRACK, KEY_NOW_PLAYING_LIST } from '../../config/Constants';

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
    const currentTrack = Cookies.getJSON(KEY_CURRENT_TRACK);
    const nowPlayingList = Cookies.getJSON(KEY_NOW_PLAYING_LIST);

    if (currentTrack && nowPlayingList) {
      musicStore.setCurrentTrack(currentTrack);
      musicStore.setNowPlayingList(nowPlayingList);
    }
  };

  _navigatePlaylist = direction => {
    const currentTrack = musicStore.getCurrentTrack();
    const nowPlayingList = musicStore.getNowPlayingList();

    const newIndex = mod(nowPlayingList.indexOf(currentTrack) + direction, nowPlayingList.length);
    musicStore.setCurrentTrack(nowPlayingList[newIndex]);
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
              this.setState({ repeatTrack: !repeatTrack });
            }}
            onPlay={() => !autoPlay && this.setState({ autoPlay: true })}
            onPause={() => this.setState({ autoPlay: false })}
            onEnded={() => {
              !repeatTrack && this._navigatePlaylist(1);
            }}
          />
          <Playlist
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
