import React from 'react';
import Transition from 'react-motion-ui-pack';

class Scale extends React.Component {
  render() {
    return (
      <Transition component="g" enter={{ scale: 1 }} leave={{ scale: 0 }}>
        {this.props.children}
      </Transition>
    );
  }
}

export default Scale;
