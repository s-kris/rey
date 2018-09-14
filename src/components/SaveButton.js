import React from 'react';
import { View } from 'react-native-web';
import ReactSVG from 'react-svg';
import Modal from 'react-responsive-modal';

import saveIcon from './../assets/images/icons/save.svg';
import SaveAsPlaylist from './SaveAsPlaylist';

class SaveButton extends React.Component {
  state = {
    open: false,
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <View>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          center
          styles={{
            modal: {
              padding: 0,
            },
          }}
          showCloseIcon={false}
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
        >
          <SaveAsPlaylist closeModal={() => this.closeModal()} dataToSave={this.props.dataToSave} />
          {/* <AlertBox message="save now or not" yexText="yes" noText="close" onClickNo={() => this.closeModal()} /> */}
        </Modal>
        <ReactSVG
          title="Save to playlist"
          path={saveIcon}
          evalScripts="always"
          svgClassName="action-icon"
          svgStyle={this.props.svgStyle}
          onClick={() => {
            this.openModal();
          }}
        />
      </View>
    );
  }
}

export default SaveButton;
