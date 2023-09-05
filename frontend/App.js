import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';
import MeusDados from './src/screens/MeusDados';
import Perfil from './src/screens/Perfil';
import Agenda from './src/screens/Agenda';

import { ColorContextProvider } from './src/contexts/ColorContext';
import { UserContextProvider } from './src/contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <ColorContextProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Cadastro">
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
              <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
              <Stack.Screen name="MeusDados" component={MeusDados} options={{ headerShown: false }}/>
              <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
              <Stack.Screen name="Agenda" component={Agenda} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}