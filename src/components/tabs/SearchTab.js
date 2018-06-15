import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import youtubeHelper from 'youtube-search';
import StackGrid from 'react-stack-grid';
import { GridLoader } from 'react-spinners';
import SimpleInput from 'react-simple-input';

import { YOUTUBE_API_KEY, YOUTUBE_SEARCH_RESULTS_MAX } from './../../config/Constants';
import './../../styles/input.css';
import SongItem from '../SongItem';
import WhatAShame from '../WhatAShame';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 12,
    // backgroundColor: 'grey',
    display: 'flex',
    overflowY: 'scroll',
  },
});

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      empty: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > 4) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          this._searchYoutube(searchTerm);
        }
      );
    } else {
      this.setState({ data: [] });
    }
  };

  _searchYoutube = searchTerm => {
    const opts = {
      maxResults: YOUTUBE_SEARCH_RESULTS_MAX,
      key: YOUTUBE_API_KEY,
    };

    youtubeHelper(searchTerm, opts, (err, results) => {
      if (err) return console.log(err);

      if (results.length === 0) {
        this.setState({ empty: true });
      } else {
        this._renderData(results);
      }
    });
  };

  _renderData = songs => {
    const tiles = [];
    for (let i = 0; i < songs.length; i++) {
      tiles.push(
        <SongItem
          thumbnailUrl={songs[i].thumbnails.medium.url}
          name={songs[i].title}
          videoUrl={songs[i].link}
          key={i}
        />
      );
    }
    this.setState({ empty: false, data: tiles, isLoading: false });
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View>
          {/* <input type="text" name="search" placeholder="Type to search" onChange={this.handleChange} /> */}
          <SimpleInput
            className="fluid"
            placeholder="search"
            changeTimeout={250}
            onChange={this.handleChange}
            clearButton
          />
        </View>
        <View style={styles.contentContainer}>
          {this.state.isLoading ? (
            <View style={styles.loaderContainer}>
              <GridLoader color="#8bb955" loading />
            </View>
          ) : (
            <StackGrid columnWidth={200}>{this.state.data}</StackGrid>
          )}
          {this.state.empty && (
            <View style={styles.loaderContainer}>
              <Text style={{ fontSize: 24, color: '#8bb955' }}> No Results </Text>
              <WhatAShame />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default SearchTab;
