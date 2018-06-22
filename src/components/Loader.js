import React from 'react';

import './../styles/loader.css';

class Loader extends React.Component {
  render() {
    const { width, height, color, barGap, barWidth } = this.props;
    return (
      <div
        style={{
          width: width || 50,
          height: height || 60,
        }}
      >
        <div className="spinner">
          <div
            className="rect1"
            style={{ backgroundColor: color || 'grey', width: barWidth || 3, margin: barGap || 3 }}
          />
          <div
            className="rect2"
            style={{ backgroundColor: color || 'grey', width: barWidth || 3, margin: barGap || 3 }}
          />
          <div
            className="rect3"
            style={{ backgroundColor: color || 'grey', width: barWidth || 3, margin: barGap || 3 }}
          />
          <div
            className="rect4"
            style={{ backgroundColor: color || 'grey', width: barWidth || 3, margin: barGap || 3 }}
          />
          <div
            className="rect5"
            style={{ backgroundColor: color || 'grey', width: barWidth || 3, margin: barGap || 3 }}
          />
        </div>
      </div>
    );
  }
}
export default Loader;
