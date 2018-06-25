import React from 'react';
import { View, Text } from 'react-native-web';
import ReactSVG from 'react-svg';
import randomColor from 'randomcolor';

import './../../styles/song-item.css';
import deleteIcon from './../../assets/images/icons/delete.svg';
import { primaryColorLight } from './../../config/Colors';

class EditPlaylistItem extends React.Component {
  _formatLabel = name => {
    if (name.length > 75) {
      return `${name.substring(0, 75)}...`;
    }
    return name;
  };

  render() {
    const generatedColor = randomColor({
      luminosity: 'bright',
      hue: 'blue',
    });
    return (
      <View
        className="song-item-container"
        style={{
          borderLeftWidth: 4,
          borderLeftStyle: 'solid',
          borderLeftColor: generatedColor,
        }}
      >
        <Text className="title font" numberOfLines={1}>
          {this._formatLabel(this.props.name)}
        </Text>
        <View className="actions-container">
          <ReactSVG
            path={deleteIcon}
            evalScripts="always"
            svgClassName="action-icon"
            svgStyle={{ fill: primaryColorLight }}
          />
        </View>
      </View>
    );
  }
}

export default EditPlaylistItem;
