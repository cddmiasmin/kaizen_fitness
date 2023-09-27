import React, { useContext } from 'react';

import { View, StyleSheet, Text } from 'react-native';

import { Avatar } from 'react-native-paper';
import { UserContext } from '../../../contexts/UserContext';

export default function Header() {
 
  const { user } = useContext(UserContext);

 return (
    <View style={styles.header}>
        <View style={styles.containerTextos}>
            <Text style={styles.textBemVindo}>Olá, {user ? user.name : ''}</Text>
            <Text style={styles.textMotivacional}>Vamos ter uma vida saudável!</Text>
        </View>
        <View style={styles.avatar}>
            <Avatar.Image
                size={60} 
                source={
                  !user 
                  ? {uri: ('https://i.pinimg.com/564x/6a/27/ab/6a27ab62c11c4bb972fedb8307bc8a25.jpg')}
                  : {uri:(user.photo)}
              } 
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      containerTextos: {
        width: '80%',
        gap: 5
      },
      textBemVindo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
      },
      textMotivacional:{
        color: 'white',
        fontSize: 12,
      }, 
      avatar: {
        width: '20%',
        alignItems: 'flex-end',
      }
});