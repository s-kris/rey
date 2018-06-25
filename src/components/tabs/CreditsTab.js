import React from 'react';
import { View, Text, FlatList } from 'react-native-web';
import { view } from 'react-easy-state';
import randomColor from 'randomcolor';

import './../../styles/input.css';

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
      data: [
        {
          name: 'React',
          link: 'https://reactjs.org/',
          licence: 'MIT',
        },
        {
          name: 'Unsplash',
          link: 'https://unsplash.com/',
          licence: 'MIT',
        },
        {
          name: 'Irene Davila (Background Image)',
          link: 'https://unsplash.com/photos/9Y5Wk7favpE',
          licence: 'MIT',
        },
        {
          name: 'React Native Web',
          link: 'https://github.com/necolas/react-native-web',
          licence: 'MIT',
        },
      ],
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
