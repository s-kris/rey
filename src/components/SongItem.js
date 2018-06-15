import React from 'react';

import './../styles/song-item.css';
import playIcon from './../assets/images/icons/play.png';
import queueIcon from './../assets/images/icons/queue.png';

class SongItem extends React.Component {
  render() {
    const { thumbnailUrl, name, length } = this.props;
    return (
      <div
        className="container"
        style={{
          background: `url(${thumbnailUrl})`,
          backgroundSize: 'cover',
          boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.4)',
        }}
      >
        <img src={playIcon} alt="queue" className="queue" />
        <div className="bottom-row" style={{ backgroundColor: 'red' }}>
          <div className="title">{name}</div>
          <div className="action">
            <img src={queueIcon} height="100%" alt="more" />
          </div>
        </div>
      </div>
    );
  }
}

export default SongItem;
