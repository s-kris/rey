import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Player from '../components/Player';
import bg1 from './../assets/images/bg1.jpg';
import { borderRadiusLarge } from '../config/Constants';
import './../styles/react-tabs.css';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
            <Tabs defaultIndex={1}>
              <TabList>
                <Tab>Related</Tab>
                <Tab>Search</Tab>
                <Tab>Popular</Tab>
                <Tab>Favourites</Tab>
                <Tab>Playlists</Tab>
                <Tab>Profile</Tab>
              </TabList>
              <TabPanel>
                <Text>hello tabs 1</Text>
              </TabPanel>
              <TabPanel>
                <Text>hello tabs 2</Text>
              </TabPanel>
              <TabPanel>
                <Text>hello tabs 3</Text>
              </TabPanel>
            </Tabs>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
