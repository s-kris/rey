import React from 'react';
import { View, StyleSheet } from 'react-primitives';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});

class WhatAShame extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <iframe
          title="ss"
          src="https://giphy.com/embed/PEtL0mS2JXMBi"
          width="100%"
          height="100%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
        <p>
          <a href="https://giphy.com/gifs/reaction-wizard-klux-PEtL0mS2JXMBi">via GIPHY</a>
        </p>
      </View>
    );
  }
}

export default WhatAShame;
