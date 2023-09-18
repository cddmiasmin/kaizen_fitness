import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home    from './src/screens/Home';
import SignIn   from './src/screens/SignIn';
import Welcome from './src/screens/Welcome';

import { UserContextProvider } from './src/contexts/UserContext';
import { ColorContextProvider } from './src/contexts/ColorContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <ColorContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}

