import React, { useContext } from 'react';

import { View, StyleSheet, Text } from 'react-native';

import { Avatar } from 'react-native-paper';
import { UserContext } from '../../contexts/UserContext';

export default function Header() {
 
  const { usuarioInfo } = useContext(UserContext);

 return (
    <View style={styles.header}>
        <View style={styles.containerTextos}>
            <Text style={styles.textBemVindo}>Olá, {usuarioInfo.nome}</Text>
            <Text style={styles.textMotivacional}>Vamos ter uma vida saudável!</Text>
        </View>
        <View style={styles.avatar}>
            <Avatar.Image
                size={60} 
                source={
                  !usuarioInfo.foto 
                  ? require('./../../../assets/icons/user-icon.png')
                  : {uri:(usuarioInfo.foto)}
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