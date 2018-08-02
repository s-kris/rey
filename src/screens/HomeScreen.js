import React from 'react';
import { View } from 'react-native-web';

import Player from '../components/Player';
import { borderRadiusLarge } from '../config/Constants';
import TabsContainer from '../components/tabs/TabsContainer';
import Header from '../components/Header';
import { isMobileDevice, getRandomImage } from './../utils/utils';
import WhatAShame from '../components/WhatAShame';
import Footer from '../components/Footer';

const styles = {
  rootContainer: {
    backgroundImage: `url(${getRandomImage()})`,
    // filter: `blur(3px)`,
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '77%',
    paddingBottom: 10,
  },
  modulesContainer: {
    backgroundColor: 'white',
    width: '77%',
    height: '77%',
    borderRadius: borderRadiusLarge,
    display: 'flex',
    flexDirection: 'row',
  },
  playerContainer: {
    width: '36%',
    height: '100%',
  },
  tabsContainer: {
    flex: 1,
  },
};

class HomeScreen extends React.Component {
  _renderPlayer = () => {
    if (isMobileDevice()) {
      return (
        <View style={styles.modulesContainer}>
          <WhatAShame message="Rey is only for desktop at the moment!" giphyId="RFDXes97gboYg" />
        </View>
      );
    }
    return (
      <View style={styles.modulesContainer}>
        <View style={styles.playerContainer}>
          <Player />
        </View>
        <View style={styles.tabsContainer}>
          <TabsContainer />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        {this._renderPlayer()}
        <Footer />
      </View>
    );
  }
}

export default HomeScreen;
