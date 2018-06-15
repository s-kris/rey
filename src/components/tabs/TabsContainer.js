import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

import SearchTab from './SearchTab';
import WhatAShame from '../WhatAShame';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'grey',
    padding: 20,
  },
  menuText: {
    fontStyle: 'bold',
    fontWeight: '700',
    letterSpacing: 2,
    fontSize: 14,
    color: '#373d3f',
    cursor: 'pointer',
  },
  menuTextActive: {
    fontStyle: 'bold',
    fontWeight: '700',
    letterSpacing: 2,
    fontSize: 14,
    color: '#65AB12',
    cursor: 'pointer',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
});

const menu = ['SEARCH', 'POPULAR', 'FAVOURITES', 'PLAYLISTS', 'PROFILE'];

class TabsContainer extends React.Component {
  state = {
    activeTab: 'SEARCH',
  };

  _onClickMenuItem = item => {
    this.setState({ activeTab: item });
  };

  _renderContent = () => {
    switch (this.state.activeTab) {
      case 'SEARCH':
        return <SearchTab />;
      case 'POPULAR':
        return <WhatAShame giphyId="26ufd1zhcpm30DWrC" />;
      case 'FAVOURITES':
        return <WhatAShame giphyId="26ufd1zhcpm30DWrC" />;
      case 'PLAYLISTS':
        return <WhatAShame giphyId="26ufd1zhcpm30DWrC" />;
      case 'PROFILE':
        return <WhatAShame giphyId="26ufd1zhcpm30DWrC" />;
      default:
        return <WhatAShame giphyId="26ufd1zhcpm30DWrC" />;
    }
  };

  _renderMenu = () =>
    menu.map(
      item =>
        this.state.activeTab === item ? (
          <Text key={item} style={styles.menuTextActive} onClick={() => this._onClickMenuItem(item)}>
            {item}
          </Text>
        ) : (
          <Text key={item} style={styles.menuText} onClick={() => this._onClickMenuItem(item)}>
            {item}
          </Text>
        )
    );

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>{this._renderMenu()}</View>
        <View style={styles.contentContainer}>{this._renderContent()}</View>
      </View>
    );
  }
}

export default TabsContainer;
