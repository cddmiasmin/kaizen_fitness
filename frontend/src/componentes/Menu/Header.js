import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

import { Avatar } from 'react-native-paper';

export default function Header() {
 return (
    <View style={styles.header}>
        <View style={styles.containerTextos}>
            <Text style={styles.textBemVindo}>Bem-Vinda, Florence</Text>
            <Text style={styles.textMotivacional}>Florence melhor do mundo</Text>
        </View>
        <View style={styles.avatar}>
            <Avatar.Image
                size={60} 
                source={{uri : 'https://i.pinimg.com/564x/8e/07/e4/8e07e4eb005153a28db1bd25d176d2f2.jpg'}} 
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