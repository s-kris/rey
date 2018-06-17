import React from 'react';
import { View } from 'react-native-web';

import './../styles/media-player.css';
import MediaPlayer from './mediaplayer/';

const styles = {
  rootContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};
class Player extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <MediaPlayer />
      </View>
    );
  }
}

export default Player;
