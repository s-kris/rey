import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import HomeScreen from '../screens/HomeScreen';
import DesktopApp from '../screens/DesktopApp';

class Routes extends React.Component {
  _onSwitch = () => {
    ReactGA.pageview(window.location.pathname);
  };

  render() {
    return (
      <BrowserRouter>
        <Switch onChange={this._onSwitch()}>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/standaloneapp" exact component={DesktopApp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
