import React from 'react';
import { View, Text, FlatList, Button } from 'react-native-web';
import youtubeHelper from 'youtube-search';
import { view } from 'react-easy-state';
// import Axios from 'axios';

import {
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_RESULTS_MAX,
  SEARCH_MIN_LETTERS,
  CONST_INVALID_URL,
  KEY_PREF_SHOW_THUMBS,
} from './../../config/Constants';
import './../../styles/input.css';
import SearchResultItem from '../listItems/SearchResultItem';
import WhatAShame from '../WhatAShame';
import { getYoutubeId } from '../../utils/utils';
import { accentColor } from '../../config/Colors';
import Loader from './../Loader';
import { getDataFromStorage, saveDataToStorage } from '../../api/storage';
// import musicStore from '../../stores/musicStore';

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
  centerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      empty: false,
      checked: false,
      searchText: '',
    };

    // this._searchYoutube('telugu songs', 20);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      checked: getDataFromStorage(KEY_PREF_SHOW_THUMBS) || false,
    });
  }

  // fetchRelatedVideos = () => {
  //   const { currentTrack } = musicStore;
  //   if (currentTrack.label) {
  //     Axios.get('https://www.googleapis.com/youtube/v3/search', {
  //       params: {
  //         key: YOUTUBE_API_KEY,
  //         relatedToVideoId: currentTrack.src,
  //         maxResults: 25,
  //       },
  //     })
  //       .then(response => {
  //         console.log(response.items);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // };

  handleChange = event => {
    const searchTerm = event.target.value;
    this.setState({ searchText: searchTerm });

    if (searchTerm === '') {
      this.setState({
        data: [],
        isLoading: false,
        empty: false,
      });
      // this.fetchRelatedVideos();
    }

    if (searchTerm && searchTerm.length > SEARCH_MIN_LETTERS - 1) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          if (getYoutubeId(searchTerm) === CONST_INVALID_URL) {
            this._searchYoutube(searchTerm, YOUTUBE_SEARCH_RESULTS_MAX);
          } else {
            // enterted search term is youtube link and so render top 1 result
            this._searchYoutube(searchTerm, 1);
          }
        }
      );
    } else {
      this.setState({ data: [], isLoading: false });
    }
  };

  _cleanSearchResults = results => {
    const filteredResults = [];
    results.forEach(element => {
      // currently no support for youtube playlists, so filter them out
      if (element.kind === 'youtube#video') filteredResults.push(element);
    });
    return filteredResults;
  };

  _searchYoutube = (searchTerm, limit) => {
    const opts = {
      maxResults: limit,
      key: YOUTUBE_API_KEY,
    };
    youtubeHelper(searchTerm, opts, (err, results) => {
      if (err) return console.log(err);

      if (results.length === 0) {
        this.setState({ empty: true, isLoading: false });
      } else {
        const cleanData = this._cleanSearchResults(results);
        this.setState({
          data: cleanData,
          empty: false,
          isLoading: false,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.searchBoxContainer}>
          <input
            id="searchtextinput"
            type="text"
            placeholder="start typing to search or paste a link from from youtube"
            onChange={this.handleChange}
            value={this.state.searchText}
            // autoFocus
          />
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={() => {
              saveDataToStorage(KEY_PREF_SHOW_THUMBS, !this.state.checked);
              this.setState({ checked: !this.state.checked });
            }}
          />
          <Text
            className="font"
            style={{ marginTop: 5, cursor: 'pointer' }}
            onClick={() => {
              saveDataToStorage(KEY_PREF_SHOW_THUMBS, !this.state.checked);
              this.setState({ checked: !this.state.checked });
            }}
          >
            {'  '} Show thumbnails {'    '}
          </Text>

          <Button
            onPress={() => this.setState({ searchText: '', data: [], empty: false })}
            title="Clear"
            color={accentColor}
            disabled={this.state.searchText.length === 0}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        {/* {musicStore.currentTrack.label &&
          this.state.searchText.length === 0 && (
            <Text className="font" style={{ marginTop: 20, fontSize: 18, color: accentColor }}>
              You may also like
            </Text>
          )} */}

        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={item => item.id}
          data={this.state.data}
          renderItem={({ item }) => (
            <SearchResultItem
              key={item.id}
              thumbnailUrl={item.thumbnails.medium.url}
              name={item.title}
              videoUrl={item.id}
              showImage={this.state.checked}
            /> // item.link uses too much data
          )}
        />

        {this.state.isLoading && (
          <View style={styles.centerContainer}>
            <Loader color={accentColor} width={100} height={50} />
          </View>
        )}

        {this.state.empty && (
          <View style={styles.centerContainer}>
            <View>
              <Text className="font" style={{ fontSize: 24, color: accentColor }}>
                No Results
              </Text>
            </View>
            <WhatAShame />
          </View>
        )}
      </View>
    );
  }
}

export default view(SearchTab);
