import React from 'react';
import youtubeHelper from 'youtube-search';
import { ScaleLoader } from 'react-spinners';
import SimpleInput from 'react-simple-input';

import { YOUTUBE_API_KEY, YOUTUBE_SEARCH_RESULTS_MAX, SEARCH_MIN_LETTERS } from './../../config/Constants';
import './../../styles/input.css';
import SongItem from '../SongItem';
import WhatAShame from '../WhatAShame';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
    //   backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    height: '100%',
    marginTop: 20,
    // backgroundColor: 'grey',
    overflow: 'hidden',
  },
  searchList: {
    width: '100%',
    height: 500,
    overflow: 'scroll',
    // backgroundColor: 'grey',
  },
  searchContainer: { width: '100%', marginTop: 20 },
};

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      empty: false,
    };
    // this._searchYoutube('telugu songs', 10);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > SEARCH_MIN_LETTERS - 1) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          this._searchYoutube(searchTerm, YOUTUBE_SEARCH_RESULTS_MAX);
        }
      );
    } else {
      this.setState({ data: [] });
    }
  };

  _cleanSearchResults = results => {
    const filteredResults = [];
    results.forEach(element => {
      // currently no support for playlists, so filter them out
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
        this.setState({ empty: true });
      } else {
        this._renderData(this._cleanSearchResults(results));
      }
    });
  };

  _renderData = songs => {
    const songsList = songs.map(s => (
      <SongItem thumbnailUrl={s.thumbnails.medium.url} name={s.title} videoUrl={s.link} key={s.id} />
    ));
    this.setState({ empty: false, data: songsList, isLoading: false });
  };

  render() {
    return (
      <div style={styles.rootContainer}>
        <div style={styles.searchContainer}>
          <SimpleInput
            className="fluid"
            placeholder="search"
            changeTimeout={250}
            onChange={this.handleChange}
            clearButton
          />
        </div>
        <div style={styles.contentContainer}>
          {this.state.isLoading ? (
            <div style={styles.loaderContainer}>
              <ScaleLoader color="#8bb955" loading />
            </div>
          ) : (
            <div style={styles.searchList}>{this.state.data}</div>
          )}
          {this.state.empty && (
            <div style={styles.loaderContainer}>
              <div style={{ fontSize: 24, color: '#8bb955' }}> No Results </div>
              <WhatAShame />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchTab;
