import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// CHANGE 2: Modular imports for App listener
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

import { store, RootState } from './src/redux/store';
import { setUser } from './src/redux/authSlice';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme/colors';
import { User, UserInfo } from '@react-native-firebase/app/dist/module/internal/web/firebaseAuth';

const AppContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChangedCallback(user: UserInfo | null) {
    if (user) {
      dispatch(setUser({ uid: user.uid, email: user.email }));
    } else {
      dispatch(setUser(null));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const auth = getAuth();
    // CHANGE 3: Pass the auth instance as the first argument
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedCallback);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundPrimary} />
      {user ? (
        <HomeScreen />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;