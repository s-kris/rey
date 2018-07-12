import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import HomeScreen from '../screens/HomeScreen';
import DesktopApp from '../screens/DesktopApp';
import ThankYouScreen from './../screens/ThankYouScreen';
import UnInstallScreen from '../screens/UnInstallScreen';

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
          <Route path="/thankyou" exact component={ThankYouScreen} />
          <Route path="/uninstall" exact component={UnInstallScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
