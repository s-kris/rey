import React, { Component } from 'react';

import MediaPlayer from './MediaPlayer';
import Playlist from './Playlist';

const mod = (num, max) => ((num % max) + max) % max;
const playlist = [
  { src: 'http://www.youtube.com/embed/h3YVKTxTOgU', label: 'Brand New' },
  { src: 'https://youtu.be/VOyYwzkQB98', label: 'Neck Deep' },
  { src: 'https://player.vimeo.com/video/156147818', label: 'Pump' },
  { src: 'https://vimeo.com/channels/staffpicks/150734165', label: 'Lesley' },
  {
    src:
      'http://a1083.phobos.apple.com/us/r1000/014/Music/v4/4e/44/b7/4e44b7dc-aaa2-c63b-fb38-88e1635b5b29/mzaf_1844128138535731917.plus.aac.p.m4a',
    label: 'iTunes Preview',
  },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', label: 'Big Buck Bunny' },
  { src: 'https://vid4u.org/ninja/5/dev/assets/madmax-intro.mp4', label: 'Mad Max Intro' },
  { src: 'http://demosthenes.info/assets/videos/mountain.mp4', label: 'Mountain' },
  { src: 'http://www.w3schools.com/html/movie.mp4', label: 'Bear' },
  { src: 'http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4', label: 'Lego Robot' },
  { src: 'http://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v', label: 'iPod Help' },
  { src: 'http://html5demos.com/assets/dizzy.mp4', label: 'Dizzy Kitty' },
  { src: 'https://www.youtube.com/watch?v=hCt-H4-5wco', label: 'Chiru Chiru' },
];

class Index extends Component {
  state = {
    currentTrack: { src: playlist[playlist.length - 1].src, label: playlist[playlist.length - 1].label },
    repeatTrack: false,
    autoPlay: true,
  };

  _handleTrackClick = track => {
    this.setState({ currentTrack: track });
  };

  _navigatePlaylist = direction => {
    const newIndex = mod(playlist.indexOf(this.state.currentTrack) + direction, playlist.length);
    this.setState({ currentTrack: playlist[newIndex] });
  };

  render() {
    const { currentTrack, repeatTrack, autoPlay } = this.state;
    return (
      <div className="media-player-wrapper">
        <MediaPlayer
          ref={c => (this._mediaPlayer = c)}
          src={currentTrack.src}
          autoPlay={false}
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
        <Playlist tracks={playlist} currentTrack={currentTrack} onTrackClick={this._handleTrackClick} />
      </div>
    );
  }
}

export default Index;
