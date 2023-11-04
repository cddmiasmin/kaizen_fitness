import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Test       from './src/view/screens/Test';
import Home1       from './src/view/screens/Home1';
import Profile    from './src/view/screens/Profile';
import Topics     from './src/view/screens/Topics';
import MyData     from './src/view/screens/MyData';
import Services   from './src/view/screens/Services';
import SignIn     from './src/view/screens/SignIn';
import SignUp     from './src/view/screens/SignUp';
import UserType   from './src/view/screens/UserType';
import Register   from './src/view/screens/Register';
import MyAccount  from './src/view/screens/MyAccount';
import Categories from './src/view/screens/Categories';
import UpdateEvent    from './src/view/screens/UpdateEvent';
import DisplayEvent     from './src/view/screens/DisplayEvent';
import KindOfEvent      from './src/view/screens/KindOfEvent';
import RegisterEvent    from './src/view/screens/RegisterEvent';
import EmailValidation  from './src/view/screens/EmailValidation';
import Home from './src/view/screens/Home';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';
import { DataContextProvider } from './src/contexts/DataContext';

import UserController from './src/controller/UserController';

import auth from '@react-native-firebase/auth';

import 'expo-dev-client';
import Calendar from './src/view/screens/Calendar';

const Stack = createNativeStackNavigator();

export default function App() {

  const userController = new UserController();

  const [route, setRoute] = useState('SignIn');
  const [hasRegister, setHasRegister] = useState(false)
  const [initializing, setInitializing] = useState(true);
  const [userAux, setUserAux] = useState('');
  const [stepNum, setStepNum] = useState(3);

  // const onAuthStateChanged = (user) => {

  //   if (initializing) setInitializing(false);

  //   if(user !== null) {

  //     const getUser = async () => {
  //        var response = await userController.hasFullResgistration();
  //        if(response !== false){
  //         setUserAux(response);
  //        }
  //     }

  //     getUser();

  //   } 
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  return (
    <UserContextProvider userAux={userAux}>
      <ColorContextProvider>
        <DataContextProvider stepNum={stepNum} setStepNum={setStepNum}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={route}>
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
              <Stack.Screen name="Home1" component={Home1} options={{ headerShown: false }}/>
              <Stack.Screen name="MyData" component={MyData} options={{ headerShown: false }}/>
              <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }}/>
              <Stack.Screen name="Services" component={Services} options={{ headerShown: false }}/>
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
              <Stack.Screen name="UserType" component={UserType} options={{ headerShown: false }}/>
              <Stack.Screen name="KindOfEvent" component={KindOfEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen name="EmailValidation" component={EmailValidation} options={{ headerShown: false }}/>
              <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
              <Stack.Screen name="Topics" component={Topics} options={{ headerShown: false }}/>
              <Stack.Screen name="RegisterEvent" component={RegisterEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="UpdateEvent" component={UpdateEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
              <Stack.Screen name="DisplayEvent" component={DisplayEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
              <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }}/> 
            </Stack.Navigator>
          </NavigationContainer>
        </DataContextProvider>
      </ColorContextProvider>
    </UserContextProvider>
  );
}