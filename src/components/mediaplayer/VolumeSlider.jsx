import React, { Component } from 'react';
import { View } from 'react-native-web';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { withMediaProps } from 'react-media-player';
import Modal from 'react-responsive-modal';

import { primaryColorLight, accentColor } from '../../config/Colors';
import { getDataFromStorage, saveDataToStorage } from '../../api/storage';
import { KEY_VOLUME_LEVEL } from '../../config/Constants';
import VolumeWriter from './VolumeWriter';

let volumeWriteFlag;

class VolumeSlider extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.media.setVolume(getDataFromStorage(KEY_VOLUME_LEVEL) || 0.5);
  }

  onSliderChange = value => {
    this.props.media.setVolume(value);
    saveDataToStorage(KEY_VOLUME_LEVEL, value);
  };

  _onLongPress = () => {
    volumeWriteFlag = setTimeout(() => {
      this.openModal();
    }, 5000);
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { volume } = this.props.media;
    return (
      <View
        style={{ width: 60, marginRight: 3 }}
        onMouseDown={this._onLongPress}
        onMouseUp={() => clearTimeout(volumeWriteFlag)}
      >
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          center
          styles={{
            modal: {
              padding: 0,
            },
          }}
          showCloseIcon={false}
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        >
          <VolumeWriter closeModal={() => this.closeModal()} />
        </Modal>

        <Slider
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={this.onSliderChange}
          trackStyle={{ backgroundColor: accentColor, height: 10 }}
          handleStyle={{
            marginTop: -2,
            borderWidth: 0,
          }}
          railStyle={{ backgroundColor: primaryColorLight, height: 10 }}
        />
      </View>
    );
  }
}

export default withMediaProps(VolumeSlider);
