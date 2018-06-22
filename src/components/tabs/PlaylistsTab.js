import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';

import './../../styles/input.css';
import PlaylistItem from '../listItems/PlayListItem';
import musicStore from '../../stores/musicStore';
import { accentColor } from '../../config/Colors';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  searchBoxContainer: {
    marginTop: 30,
  },

  searchResultsContainer: {
    marginTop: 20,
  },
  textContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

class PlaylistsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ data: musicStore.getAllPlaylists() });
  }

  handleChange = event => {
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > 2) {
    } else {
      this.setState({ data: musicStore.getAllPlaylists() });
    }
  };

  render() {
    const playlistsData = musicStore.getAllPlaylists();
    return (
      <View style={styles.rootContainer}>
        {/* <View style={styles.searchBoxContainer}>
          <input type="text" placeholder="start typing to search playlists" onChange={this.handleChange} />
        </View> */}
        <View style={styles.textContainer}>
          {playlistsData.length === 0 && (
            <Text className="font" style={{ fontSize: 24, color: accentColor }}>
              No Playlists were created yet!
            </Text>
          )}
        </View>

        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={item => item.id}
          data={playlistsData}
          renderItem={({ item }) => <PlaylistItem key={item.id} name={item.name} data={item.data} id={item.id} />}
        />
      </View>
    );
  }
}

export default view(PlaylistsTab);
