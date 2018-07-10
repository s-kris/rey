import React from 'react';
import { View, Text } from 'react-native-web';

import logo from './../assets/images/logo-min.png';

const styles = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    letterSpacing: 3,
    fontSize: 14,
    textTransform: 'uppercase',
  },
};

class Header extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <img src={logo} width="75" height="75" alt="rey music player" />
        <View>
          <Text className="font"  style={styles.logoText}>Re-imagined youtube music player</Text>
        </View>
      </View>
    );
  }
}

export default Header;
