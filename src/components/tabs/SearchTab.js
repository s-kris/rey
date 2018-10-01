import React from 'react';
import { View, Text, FlatList, Button } from 'react-native-web';
import { view } from 'react-easy-state';
import axios from 'axios';

import {
  YOUTUBE_SEARCH_RESULTS_MAX,
  SEARCH_MIN_LETTERS,
  CONST_INVALID_URL,
  KEY_PREF_SHOW_THUMBS,
} from './../../config/Constants';
import { YOUTUBE_API_KEY } from './../../config/youtube';
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
  gifContainer: {
    height: 500,
  },
  loaderContainer: {
    width: '100%',
    flexDirection: 'column',
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
      showThumbnails: false,
      searchText: '',
    };

    // this._searchYoutube('telugu songs', 20);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      showThumbnails: getDataFromStorage(KEY_PREF_SHOW_THUMBS) || false,
    });
  }

  _fetchVideos = (searchTerm, maxResults) => {
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API_KEY,
          q: searchTerm,
          maxResults: maxResults.toString(),
          part: 'snippet',
          type: 'video',
          videoEmbeddable: 'true',
        },
      })
      .then(response => {
        const relatedData = [];
        response.data.items.forEach(item => {
          if (item.id.kind === 'youtube#video') {
            relatedData.push({
              videoId: item.id.videoId,
              title: item.snippet.title,
              thumbnailUrl: item.snippet.thumbnails.medium.url,
              id: item.id.videoId,
            });
          }
        });
        this.setState({
          data: relatedData,
          isLoading: false,
          empty: relatedData.length === 0,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

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
            this._fetchVideos(searchTerm, YOUTUBE_SEARCH_RESULTS_MAX);
          } else {
            // entered search term is youtube link and so render top 1 result
            this._fetchVideos(searchTerm, 1);
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

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.searchBoxContainer}>
          <input
            id="searchTextInput"
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
            checked={this.state.showThumbnails}
            onChange={() => {
              saveDataToStorage(KEY_PREF_SHOW_THUMBS, !this.state.showThumbnails);
              this.setState({ showThumbnails: !this.state.showThumbnails });
            }}
          />
          <Text
            className="font"
            style={{ marginTop: 5, cursor: 'pointer' }}
            onClick={() => {
              saveDataToStorage(KEY_PREF_SHOW_THUMBS, !this.state.showThumbnails);
              this.setState({ showThumbnails: !this.state.showThumbnails });
            }}
          >
            {'  '} Show thumbnails {'    '}
          </Text>

          <Button
            onPress={() => this.setState({ searchText: '', data: [], empty: false })}
            title="Clear"
            color={accentColor}
            disabled={this.state.searchText.length === 0}
            accessibilityLabel="Clear search results"
          />
        </View>

        {this.state.isLoading && (
          <View style={styles.loaderContainer}>
            <Loader color={accentColor} width={100} height={50} />
          </View>
        )}

        {!this.state.isLoading &&
          this.state.empty && (
            <View style={styles.gifContainer}>
              <WhatAShame message="No Results" />
            </View>
          )}

        {!this.state.isLoading && (
          <FlatList
            style={{ marginTop: 15 }}
            keyExtractor={item => item.id}
            data={this.state.data}
            renderItem={({ item }) => (
              <SearchResultItem
                thumbnailUrl={item.thumbnailUrl}
                name={item.title}
                videoUrl={item.videoId}
                showImage={this.state.showThumbnails}
              /> // item.link uses too much data
            )}
          />
        )}
      </View>
    );
  }
}

export default view(SearchTab);
