document.onkeydown = event => {
  if (!event) event = window.event;
  let code = event.keyCode;
  if (event.charCode && code === 0) code = event.charCode;
  switch (code) {
    case 37:
      console.log('left');
      // Key left.
      break;
    case 38:
      console.log('up');
      // Key up.
      break;
    case 39:
      console.log('right');
      // Key right.
      break;
    case 40:
      console.log('down');
      // Key down.
      break;
    case 32:
      console.log('space');
      // key space
      break;
    case 70:
      // key F
      console.log('F');
      break;
    case 77:
      // key M
      console.log('M');
      console.log(this.props);
      // this.props.media.muteUnmute();
      break;
    case 78:
      // key N
      console.log('N');
      break;
    case 80:
      // key P
      console.log('P');
      break;
    default:
      break;
  }
  event.preventDefault();
};
