import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton, Button } from 'react-native-paper';

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { colorConsumidor } from '../colors/colors';

export default function Footer() {

const navigation = useNavigation();

 return (
   <View style={styles.footer}>
    <View style={styles.container}>      
        <Ionicons name="calendar" size={30} color="white" onPress={() => navigation.navigate('Agenda')}/>
        <MaterialIcons name="home-filled" size={35} color={colorConsumidor} onPress={() => navigation.navigate('Home')}/>
        <Ionicons name="ios-person-circle" size={30} color="white" onPress={() => navigation.navigate('Perfil')}/>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingBottom: '5%'
    }
});