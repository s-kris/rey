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
      repeatTrack: false,
      autoPlay: true,
    };
  }

  _handleTrackClick = track => {
    //  this.setState({ currentTrack: track });
    playlistStore.setCurrentTrack(track);
  };

  _navigatePlaylist = direction => {
    const currentTrack = playlistStore.getCurrentTrack();
    const newIndex = mod(this.playlist.indexOf(currentTrack) + direction, this.playlist.length);
    // this.setState({ currentTrack: this.playlist[newIndex] });
    playlistStore.setCurrentTrack(this.playlist[newIndex]);
  };

  render() {
    const { repeatTrack, autoPlay } = this.state;
    const currentTrack = playlistStore.getCurrentTrack();
    return (
      <div className="media-player-wrapper">
        <MediaPlayer
          ref={c => (this._mediaPlayer = c)}
          src={`${currentTrack.src}&tmpid=${currentTrack.id}`} // player won't render if url is same
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
          tracks={playlistStore.getPlaylist()}
          currentTrack={currentTrack}
          onTrackClick={this._handleTrackClick}
        />
      </div>
    );
  }
}

export default view(Index);
