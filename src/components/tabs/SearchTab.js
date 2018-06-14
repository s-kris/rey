import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import youtubeHelper from 'youtube-search';

import { YOUTUBE_API_KEY } from './../../config/Constants';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: 100,
    // backgroundColor: 'grey',
  },
});

class SearchTab extends React.Component {
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
        <Text>search</Text>
      </View>
    );
  }
}

export default SearchTab;
