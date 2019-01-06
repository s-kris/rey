import React from 'react';
import { View, Text } from 'react-native-web';

import TwitterIcon from './../assets/images/twitter-icon.png';
import InstagramIcon from './../assets/images/instagram-icon.png';
import WebsiteIcon from './../assets/images/website-icon.png';

const styles = {
  rootContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  attributionText: {
    fontSize: 12,
    color: '#FFF',
    cursor: 'pointer',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

class Footer extends React.Component {
  //   componentDidMount() {
  //     const script = document.createElement('script');

  //     script.src = 'https://platform.twitter.com/widgets.js';
  //     script.async = true;

  //     document.body.appendChild(script);
  //   }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.row}>
          <Text
            style={styles.attributionText}
            onClick={() => {
              window.open('https://saikrishna.me', '_blank');
            }}
          >
            Developed by _skris
            {'  '}
            {/* <a
            href="https://twitter.com/_skris?ref_src=twsrc%5Etfw"
            className="twitter-follow-button"
            data-show-count="true"
          >
            @_skris
          </a> */}
          </Text>
          <a href="https://saikrishna.me" target="_blank" rel="noopener noreferrer">
            <img src={WebsiteIcon} style={{ cursor: 'pointer', width: 20, height: 20 }} alt="saikrishna.me" />
          </a>
          <a href="https://twitter.com/_skris" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} style={{ cursor: 'pointer', width: 24, height: 24 }} alt="_skris" />
          </a>
          <a href="https://instagram.com/saikrishna.me" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} style={{ cursor: 'pointer', width: 20, height: 20 }} alt="saikrishna.me" />
          </a>
        </View>
        <View
          style={styles.row}
          onClick={() => {
            window.open('https://github.com/s-kris/rey', '_blank');
          }}
        >
          <Text style={styles.attributionText}>
            {'  '}|{'  '}
            Find on Github
            {'  '}
          </Text>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/github-146-569237.png"
            style={{ cursor: 'pointer', width: 24, height: 24 }}
            alt="rey"
          />
        </View>
      </View>
    );
  }
}

export default Footer;
