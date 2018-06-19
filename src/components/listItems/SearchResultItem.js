import React from 'react';
import { View, Text } from 'react-native-web';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';

import './../../styles/song-item.css';
// import playIcon from './../assets/images/icons/play.svg';
import queueIcon from './../../assets/images/icons/queue_add.svg';
import musicStore from './../../stores/musicStore';
import { showToast } from '../../utils/utils';

class SearchResultItem extends React.Component {
  _onClickPlay = () => {
    const { name, videoUrl } = this.props;
    musicStore.playTrack({
      src: videoUrl,
      label: this._formatLabel(name),
    });
    showToast('Playing');
  };

  _onClickQueue = () => {
    const { name, videoUrl } = this.props;
    musicStore.addToNowPlayingList({
      src: videoUrl,
      label: this._formatLabel(name),
    });
    showToast('Added to Now Playing');
  };

  _formatLabel = name => name;
  render() {
    return (
      <View
        className="song-item-container"
        style={{
          borderLeftWidth: 4,
          borderLeftStyle: 'solid',
          borderLeftColor: randomColor({
            luminosity: 'bright',
            hue: 'blue',
          }),
        }}
      >
        <Text className="title font" onClick={() => this._onClickPlay()} numberOfLines={1}>
          {this._formatLabel(this.props.name)}
        </Text>
        <View className="actions-container">
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
        </View>
      </View>
    );
  }
}

export default SearchResultItem;
