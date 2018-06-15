import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { GA_ID } from './Constants';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(GA_ID);
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/settings" exact component={SettingsScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
