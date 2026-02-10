/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider, useSafeAreaInsets, } from 'react-native-safe-area-context';

import { store } from './src/redux/store';
import AuthNavigator from './src/navigation/AuthNavigator';
import { colors } from './src/theme/colors';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundPrimary} />
          <AuthNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
export default App;
