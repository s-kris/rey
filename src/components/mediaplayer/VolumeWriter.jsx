import React, { Component } from 'react';
import { View, Text } from 'react-native-web';
import { withMediaProps } from 'react-media-player';
import ReactGA from 'react-ga';

import { primaryColor } from '../../config/Colors';
import { GA_EVENT_ACTION_VOLUME_WRITER, GA_EVENT_CAT_PLAYER } from '../../config/Constants';

const styles = {
  container: {
    width: 700,
    height: 500,
    backgroundColor: primaryColor,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    width: 500,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  messageText: {
    color: '#FFF',
    fontSize: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: { color: '#FFF', fontSize: 18 },
};

class VolumeWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imposition: '',
    };
    ReactGA.event({
      category: GA_EVENT_CAT_PLAYER,
      action: GA_EVENT_ACTION_VOLUME_WRITER,
      value: 1,
    });
  }

  _setVolume = () => {
    const impText = this.state.imposition.trim();
    if (impText.length === 0) {
      alert(`Volume set to 0%`);
      this.props.closeModal();
    } else {
      const impTextArr = impText
        .substring(impText.length - 1, '')
        .split('.')
        .map(t => t.trim());
      const volumePercent = impTextArr.length;
      if (impTextArr.every(v => v === impTextArr[0]) && impTextArr[0] === `I want ${volumePercent}% volume`) {
        this.props.media.setVolume(volumePercent / 100);
        alert(`Volume set to ${volumePercent}%`);
        this.props.closeModal();
      } else {
        alert(`Write 'I want X% volume.' for X Times`);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text className="font" style={styles.messageText}>
          To set volume, write 'I want X% volume.' for X Times
        </Text>
        <textarea
          id="impositionTextArea"
          style={styles.textArea}
          value={this.state.imposition}
          onChange={e => this.setState({ imposition: e.target.value })}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button} onClick={() => this._setVolume()}>
            <Text className="font" style={styles.buttonText}>
              Set Volume
            </Text>
          </View>
          <View style={styles.button} onClick={() => this.props.closeModal()}>
            <Text className="font" style={styles.buttonText}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withMediaProps(VolumeWriter);
