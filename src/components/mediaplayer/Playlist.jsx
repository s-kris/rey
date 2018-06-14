import React from 'react';
import { view } from 'react-easy-state';

import PlaylistItem from './PlaylistItem';

class Playlist extends React.Component {
  _handleTrackClick(track, position) {
    this.props.onTrackClick(track, position);
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
            overflow: 'scroll',
            paddingBottom: 30,
          }}
        >
          <div className="media-playlist-tracks">
            {tracks.map((track, position) => (
              <PlaylistItem
                key={track.label + position}
                track={track}
                position={position}
                currentTrack={currentTrack}
                onItemClick={() => this._handleTrackClick(track, position)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default view(Playlist);
