import React from 'react';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';

import './../styles/song-item.css';
import playIcon from './../assets/images/icons/play.svg';
import queueIcon from './../assets/images/icons/queue_add.svg';
import musicStore from './../stores/musicStore';

class SongItem extends React.Component {
  _onClickPlay = () => {
    const { name, videoUrl } = this.props;
    musicStore.playTrack({
      src: videoUrl,
      label: this._formatLabel(name),
    });
  };

  _onClickQueue = () => {
    const { name, videoUrl } = this.props;
    musicStore.addToNowPlayingList({
      src: videoUrl,
      label: this._formatLabel(name),
    });
  };

  _formatLabel = name => name.substring(0, 72);

  render() {
    return (
      <div
        className="song-item-container"
        style={{
          borderLeft: `4px solid ${randomColor({
            luminosity: 'bright',
          })}`,
        }}
      >
        <div className="title" onClick={() => this._onClickPlay()}>
          {this._formatLabel(this.props.name)}
        </div>
        <div className="actions-container">
          {/* <ReactSVG
            path={playIcon}
            evalScripts="always"
            svgClassName="action"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickPlay();
            }}
          /> */}
          <ReactSVG
            path={queueIcon}
            evalScripts="always"
            svgClassName="action"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickQueue();
            }}
          />
        </div>
      </div>
    );
  }
}

export default SongItem;
