import React from 'react';
import { View, StyleSheet } from 'react-primitives';

import Player from '../components/Player';
import bg1 from './../assets/images/bg1.jpg';
import { borderRadiusLarge } from '../config/Constants';
import './../styles/react-tabs.css';
import TabsContainer from '../components/tabs/TabsContainer';

const styles = StyleSheet.create({
  rootContainer: {
    backgroundImage: `url(${bg1})`,
    // filter: `blur(3px)`,
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.4)',
    backgroundPosition: 'center center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
});

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.modulesContainer}>
          <View style={styles.playerContainer}>
            <Player />
          </View>
          <View style={styles.tabsContainer}>
            <TabsContainer />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
