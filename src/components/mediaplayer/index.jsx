import React, { Component } from 'react';
import { view } from 'react-easy-state';

import MediaPlayer from './MediaPlayer';
import Playlist from './Playlist';
import playlistStore from '../../stores/playlistStore';

const mod = (num, max) => ((num % max) + max) % max;

class Index extends Component {
  constructor(props) {
    super(props);
    this.playlist = playlistStore.getPlaylist();
    this.state = {
      currentTrack: {
        src: this.playlist[0].src,
        label: this.playlist[0].label,
        queueId: 0,
      },
      repeatTrack: false,
      autoPlay: false,
    };
  }

  _handleTrackClick = (track, position) => {
    this.setState({ currentTrack: track, queueId: position });
  };

  _navigatePlaylist = direction => {
    const newIndex = mod(this.playlist.indexOf(this.state.currentTrack) + direction, this.playlist.length);
    this.setState({ currentTrack: this.playlist[newIndex] });
  };

  render() {
    const { currentTrack, repeatTrack, autoPlay, queueId } = this.state;
    return (
      <div className="media-player-wrapper">
        <MediaPlayer
          ref={c => (this._mediaPlayer = c)}
          src={`${currentTrack.src}&=${queueId}`} // player won't render if url is same
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
            this.setState({ queueId: queueId + 1 });
            !repeatTrack && this._navigatePlaylist(1);
          }}
        />
        <Playlist
          tracks={playlistStore.getPlaylist()}
          currentTrack={currentTrack}
          onTrackClick={this._handleTrackClick}
        />
      </div>
    );
  }
}

export default view(Index);
