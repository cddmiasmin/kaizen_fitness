import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { IconButton, Button } from 'react-native-paper';

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { colorConsumidor } from '../colors/colors';
import { ColorContext } from '../contexts/ColorContext';

export default function Footer() {

const route = useRoute();

const navigation = useNavigation();

console.log(route.name);

const { color } = useContext(ColorContext);

 return (
   <View style={styles.footer}>
    <View style={styles.container}>      
        <Ionicons 
            name="calendar" 
            size={route.name == 'Agenda' ? 35 : 25} 
            color={route.name == 'Agenda' ? color : 'white'} 
            onPress={() => navigation.navigate('Agenda')}
        />
        <MaterialIcons 
            name="home-filled" 
            size={route.name == 'Home' ? 35 : 25} 
            color={route.name == 'Home' ? color : 'white'} 
            onPress={() => navigation.navigate('Home')}
        />
        <Ionicons 
            name="ios-person-circle" 
            size={route.name == 'Perfil' ? 35 : 25} 
            color={route.name == 'Perfil' ? color : 'white'} 
            onPress={() => navigation.navigate('Perfil')}
        />
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