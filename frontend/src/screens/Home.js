import React from 'react';

import { View, StatusBar, StyleSheet, Text } from 'react-native';

import { papelDeParede } from '../colors/colors';

import Header from '../componentes/Menu/Header';
import QuadroInfo from '../componentes/Menu/QuadroInfo';
import Footer  from '../componentes/Footer';


export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
      <Header/>
      <QuadroInfo/>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: papelDeParede,
    justifyContent: 'star',
    alignItems: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '5%',
    marginTop: StatusBar.length
  }
});