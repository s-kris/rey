import React from 'react';
import { View, Text } from 'react-native-web';
import { primaryColor } from '../config/Colors';

const styles = {
  rootContainer: {
    width: 500,
    height: 200,
    backgroundColor: primaryColor,
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  messageText: {
    color: '#FFF',
    fontSize: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonText: { color: '#FFF', fontSize: 18 },
};

class AlertBox extends React.Component {
  render() {
    const { message, yesText, noText } = this.props;
    return (
      <View style={styles.rootContainer}>
        <Text className="font" style={styles.messageText}>
          {message}
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button} onClick={() => this.props.onClickYes()}>
            <Text className="font" style={styles.buttonText}>
              {yesText}
            </Text>
          </View>
          <View style={styles.button} onClick={() => this.props.onClickNo()}>
            <Text className="font" style={styles.buttonText}>
              {noText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AlertBox;
