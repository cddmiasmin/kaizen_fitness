import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { mainColor } from '../colors/colors';

export default function Register() {

 return (
   <SafeAreaView style={styles.container}>
    <StatusBar style='light'/>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor
    }
});