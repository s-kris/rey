import React from 'react';
import { View, Button, Text } from 'react-native-web';

import { accentColor } from '../config/Colors';
import windowsIcon from './../assets/images/windows.png';
import macIcon from './../assets/images/mac.png';
import linuxIcon from './../assets/images/linux.png';
import { WINDOWS_DOWNLOAD_URL, OSX_DOWNLOAD_URL, LINUX_DOWNLOAD_URL } from '../config/Constants';

const styles = {
  rootContainer: {
    alignItems: 'center',
    padding: 50,
  },
  platformContainer: {
    flexDirection: 'row',
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

  noteText: {
    fontSize: 12,
  },
};

class DownloadBox extends React.Component {
  _initDownload = platform => {
    switch (platform) {
      case 'windows':
        window.open(WINDOWS_DOWNLOAD_URL);
        break;
      case 'osx':
        window.open(OSX_DOWNLOAD_URL);
        break;
      case 'linux':
        window.open(LINUX_DOWNLOAD_URL);
        break;
      default:
        break;
    }
    this.props.closeModal();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.platformContainer}>
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
        <Text className="font" style={styles.noteText}>
          Note: The standalone app is just a wrapper of the web player. It's easier to use the website!
        </Text>
      </View>
    );
  }
}

export default DownloadBox;
