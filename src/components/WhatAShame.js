import React from 'react';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
};

class WhatAShame extends React.Component {
  constructor(props) {
    super(props);

    const { giphyId } = this.props;
    let giphyUrl;
    if (giphyId) {
      giphyUrl = `https://giphy.com/embed/${giphyId}`;
    } else {
      giphyUrl = 'https://giphy.com/embed/PEtL0mS2JXMBi';
    }

    this.state = {
      giphyUrl,
    };
  }

  render() {
    return (
      <div style={styles.container}>
        {this.props.message && <p> {this.props.message}</p>}
        <iframe
          title="ss"
          src={this.state.giphyUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
    );
  }
}

export default WhatAShame;
