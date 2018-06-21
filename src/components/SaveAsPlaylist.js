import React from 'react';
import { View, Text, Picker } from 'react-native-web';
import ReactGA from 'react-ga';
import moment from 'moment';

import { bgDark } from '../config/Colors';
import { showToast } from '../utils/utils';
import Playlists from './../api/playlists';
import { GA_EVENT_CAT_MUSIC, GA_EVENT_ACTION_SONG_ADDED_TO_PLAYLIST, COL_MUSIC_DATA } from '../config/Constants';
import userStore from '../stores/userStore';
import musicStore from '../stores/musicStore';
import { updateToFirebase } from '../api/firebase';

const styles = {
  rootContainer: {
    width: 500,
    height: 400,
    backgroundColor: bgDark,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  searchBoxContainer: {
    //  marginTop: 10,
    //  marginBottom: 10,
  },
  messageText: {
    color: '#FFF',
    fontSize: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: { color: '#FFF', fontSize: 18 },
};

class SaveAsPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      selectedOption: 'select',
      allPlaylists: [],
    };
  }

  componentDidMount() {
    this.setState({
      allPlaylists: Playlists.getAll(),
    });
  }

  _onClickSave = () => {
    const { textInput, selectedOption } = this.state;
    if (textInput.length > 0) {
      Playlists.createNew(textInput, this.props.dataToSave);
      this.props.closeModal();
    } else if (selectedOption !== 'select') {
      Playlists.addToPlaylist(selectedOption, this.props.dataToSave);
      ReactGA.event({
        category: GA_EVENT_CAT_MUSIC,
        action: GA_EVENT_ACTION_SONG_ADDED_TO_PLAYLIST,
        value: 1,
      });
      this.props.closeModal();
    } else {
      showToast('Enter a Playlist name');
    }

    if (textInput.length > 0 || selectedOption !== 'select') {
      if (userStore.loggedIn) {
        const firebaseData = {
          playlists: musicStore.getAllPlaylists(),
          updatedAt: moment().format(),
        };
        updateToFirebase(COL_MUSIC_DATA, firebaseData, () => {});
      }
    }
  };

  _onTextEnter = event => {
    this.setState({ textInput: event.target.value, selectedOption: 'select' });
  };

  render() {
    const { allPlaylists } = this.state;

    return (
      <View style={styles.rootContainer}>
        <Text className="font" style={styles.messageText}>
          Save as new Playlist
        </Text>
        <View style={styles.searchBoxContainer}>
          <input
            type="text"
            placeholder="enter a name"
            onChange={this._onTextEnter.bind(this)}
            value={this.state.textInput}
          />
        </View>
        {allPlaylists.length > 0 && (
          <Text className="font" style={styles.messageText}>
            or add to an existing Playlist
          </Text>
        )}
        {allPlaylists.length > 0 && (
          <View>
            <Picker
              style={{ height: 50 }}
              selectedValue={this.state.selectedOption}
              onValueChange={itemValue => this.setState({ textInput: '', selectedOption: itemValue })}
            >
              <Picker.Item label={allPlaylists.length > 0 ? 'Select' : 'None'} value="select" />
              {allPlaylists &&
                allPlaylists.map(p => (
                  <Picker.Item key={p.id} label={`${p.name} (${p.data.length} Songs)`} value={p.id} />
                ))}
            </Picker>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.button} onClick={() => this._onClickSave()}>
            <Text className="font" style={styles.buttonText}>
              Save
            </Text>
          </View>
          <View style={styles.button} onClick={() => this.props.closeModal()}>
            <Text className="font" style={styles.buttonText}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SaveAsPlaylist;
