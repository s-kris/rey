import React from 'react';
import { View, Text } from 'react-native-web';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';
import shortid from 'shortid';

import './../../styles/song-item.css';
// import playIcon from './../assets/images/icons/play.svg';
import queueIcon from './../../assets/images/icons/add.svg';
import musicStore from './../../stores/musicStore';
import { showToast } from '../../utils/utils';
import SaveButton from './../SaveButton';

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

  _formatDataToSave = () => {
    const { name, videoUrl } = this.props;
    return [
      // save playlist component only accepts array
      {
        src: videoUrl,
        label: this._formatLabel(name),
        id: shortid.generate(),
        key: shortid.generate(),
      },
    ];
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
            svgClassName="action-icon"
            svgStyle={{ fill: '#373d3f' }}
            onClick={() => {
              this._onClickQueue();
            }}
          />
          <SaveButton dataToSave={this._formatDataToSave()} svgStyle={{ fill: '#373d3f' }} />
        </View>
      </View>
    );
  }
}

export default SearchResultItem;
