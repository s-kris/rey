import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';

class ScaleX extends Component {
  render() {
    return (
      <Transition component="g" enter={{ scaleX: 1 }} leave={{ scaleX: 0 }}>
        {this.props.children}
      </Transition>
    );
  }
}

export default ScaleX;
