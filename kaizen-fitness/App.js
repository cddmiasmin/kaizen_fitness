import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home    from './src/screens/Home';
import Welcome from './src/screens/Welcome';

import { ColorContextProvider } from './src/contexts/ColorContext';
import { UserContextProvider } from './src/contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <ColorContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContextProvider>
    </UserContextProvider>
  );
}

