import React from 'react';
import { View, Text, FlatList, Button } from 'react-native-web';
import { accentColor, primaryColor } from '../config/Colors';
import EditPlaylistItem from './listItems/EditPlaylistItem';

const styles = {
  rootContainer: {
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

class EditPlaylist extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text
            className="font"
            style={{
              color: accentColor,
              fontSize: 24,
            }}
          >
            {this.props.title}
          </Text>
        </View>
        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={item => item.id}
          data={this.props.data}
          renderItem={({ item }) => <EditPlaylistItem name={item.label} />}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save Playlist" color={accentColor} />
          <Button title="Cancel" color={primaryColor} onPress={() => this.props.closeModal()} />
        </View>
      </View>
    );
  }
}

export default EditPlaylist;
