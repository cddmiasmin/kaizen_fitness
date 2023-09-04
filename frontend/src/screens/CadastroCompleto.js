import React from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import { papelDeParede } from '../colors/colors';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroCompleto() {
 return (
   <View style={styles.container}>
     <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
     <ScrollView>
        <Text styles={styles.titulo}>Complete seu perfil</Text>
     </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: papelDeParede
    },
    titulo: {
        color: 'white'
    }
});