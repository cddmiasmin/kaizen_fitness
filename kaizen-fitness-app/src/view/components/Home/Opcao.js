import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Opcao( {nome, icon, route }) {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate(route)}
    >
        <MaterialCommunityIcons name={icon} size={24} color="white" style={{ marginLeft: 20, marginRight: 20}}/>
        <Text style={{color: 'white', fontWeight: 'bold'}} >{nome}</Text>
        <Entypo style={{position: 'absolute', right: 0, marginRight: 10}} name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5d6d89',
    width: '100%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  }
});