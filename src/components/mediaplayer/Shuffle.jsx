import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { View } from 'react-native-web';
import { view } from 'react-easy-state';

import { primaryColorLight, accentColor } from './../../config/Colors';
import shuffleIcon from './../../assets/images/icons/shuffle.svg';
import musicStore from '../../stores/musicStore';

const styles = {
  container: {
    borderRadius: '50%',
    behavior: 'url(PIE.htc)',
    backgroundColor: primaryColorLight,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Shuffle extends Component {
  render() {
    const fill = musicStore.isShuffleON() ? accentColor : '#CDD7DB';
    return (
      <View style={styles.container}>
        <ReactSVG
          path={shuffleIcon}
          evalScripts="always"
          svgClassName="action-icon"
          svgStyle={{ fill, width: 20, height: 20 }}
          onClick={() => {
            musicStore.toggleShuffle();
          }}
        />
      </View>
    );
  }
}

export default view(Shuffle);
