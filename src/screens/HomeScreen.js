import React from 'react';

import Player from '../components/Player';
import bg1 from './../assets/images/bg1.jpg';
import { borderRadiusLarge } from '../config/Constants';
import TabsContainer from '../components/tabs/TabsContainer';
import Header from '../components/Header';
import { isMobileDevice } from './../utils/utils';
import WhatAShame from '../components/WhatAShame';

const styles = {
  rootContainer: {
    backgroundImage: `url(${bg1})`,
    // filter: `blur(3px)`,
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
    backgroundPosition: 'center center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '75%',
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modulesContainer: {
    backgroundColor: 'white',
    width: '75%',
    height: '75%',
    borderRadius: borderRadiusLarge,
    display: 'flex',
    flexDirection: 'row',
  },
  playerContainer: {
    width: '30%',
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
        <div style={styles.modulesContainer}>
          <WhatAShame message="Rey is only for desktop at the moment" giphyId="RFDXes97gboYg" />
        </div>
      );
    }
    return (
      <div style={styles.modulesContainer}>
        <div style={styles.playerContainer}>
          <Player />
        </div>
        <div style={styles.tabsContainer}>
          <TabsContainer />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={styles.rootContainer}>
        <div style={styles.headerContainer}>
          <Header />
        </div>
        {this._renderPlayer()}
      </div>
    );
  }
}

export default HomeScreen;
