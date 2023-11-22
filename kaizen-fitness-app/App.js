import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import Test             from './src/view/screens/Test';
import Topics           from './src/view/screens/Topics';
import MyData           from './src/view/screens/MyData';
import SignIn           from './src/view/screens/SignIn';
import SignUp           from './src/view/screens/SignUp';
import Profile          from './src/view/screens/Profile';
import Services         from './src/view/screens/Services';
import UserType         from './src/view/screens/UserType';
import Register         from './src/view/screens/Register';
import Calendar         from './src/view/screens/Calendar';
import MyAccount        from './src/view/screens/MyAccount';
import Categories       from './src/view/screens/Categories';
import KindOfEvent      from './src/view/screens/KindOfEvent';
import UpdateEvent      from './src/view/screens/UpdateEvent';
import HomeConsumer     from './src/view/screens/Home';
import DisplayEvent     from './src/view/screens/DisplayEvent';
import RegisterEvent    from './src/view/screens/RegisterEvent';
import CreateProfile    from './src/view/screens/CreateProfile';
import SearchResults    from './src/view/screens/SearchResults';
import ForgotPassword   from './src/view/screens/ForgotPassword';
import EmailValidation  from './src/view/screens/EmailValidation';
import HomeProfessional from './src/view/screens/HomeProfessional';

import { UserContextProvider } from './src/contexts/UserContext';
import { DataContextProvider } from './src/contexts/DataContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

import { userControllerHasAProfile } from './src/controller/UserController';

import 'expo-dev-client';

import CalendarAux from './src/view/screens/CalendarAux';

const Stack = createNativeStackNavigator();

export default function App() {

  const [routeName, setRouteName] = useState('Register');
  const [initializing, setInitializing] = useState(true);
  const [userData, setUserData] = useState({});
  const [stepNum, setStepNum] = useState(1);

  // const onAuthStateChanged = (user) => {
  //   setUserData(user);
  //   if (initializing) setInitializing(false);
  //   console.log(user);
  // }

  // const userHasAProfile = async () => {
  //   const profile = await userControllerHasAProfile();
  //   setUserData(profile);

  //   console.log('Profile', profile);

  //   if(profile.userType === 'consumer') return 'HomeConsumer';
  //   else if(profile.userType === 'professional') return 'HomeProfessional';
  //   else return 'CreateProfile';
  // }

  // const WhatWillBeTheInitialRouteName = async () => {
  //   if(userData === null) setRouteName('SignIn'); 
  //   else if(userData.emailVerified === false) setRouteName('EmailValidation');
  //   else {
  //     const routeAux = await userHasAProfile();
  //     console.log(routeAux);
  //     setRouteName(routeAux);
  //   }
  // }

  // async function route() {
  //   await WhatWillBeTheInitialRouteName()
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // useEffect(() => {
  //   if(!initializing) route();
  // }, [initializing]);

  if (!initializing || routeName === '') return null;

  return (
    <UserContextProvider userData={userData}>
      <ColorContextProvider>
        <DataContextProvider stepNum={stepNum} setStepNum={setStepNum}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={routeName}>
              <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
              <Stack.Screen name="Topics" component={Topics} options={{ headerShown: false }}/>
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
              <Stack.Screen name="MyData" component={MyData} options={{ headerShown: false }}/>
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
              <Stack.Screen name="UserType" component={UserType} options={{ headerShown: false }}/>
              <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }}/> 
              <Stack.Screen name="CalendarAux" component={CalendarAux} options={{ headerShown: false }}/> 
              <Stack.Screen name="Services" component={Services} options={{ headerShown: false }}/>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }}/>
              <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
              <Stack.Screen name="KindOfEvent" component={KindOfEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="UpdateEvent" component={UpdateEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="DisplayEvent" component={DisplayEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="HomeConsumer" component={HomeConsumer} options={{ headerShown: false }}/>
              <Stack.Screen name="RegisterEvent" component={RegisterEvent} options={{ headerShown: false }}/>
              <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }}/> 
              <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }}/> 
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/> 
              <Stack.Screen name="EmailValidation" component={EmailValidation} options={{ headerShown: false }}/>
              <Stack.Screen name="HomeProfessional" component={HomeProfessional} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </DataContextProvider>
      </ColorContextProvider>
    </UserContextProvider>
  );
}