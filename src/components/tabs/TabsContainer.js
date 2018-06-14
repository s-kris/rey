import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { View, Text, StyleSheet } from 'react-primitives';

import SearchTab from './SearchTab';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
  },
});

class TabsContainer extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Search</Tab>
            <Tab>Favourites</Tab>
            <Tab>Playlists</Tab>
            <Tab>Profile</Tab>
          </TabList>
          <TabPanel>
            <SearchTab />
          </TabPanel>
          <TabPanel>
            <Text>hello tabs 2</Text>
          </TabPanel>
          <TabPanel>
            <Text>hello tabs 3</Text>
          </TabPanel>
          <TabPanel>
            <Text>hello tabs 4</Text>
          </TabPanel>
        </Tabs>
      </View>
    );
  }
}

export default TabsContainer;
