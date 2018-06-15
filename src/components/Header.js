import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';

import logo from './../assets/images/logo-min.png';

const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});

class Header extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <img src={logo} width="75" height="75" alt="rey music player" />
        <Text style={styles.logoText}> REimagined Youtube music player</Text>
      </View>
    );
  }
}

export default Header;
