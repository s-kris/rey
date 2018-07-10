import React from 'react';
import { View } from 'react-native-web';
import Player from '../components/Player';
import TabsContainer from '../components/tabs/TabsContainer';
import { borderRadiusLarge } from '../config/Constants';

const styles = {
  rootContainer: {
    // filter: `blur(3px)`,
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
    backgroundPosition: 'center center',
    width: '100vw',
    height: '100vh',
    minWidth: 1000,
    minHeight: 700,
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
    width: '100%',
    height: '100%',
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

class DesktopApp extends React.Component {
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

export default DesktopApp;
