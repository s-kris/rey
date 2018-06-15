import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import youtubeHelper from 'youtube-search';
import StackGrid from 'react-stack-grid';

import { YOUTUBE_API_KEY } from './../../config/Constants';
import './../../styles/input.css';
import SongItem from '../SongItem';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
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
  _renderData = () => {
    const tiles = [];
    for (let i = 0; i < 10; i++) {
      tiles.push(
        <SongItem
          thumbnailUrl="https://i.ytimg.com/vi/oR2v4fIMeo0/movieposter.jpg"
          name="some name of the song lengthy test"
          length={4.5}
          key={i}
        />
      );
    }
    return tiles;
  };

  render() {
    // const opts = {
    //   maxResults: 10,
    //   key: YOUTUBE_API_KEY,
    // };

    // youtubeHelper('cheliya', opts, (err, results) => {
    //   if (err) return console.log(err);

    //   console.dir(results);
    // });

    return (
      <View style={styles.rootContainer}>
        <View>
          <input type="text" name="search" placeholder="Type to search" />
        </View>
        <View style={styles.contentContainer}>
          <StackGrid columnWidth={200}>{this._renderData()}</StackGrid>
        </View>
      </View>
    );
  }
}

export default SearchTab;
