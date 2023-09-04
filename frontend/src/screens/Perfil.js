import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { colorConsumidor, papelDeParede } from '../colors/colors';
import Footer from '../componentes/Footer';
import Header from '../componentes/Perfil/Header';
import Opcao from '../componentes/Perfil/Opcao';
import { ColorContext } from '../contexts/ColorContext';

export default function Perfil() {

  const opcoes = [
    { 'id': 1, 'nome': 'Meus dados', 'icon': 'account'},
    { 'id': 2, 'nome': 'Deletar minha conta', 'icon': 'trash-can'}
  ]

  const {
    color
  } = useContext(ColorContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={papelDeParede} barStyle="light-content"/>
      <Header/>
      <View style={styles.linha}/>
      <Opcao nome={opcoes[0].nome} icon={opcoes[0].icon}/>
      <Opcao nome={opcoes[1].nome} icon={opcoes[1].icon}/>
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
  },
  linha: {
    width: '100%',
    height: '0.5%',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 200,
    marginBottom: '10%'
  },
});