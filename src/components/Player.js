import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import YoutubePlayer from 'react-player/lib/players/YouTube';

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
        {/* <YoutubePlayer
          width="100%"
          height={200}
          url="https://www.youtube.com/watch?v=hCt-H4-5wco"
          onProgress={result => {
            // console.log(result.playedSeconds);
          }}
          config={{
            youtube: { playerVars: { modestBranding: 1 } },
          }}
        /> */}
        <MediaPlayer />
      </View>
    );
  }
}

export default Player;
