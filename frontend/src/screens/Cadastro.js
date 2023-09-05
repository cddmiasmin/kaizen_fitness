import { useContext, useState } from 'react';

import { View, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput,  KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { AntDesign } from '@expo/vector-icons';

import { papelDeParede } from '../colors/colors';

import { ColorContext } from '../contexts/ColorContext';


export default function Cadastro() {

  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const {
    color
  } = useContext(ColorContext);

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
      <View style={styles.caixaTextos}>
        <Text style={styles.titulo}>Cadastro</Text>
        <Text style={styles.subtitulo}>Crie uma conta</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('iasmin')} style={[styles.google, { backgroundColor: color }]}>
        <AntDesign name="google" size={20} color="white" />
      </TouchableOpacity >
      <Text style={styles.info}>ou cadastre-se com e-mail </Text>
      <KeyboardAvoidingView style={styles.caixaInput}>
        <Text style={[styles.span, { color: color }]}>Email</Text>
        <View style={styles.inputNome}>
          <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChange={setEmail}
              value={email}
          />
        </View>
        <Text style={[styles.span, { color: color, marginTop: 20 }]}>Senha</Text>
        <View style={styles.inputNome}>
          <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChange={setEmail}
              value={email}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroCompleto')} style={[styles.cadastrar, { backgroundColor: color }]}>
          <Text style={styles.tituloBotao}>Continuar cadastro</Text>
        </TouchableOpacity>
        <Text style={styles.termos}>
          Ao continuar, confirme que você concorda com nossos termos e condições
        </Text>
      </View>
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
  },
  caixaTextos: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    marginTop: '10%',
  },
  titulo: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold'
  },
  subtitulo: {
    fontSize: 12,
    color: 'white'
  }, 
  google: {
    marginTop: '15%',
    width: 80,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  info: {
    color: 'white',
    fontSize: 14,
    marginTop: '10%',
    marginBottom: '10%',
    textAlign: 'center'
  }, 
  caixaInput: {
    width: '100%'
  },
  inputNome: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    width: '95%',
    height: 35,
    backgroundColor: 'white',
  },
  span: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    width: '100%'
  },
  cadastrar: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  tituloBotao: {
    fontWeight: 'bold',
    color: 'white',
  },
  termos: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  }

});