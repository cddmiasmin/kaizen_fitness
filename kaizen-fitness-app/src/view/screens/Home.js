import React from 'react';

import { View, StyleSheet } from 'react-native';

import { mainColor } from '../../colors/colors';

import Header from '../components/Home/Header';
import QuadroInfo from '../components/Home/QuadroInfo';
import Opcao from '../components/Home/Opcao';
import Footer  from '../components/Footer';
import { StatusBar } from 'expo-status-bar';


export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={mainColor} style="light" />
      <Header/>
      <QuadroInfo/>
      <View style={styles.linha}/>
      <Opcao nome='Procure eventos' icon='calendar-cursor'/>
      <Opcao nome='Procure pessoas' icon='nature-people'/>
      <Opcao nome='Procure estabelecimentos' icon='google-maps'/>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'star',
    alignItems: 'center',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '15%',
    marginTop: 5
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