import React from 'react';

import logo from './../assets/images/logo-min.png';

const styles = {
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    letterSpacing: 2,
    fontSize: 14,
    textTransform: 'uppercase',
  },
};

class Header extends React.Component {
  render() {
    return (
      <div style={styles.rootContainer}>
        <img src={logo} width="75" height="75" alt="rey music player" />
        <div style={styles.logoText}> Re-imagined youtube music player</div>
      </div>
    );
  }
}

export default Header;
