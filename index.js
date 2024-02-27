import { AppRegistry } from 'react-native';
import NavigationContainer from './navigation.js';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './Src/Components/Redux/store.js';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => App);


// https://progressier.com/pwa-icons-and-ios-splash-screen-generator