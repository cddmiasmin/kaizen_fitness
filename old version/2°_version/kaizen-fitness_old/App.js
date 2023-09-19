import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home     from './src/screens/Home';
import SignIn   from './src/screens/SignIn';
import SignUp   from './src/screens/SignUp';
import Welcome  from './src/screens/Welcome';
import UserType from './src/screens/UserType';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import 'expo-dev-client';

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
          <Stack.Navigator initialRouteName="UserType">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name="UserType" component={UserType} options={{ headerShown: false }}/>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}

