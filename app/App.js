import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn   from './src/screens/SignIn';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

import React, { useState, useEffect } from 'react';

import 'expo-dev-client';

import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  return (
    <UserContextProvider>
      <ColorContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}

