import { useContext, useState } from 'react';

import { View, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput,  KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { AntDesign } from '@expo/vector-icons';

import { papelDeParede } from '../colors/colors';

import { ColorContext } from '../contexts/ColorContext';

import { API_URL } from '@env';
import { UserContext } from '../contexts/UserContext';


export default function Cadastro() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [google, setGoogle] = useState('false');

  const navigation = useNavigation();

  const {
    color
  } = useContext(ColorContext);

  const {
    usuarioInfo,
    setUsuarioInfo
  } = useContext(UserContext);

  const logarUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/usuario/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          senha: senha,
          google: google
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }
  
      const json = await response.json();
      setUsuarioInfo({
        "idUsuario": json.result[0].idUsuario,
        "idConsumidor": json.result[0].idConsumidor,
        "foto": json.result[0].foto,
        "nome": json.result[0].nome,
        "sobrenome": json.result[0].sobrenome,
        "dtNascimento": json.result[0].dtNascimento,
        "email": json.result[0].email,
        "senha": json.result[0].senha,
        "estado": json.result[0].estado,
        "cidade": json.result[0].cidade,
        "cpf": json.result[0].cpf,
        "peso": json.result[0].peso,
        "altura": json.result[0].altura
      });
      console.log(json.result);
      navigation.navigate('Home');
      setEmail('');
      setSenha('');
      
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
      <View style={styles.caixaTextos}>
        <Text style={styles.titulo}>Bem Vindo!</Text>
        <Text style={styles.subtitulo}>Acesse sua conta</Text>
      </View>
      <TouchableOpacity onPress={() => setGoogle('true')} style={[styles.google, { backgroundColor: color }]}>
        <AntDesign name="google" size={20} color="white" />
      </TouchableOpacity >
      <Text style={styles.info}>ou acesse através de seu e-mail </Text>
      <KeyboardAvoidingView style={styles.caixaInput}>
        <Text style={[styles.span, { color: color }]}>Email</Text>
        <View style={styles.inputNome}>
          <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setEmail(text)}
              value={email}
          />
        </View>
        <Text style={[styles.span, { color: color, marginTop: 20 }]}>Senha</Text>
        <View style={styles.inputNome}>
          <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setSenha(text)}
              value={senha}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => logarUsuario()} style={[styles.login, { backgroundColor: color }]}>
          <Text style={styles.tituloBotao}>Acessar</Text>
        </TouchableOpacity>
        <Text style={styles.questao}>
          Não possui uma conta? 
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={[styles.cadastrar, { backgroundColor: color }]}>
          <Text style={styles.tituloBotao}>Cadastre-se</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  login: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  cadastrar: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  tituloBotao: {
    fontWeight: 'bold',
    color: 'white',
  },
  questao: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  }
});