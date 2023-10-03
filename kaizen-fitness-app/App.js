import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home     from './src/view/screens/Home';
import Profile  from './src/view/screens/Profile';
import MyData   from './src/view/screens/MyData';
import Services from './src/view/screens/Services';
import SignIn   from './src/view/screens/SignIn';
import SignUp   from './src/view/screens/SignUp';
import UserType from './src/view/screens/UserType';
import Register from './src/view/screens/Register';
import EmailValidation from './src/view/screens/EmailValidation';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

import auth from '@react-native-firebase/auth';

import 'expo-dev-client';
import UserController from './src/controller/UserController';

const Stack = createNativeStackNavigator();

export default function App() {

  const userController = new UserController();

  const [route, setRoute] = useState('SignIn');
  const [hasRegister, setHasRegister] = useState(false)
  const [initializing, setInitializing] = useState(true);
  const [userAux, setUserAux] = useState();

  const onAuthStateChanged = (user) => {

    if (initializing) setInitializing(false);

    if(user !== null) {

      const getUser = async () => {
         var response = await userController.hasFullResgistration();
         if(response !== false){
          setUserAux(response);
         }
      }

      getUser();

    } 
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
          <Stack.Navigator initialRouteName={route}>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="MyData" component={MyData} options={{ headerShown: false }}/>
            <Stack.Screen name="Services" component={Services} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="UserType" component={UserType} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="EmailValidation" component={EmailValidation} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}