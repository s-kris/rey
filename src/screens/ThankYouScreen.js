import React from 'react';
import { View } from 'react-native-web';

import { borderRadiusLarge } from '../config/Constants';
import Header from '../components/Header';
import WhatAShame from '../components/WhatAShame';
import Footer from '../components/Footer';
import { getRandomImage } from './../utils/utils';

const styles = {
  rootContainer: {
    backgroundImage: `url(${getRandomImage()})`,
    // filter: `blur(3px)`,
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.5)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '77%',
    paddingBottom: 10,
  },
  modulesContainer: {
    backgroundColor: 'white',
    width: '77%',
    height: '77%',
    borderRadius: borderRadiusLarge,
    display: 'flex',
    flexDirection: 'row',
  },
};

class ThankYouScreen extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.modulesContainer}>
          <WhatAShame message="Thanks for installing Rey! Tweet to _skris for feedback." giphyId="fv4tD2kW1PSgg" />
        </View>
        <Footer />
      </View>
    );
  }
}

export default ThankYouScreen;
