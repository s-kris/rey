import React from 'react';
import { View, Text, Button } from 'react-native-web';

import logo from './../assets/images/logo-min.png';
import { accentColor } from '../config/Colors';

const styles = {
  rootContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    letterSpacing: 1,
    fontSize: 12,
    textTransform: 'uppercase',
  },
};

class Header extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '36%',
              flexDirection: 'column',
              //  / alignItems: 'center',
            }}
          >
            <img src={logo} width="75" height="75" alt="rey music player" />
            <Text className="font" style={styles.logoText}>
              Re-imagined youtube music player
            </Text>
          </View>
          <View>
            <Button title="Download" color={accentColor} />
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
