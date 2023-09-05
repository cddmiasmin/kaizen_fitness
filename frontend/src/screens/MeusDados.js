import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Text, KeyboardAvoidingView , TextInput, TouchableOpacity} from 'react-native';
import { papelDeParede } from '../colors/colors';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '@env';
import { ColorContext } from '../contexts/ColorContext';
import { UserContext } from '../contexts/UserContext';


export default function MeusDados() {

 const { color } = useContext(ColorContext);

 const { usuarioInfo } = useContext(UserContext);

 const [foto, setFoto] = useState('https://i.pinimg.com/564x/45/b9/8b/45b98b4d30af1e16d033dc510a28f699.jpg');
 const [nome, setNome] = useState('Florence Welch');
 const [sobrenome, setSobrenome] = useState('');
 const [dtNascimento, setDtNascimento] = useState('1986-08-28');
 const [email, setEmail] = useState('florence.welch123@gmail.com');
 const [senha, setSenha] = useState('narciso1234');
 const [estado, setEstado] = useState('Reino Unido');
 const [cidade, setCidade] = useState('Londres');
 const [cpf, setCPF] = useState('123.456.789-00');
 const [peso, setPeso] = useState('45.2');
 const [altura, setAltura] = useState('1.80');

 const cadastrarUsuario = async () => {

  const NomeAux = () => {
    var nomeCompleto = nome.split(' ');

    setNome(nomeCompleto[0]);
    setSobrenome(nomeCompleto.slice(1).join(' '));
  } 

  NomeAux();

  axios.post(`${API_URL}/usuario`, {
    foto: foto,
    nome: nome,
    sobrenome: sobrenome,
    dtNascimento: dtNascimento,
    email: email,
    senha: senha,
    estado: estado,
    cidade: cidade,
    cpf: cpf,
    peso: peso,
    altura: altura,
  })
    .then(function (response) {

      if (response.data.error) {
        console.log(response.data.error)
      } else {
        console.log('deu certo')
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}


 return (
   <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
     <ScrollView style={styles.scroll}>
          <View style={styles.subcontainer}>
          <View style={styles.header}>
          <View style={styles.avatar}>
              <Avatar.Image
                  size={110} 
                  source={
                      !foto 
                      ? require('./../../assets/icons/user-icon.png')
                      : {uri:('https://i.pinimg.com/564x/8e/07/e4/8e07e4eb005153a28db1bd25d176d2f2.jpg')}
                  }
                  style={{backgroundColor: color}}
              />
          </View>
          { usuarioInfo.nome &&
              <Text style={styles.nome}>{usuarioInfo.nome}</Text>
          }
          </View>
          <View style={styles.linha}/>
          <KeyboardAvoidingView style={styles.caixaInput}>

            {!usuarioInfo.nome 
              &&
                <Text style={[styles.span, { color: color }]}>Nome Completo</Text> 
            }
            {!usuarioInfo.nome &&
                <View style={styles.inputContainer}>
                  <TextInput
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      onChangeText={(texto) => setNome(texto)}
                      value={nome}
                  />
                </View>
            } 

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Data de Nascimento</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setDtNascimento(texto)}
                  value={dtNascimento}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>CPF</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setCPF(texto)}
                  value={cpf}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setEmail(texto)}
                  value={email}
                  
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setSenha(texto)}
                  value={senha}
                  readOnly={senha ? true : false}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Endereco</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setEstado(texto)}
                  value={estado}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Altura</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setAltura(texto)}
                  value={altura}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Peso</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setPeso(texto)}
                  value={peso}
              />
            </View>
            <TouchableOpacity onPress={() => cadastrarUsuario()} style={[styles.botao, { backgroundColor: color }]}>
              <Text style={styles.tituloBotao}>Cadastrar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
     </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: papelDeParede
    },
    titulo: {
        color: 'white',
        fontSize: 67
    },
    scroll:{
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '5%',
    },
    subcontainer: {
      justifyContent: 'star',
      alignItems: 'center'
    },
    header: {
      //backgroundColor: 'black',
      width: '100%',
      gap: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column'
    },
    nome: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
        marginTop: 10
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        //backgroundColor: 'green'
    },
    linha: {
      width: '100%',
      height: 2,
      backgroundColor: 'white',
      borderRadius: 50,
      marginTop: '5%',
      marginBottom: '5%'
    },
    caixaInput: {
      width: '100%'
    },
    inputContainer: {
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
    botao: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginTop: '10%',
      marginBottom: '15%'
    },
    tituloBotao: {
      fontWeight: 'bold',
      color: 'white',
    },
});