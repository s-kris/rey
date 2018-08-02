import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';
import randomColor from 'randomcolor';

import './../../styles/input.css';
import { creditsArray } from '../../config/Constants';

const styles = {
  rootContainer: {
    width: '100%',
    height: '100%',
    marginTop: 25,
  },
};

class CreditsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: creditsArray,
    };
  }

  _onClickItem = item => {
    window.open(item.link, '_blank');
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <FlatList
          style={{ marginTop: 15 }}
          keyExtractor={item => item.name}
          data={this.state.data}
          renderItem={({ item }) => (
            <View
              onClick={() => this._onClickItem(item)}
              className="song-item-container"
              style={{
                paddingLeft: 10,
                borderLeftWidth: 4,
                borderLeftStyle: 'solid',
                borderLeftColor: randomColor({
                  luminosity: 'bright',
                  hue: 'blue',
                }),
              }}
            >
              <Text className="font" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default view(CreditsTab);
