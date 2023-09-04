import React from 'react';

import { View, StatusBar, StyleSheet, Text } from 'react-native';

import { papelDeParede } from '../colors/colors';

import Header from '../componentes/Menu/Header';
import QuadroInfo from '../componentes/Menu/QuadroInfo';
import Opcao from './../componentes/Menu/Opcao';
import Footer  from '../componentes/Footer';


export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
      <Header/>
      <QuadroInfo/>
      <View style={styles.linha}/>
      <Footer />
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
  },
  linha: {
    width: '100%',
    height: '0.5%',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: '10%',
    marginBottom: '10%'
  },
  opcoes: {
    width: '100%',
    height: '55%',
    backgroundColor: 'red',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 85,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});