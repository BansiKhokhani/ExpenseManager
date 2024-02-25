/**
 * @format
 */

import {AppRegistry} from 'react-native';
import NavigationContainer from './navigation.js';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './Src/Components/Redux/store.js';
import { useEffect, useState } from 'react';

const App = () => {
  
    return (
      <Provider store={store}>
        <NavigationContainer/>
      </Provider>
    );
  };
AppRegistry.registerComponent(appName, () => App);
