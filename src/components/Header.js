import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import { borderRadiusLarge } from '../config/Constants';

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: borderRadiusLarge,
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text> Header </Text>
      </View>
    );
  }
}

export default Header;
