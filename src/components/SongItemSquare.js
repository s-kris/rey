import React from 'react';

import './../styles/song-item.css';

class SongItem extends React.Component {
  render() {
    const { thumbnailUrl, name, length } = this.props;
    return (
      <div
        className="container"
        style={{
          background: `url(${thumbnailUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="bottom-row" style={{ backgroundColor: 'red' }}>
          <div className="title">{name}</div>
          <div className="action">!</div>
        </div>
      </div>
    );
  }
}

export default SongItem;
