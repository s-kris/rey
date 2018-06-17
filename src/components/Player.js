import React from 'react';

import './../styles/media-player.css';
import MediaPlayer from './mediaplayer/';

const styles = {
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
};
class Player extends React.Component {
  render() {
    return (
      <div style={styles.rootContainer}>
        <MediaPlayer />
      </div>
    );
  }
}

export default Player;
