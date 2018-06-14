import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

class Routes extends React.Component {
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
