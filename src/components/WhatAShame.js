import React from 'react';
import { View, Text } from '../../node_modules/react-native-web';
import { accentColor } from '../config/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  message: {
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 24,
    color: accentColor,
  },
};

class WhatAShame extends React.Component {
  constructor(props) {
    super(props);

    const { giphyId } = this.props;
    let giphyUrl;
    if (giphyId) {
      giphyUrl = `https://giphy.com/embed/${giphyId}`;
    } else {
      giphyUrl = 'https://giphy.com/embed/PEtL0mS2JXMBi';
    }

    this.state = {
      giphyUrl,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.message && (
          <Text style={styles.message} className="font">
            {this.props.message}
          </Text>
        )}
        <iframe
          title="ss"
          src={this.state.giphyUrl}
          width="100%"
          height="60%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </View>
    );
  }
}

export default WhatAShame;
