import React from 'react';
import { View, Text } from 'react-native-web';

import SearchTab from './SearchTab';
import WhatAShame from '../WhatAShame';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  menuText: {
    fontStyle: 'bold',
    fontWeight: '900',
    letterSpacing: 1,
    fontSize: 16,
    color: '#373d3f',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  menuTextActive: {
    fontStyle: 'bold',
    fontWeight: '900',
    letterSpacing: 1,
    fontSize: 16,
    color: '#65AB12',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
  },
};

const menuItems = ['SEARCH', 'SIMILAR', 'POPULAR', 'PLAYLISTS', 'PROFILE'];

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

  _renderMenu = array =>
    array.map(
      item =>
        this.state.activeTab === item ? (
          <View key={item} onClick={() => this._onClickMenuItem(item)}>
            <Text className="font" style={styles.menuTextActive}>
              {item}
            </Text>
          </View>
        ) : (
          <View key={item} onClick={() => this._onClickMenuItem(item)}>
            <Text className="font" style={styles.menuText}>
              {item}
            </Text>
          </View>
        )
    );

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>{this._renderMenu(menuItems)}</View>
        <View style={styles.contentContainer}>{this._renderContent()}</View>
      </View>
    );
  }
}

export default TabsContainer;
