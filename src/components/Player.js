import React from 'react';
import { View, StyleSheet } from 'react-primitives';

import './../styles/media-player.css';
import MediaPlayer from './mediaplayer/';

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  controlsContainer: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
  },
});
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
