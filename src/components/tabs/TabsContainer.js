import React from 'react';

import SearchTab from './SearchTab';
import WhatAShame from '../WhatAShame';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // padding: 20,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'grey',
    padding: 10,
  },
  menuText: {
    display: 'inline-block',
    width: '100',
    fontStyle: 'bold',
    fontWeight: '600',
    letterSpacing: 2,
    fontSize: 16,
    color: '#373d3f',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  menuTextActive: {
    display: 'inline-block',
    fontStyle: 'bold',
    fontWeight: '600',
    letterSpacing: 2,
    fontSize: 16,
    color: '#65AB12',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: 15,
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
          <div key={item} style={styles.menuTextActive} onClick={() => this._onClickMenuItem(item)}>
            {item}
          </div>
        ) : (
          <div key={item} style={styles.menuText} onClick={() => this._onClickMenuItem(item)}>
            {item}
          </div>
        )
    );

  render() {
    return (
      <div style={styles.rootContainer}>
        <div style={styles.headerContainer}>{this._renderMenu(menuItems)}</div>
        <div style={styles.contentContainer}>{this._renderContent()}</div>
      </div>
    );
  }
}

export default TabsContainer;
