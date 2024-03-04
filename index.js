import React, { useEffect, useState } from 'react';
import { AppRegistry, BackHandler, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from './app.json';
import NavigationContainer from './navigation.js';
import { store, persistor } from './Src/Components/Redux/store.js';
import Colors from './Src/Constants/Colors.js';

const App = () => {
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setShowCustomAlert(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleCancel = () => {
    setShowCustomAlert(false);
  };

  const handleConfirm = () => {
    setShowCustomAlert(false);
    BackHandler.exitApp();
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer />
        {showCustomAlert && (
          <View style={styles.overlay}>
            <View style={styles.alert}>
              <Text style={styles.message}>Wait!!!!</Text>
              <Text style={styles.message}>Are you sure you want to go back?</Text>
              <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.confirmButton]}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        )}
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: Colors.popupbackgroundcolor,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color:Colors.textcolor,
    fontWeight:'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width:'30%',
    alignItems:'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor:Colors.buttonColor
  },
  buttonText: {
    color: Colors.whitetextcolor,
    fontSize: 16,
    fontWeight:'bold'
  },
});

AppRegistry.registerComponent(appName, () => App);
