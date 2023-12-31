import React, { useState, useEffect, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home     from './src/screens/Home';
import SignIn   from './src/screens/SignIn';
import SignUp   from './src/screens/SignUp';
import UserType from './src/screens/UserType';
import Register from './src/screens/Register';
import EmailValidation from './src/screens/EmailValidation';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

import 'expo-dev-client';

import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initializing, setInitializing] = useState(true);
  const [userAux, setUserAux] = useState();

  const onAuthStateChanged = (user) => {
    setUserAux(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  return (
    <UserContextProvider userAux={userAux}>
      <ColorContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name="UserType" component={UserType} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="EmailValidation" component={EmailValidation} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}

