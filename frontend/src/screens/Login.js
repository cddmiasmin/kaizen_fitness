import React from 'react';

import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();
  
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Clique em Mim"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  )
}