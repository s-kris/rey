import React from 'react';
import random from 'random-js';

import './../styles/song-item.css';
import playIcon from './../assets/images/icons/play.png';
import queueIcon from './../assets/images/icons/queue.png';
import { colorPalette } from './../config/Colors';

class SongItem extends React.Component {
  _onClickPlay = () => {
    console.log('play');
  };

  _onClickQueue = () => {
    console.log('queue');
  };

  _getRandomColor = () => {
    const index = random().integer(0, colorPalette.length - 1);
    return colorPalette[index];
  };

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
        <img src={playIcon} alt="queue" className="queue" onClick={() => this._onClickPlay()} />
        <div className="bottom-row" style={{ backgroundColor: this._getRandomColor() }}>
          <div className="title">{name}</div>
          <div className="action">
            <img src={queueIcon} height="100%" alt="more" onClick={() => this._onClickQueue()} />
          </div>
        </div>
      </div>
    );
  }
}

export default SongItem;
