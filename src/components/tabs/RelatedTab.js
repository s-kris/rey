import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';
import axios from 'axios';

import { KEY_PREF_SHOW_THUMBS } from './../../config/Constants';
import { YOUTUBE_API_KEY } from './../../config/youtube';
import './../../styles/input.css';
import SearchResultItem from '../listItems/SearchResultItem';
import { accentColor } from '../../config/Colors';
import Loader from './../Loader';
import { saveDataToStorage, getDataFromStorage } from '../../api/storage';

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

class RelatedTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      checked: getDataFromStorage(KEY_PREF_SHOW_THUMBS) || false,
    };
  }

  componentDidMount() {
    if (this.props.currentTrack.src) {
      this.fetchRelatedVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentTrack !== prevProps.currentTrack) {
      if (this.props.currentTrack.src) {
        this.fetchRelatedVideos();
      } else {
        this.setState({ data: [] });
      }
    }
  }

  fetchRelatedVideos = () => {
    this.setState({
      isLoading: true,
    });
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API_KEY,
          relatedToVideoId: this.props.currentTrack.src,
          type: 'video',
          part: 'snippet',
          maxResults: '25',
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
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { currentTrack } = this.props;
    return (
      <View style={styles.rootContainer}>
        <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
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
        </View>

        {!currentTrack.label && (
          <Text className="font" style={{ marginTop: 20, fontSize: 18, color: accentColor }}>
            {'No Song is playing'}
          </Text>
        )}
        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={item => item.id}
          data={this.state.data}
          renderItem={({ item }) => (
            <SearchResultItem
              thumbnailUrl={item.thumbnailUrl}
              name={item.title}
              videoUrl={item.videoId}
              showImage={this.state.checked}
            /> // item.link uses too much data
          )}
        />
        {this.state.isLoading && (
          <View style={styles.centerContainer}>
            <Loader color={accentColor} width={100} height={50} />
          </View>
        )}
      </View>
    );
  }
}

export default view(RelatedTab);
