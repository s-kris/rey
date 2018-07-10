import React from 'react';
import { View, Button } from 'react-native-web';

import { accentColor } from '../config/Colors';
import windowsIcon from './../assets/images/windows.png';
import macIcon from './../assets/images/mac.png';
import linuxIcon from './../assets/images/linux.png';

const styles = {
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
  },
  platform: {
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 96,
    height: 96,
    marginBottom: 25,
    cursor: 'pointer',
  },

  text: {
    fontSize: 18,
    color: '#FFF',
  },
};

class DownloadBox extends React.Component {
  _initDownload = platform => {
    switch (platform) {
      case 'windows':
        window.open('https://drive.google.com/uc?id=16XA54iZB8uNaanatwIJ46TfTLXnS-SCY&export=download');
        break;
      case 'osx':
        window.open('https://drive.google.com/uc?id=1NcERuJc5rF2Ij5JJdIrj3KmmUgqIf5Zd&export=download');
        break;
      case 'linux':
        window.open('https://drive.google.com/uc?id=1PibNUF2iLFuKFeusdPNhjnInnleGuiGn&export=download');
        break;
      default:
        break;
    }
    this.props.closeModal();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.platform}>
          <img
            src={windowsIcon}
            alt="download-rey-windows"
            style={styles.icon}
            onClick={() => {
              this._initDownload('windows');
            }}
          />
          <Button
            color={accentColor}
            title="Download for Windows"
            onPress={() => {
              this._initDownload('windows');
            }}
          />
        </View>
        <View style={styles.platform}>
          <img
            src={macIcon}
            alt="download-rey-mac"
            style={styles.icon}
            onClick={() => {
              this._initDownload('osx');
            }}
          />
          <Button
            color={accentColor}
            title="Download for OS X"
            onPress={() => {
              this._initDownload('osx');
            }}
          />
        </View>
        <View style={styles.platform}>
          <img
            src={linuxIcon}
            alt="download-rey-linux"
            style={styles.icon}
            onClick={() => {
              this._initDownload('linux');
            }}
          />
          <Button
            color={accentColor}
            title="Download for Linux"
            onPress={() => {
              this._initDownload('linux');
            }}
          />
        </View>
      </View>
    );
  }
}

export default DownloadBox;
