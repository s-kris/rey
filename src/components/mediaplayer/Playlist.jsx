import React from 'react';

class Playlist extends React.Component {
  _handleTrackClick(track) {
    this.props.onTrackClick(track);
  }

  render() {
    const { tracks, currentTrack } = this.props;
    return (
      <div className="media-playlist">
        <div className="media-playlist-header">
          <div className="media-playlist-title">QUEUE</div>
        </div>
        <div
          style={{
            height: '100%',
            overflowY: 'scroll',
          }}
        >
          <ul className="media-playlist-tracks">
            {tracks.map(track => (
              <li
                key={track.label}
                className={`media-playlist-track ${track === currentTrack ? 'is-active' : ''}`}
                onClick={this._handleTrackClick.bind(this, track)}
              >
                {track.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Playlist;
