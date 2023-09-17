import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home    from './src/screens/Home';
import Welcome from './src/screens/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

