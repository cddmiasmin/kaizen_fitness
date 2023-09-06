import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Text, KeyboardAvoidingView , TextInput, TouchableOpacity} from 'react-native';
import { papelDeParede } from '../colors/colors';
import { Avatar, Snackbar, Dialog, Button } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '@env';
import { ColorContext } from '../contexts/ColorContext';
import { UserContext } from '../contexts/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function MeusDados() {

  const navigation = useNavigation();
  
  const route  = useRoute();
  const  screen  = route.params?.screen || 'undefined';

 const { color } = useContext(ColorContext);
 const { usuarioInfo, setUsuarioInfo } = useContext(UserContext);

 const [foto, setFoto] = useState("https://i.pinimg.com/564x/f6/4b/52/f64b529d5c5c5c33a149ce3e22f70709.jpg");
 const [nome, setNome] = useState(usuarioInfo.nome);
 const [sobrenome, setSobrenome] = useState(usuarioInfo.sobrenome);
 const [dtNascimento, setDtNascimento] = useState(usuarioInfo.dtNascimento);
 const [email, setEmail] = useState(usuarioInfo.email);
 const [senha, setSenha] = useState(usuarioInfo.senha);
 const [estado, setEstado] = useState(usuarioInfo.estado);
 const [cidade, setCidade] = useState(usuarioInfo.cidade);
 const [cpf, setCPF] = useState(usuarioInfo.cpf);
 const [peso, setPeso] = useState(usuarioInfo.peso);
 const [altura, setAltura] = useState(usuarioInfo.altura);

 const [SnackBarText, setSnackBarText] = useState('');
 const [visivel, setVisivel] = useState(false);

 const [visible, setVisible] = useState(false);

 const cadastrarUsuario = async () => {

  const NomeAux = () => {
    var nomeCompleto = nome.split(' ');
    var sobrenomeAux = nomeCompleto.slice(1).join(' ');
    setNome(nomeCompleto[0]);
    setSobrenome(sobrenomeAux);
  } 

  NomeAux();

  // try {
  //   const response = await fetch(`${API_URL}/usuario/cadastro`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       foto: foto,
  //       nome: nome,
  //       sobrenome: sobrenome,
  //       dtNascimento: dtNascimento,
  //       email: email,
  //       senha: senha,
  //       estado: estado,
  //       cidade: cidade,
  //       cpf: cpf,
  //       peso: peso,
  //       altura: altura
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Erro na solicitação');
  //   }

  //   const json = await response.json();
  //   setUsuarioInfo({
  //     "idUsuario": json.result[0].idUsuario,
  //     "idConsumidor": json.result[0].idConsumidor,
  //     "foto": json.result[0].foto,
  //     "nome": json.result[0].nome,
  //     "sobrenome": json.result[0].sobrenome,
  //     "dtNascimento": json.result[0].dtNascimento,
  //     "email": json.result[0].email,
  //     "senha": json.result[0].senha,
  //     "estado": json.result[0].estado,
  //     "cidade": json.result[0].cidade,
  //     "cpf": json.result[0].cpf,
  //     "peso": json.result[0].peso,
  //     "altura": json.result[0].altura
  //   });
  //   console.log(usuarioInfo);
  //   navigation.navigate('Home');
    
  // } catch (error) {
  //   console.error(error);
  // }

  axios.post(`${API_URL}/usuario/cadastro`, {
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
    altura: altura
  })
    .then(function (response) {

      if (response.data.error) {
        console.log(response.data.error, 'oi')
      } else {
        setUsuarioInfo({
          "idUsuario": response.data.result.idUsuario,
          "idConsumidor": response.data.result.idConsumidor,
          "foto": response.data.result.foto,
          "nome": response.data.result.nome,
          "sobrenome": "",
          "dtNascimento": response.data.result.dtNascimento,
          "email": response.data.result.email,
          "senha": response.data.result.senha,
          "estado": response.data.result.estado,
          "cidade": response.data.result.cidade,
          "cpf": response.data.result.cpf,
          "peso": response.data.result.peso,
          "altura": response.data.result.altura
        });
        //setVisivel(true);
        //setSnackBarText('Cadastro realizado com sucesso!');

        console.log(response.data);

        if(screen == 'Cadastro') navigation.navigate('Home');
      }

    })
    .catch(function (error) {
      console.log(error);
    });
 }

 const atualizarUsuario = async () => {
  try {

    const response = await fetch(`${API_URL}/usuario/${usuarioInfo.idUsuario}`, {
      method: 'PUT',
      body: JSON.stringify({
        email: email,
        senha: senha,
        estado: estado,
        cidade: cidade,
        peso: peso,
        altura: altura
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
      ...usuarioInfo,
      email: email,
      senha: senha,
      estado: estado,
      cidade: cidade,
      peso: peso,
      altura: altura
    });
    console.log(json.result[0], usuarioInfo);
    setVisible(false);
    navigation.navigate('Home');

    
  } catch (error) {
    console.error(error);
  }
}

 return (
   <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor={papelDeParede} barStyle="light-content" />
     <ScrollView style={styles.scroll}>
          { screen == 'Perfil' &&
            <View style={styles.headerByPerfil}>
              <TouchableOpacity onPress={() => navigation.navigate('Perfil')} >
                <Ionicons name="caret-back-circle-sharp" size={25} color={color} />
              </TouchableOpacity>
              <Text style={[styles.tela, {color: color}]}>Meus Dados</Text>
            </View>
          }
          <View style={styles.subcontainer}>
          <View style={styles.header}>
          <View style={styles.avatar}>
              <Avatar.Image
                  size={110} 
                  source={
                      !foto 
                      ? require('./../../assets/icons/user-icon.png')
                      : {uri:(foto)}
                  }
                  style={{backgroundColor: color}}
              />
          </View>
          {usuarioInfo.nome &&
              <Text style={styles.nome}>{usuarioInfo.name + ' ' + usuarioInfo.sobrenome}</Text>
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
                  readOnly={usuarioInfo.dtNascimento ? true : false}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>CPF</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setCPF(texto)}
                  value={cpf}
                  readOnly={usuarioInfo.cpf ? true : false}
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
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Estado</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setEstado(texto)}
                  value={estado}
              />
            </View>

            <Text style={[styles.span, { color: color, marginTop: 20 }]}>Cidade</Text>
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onChangeText={(texto) => setCidade(texto)}
                  value={cidade}
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

              <TouchableOpacity 
                onPress={() => {
                  if (screen === 'Cadastro') {
                    cadastrarUsuario();
                  } else {
                    setVisible(true);
                  }
                }} 
                style={[styles.botao, { backgroundColor: color }]}
              >
                <Text style={styles.tituloBotao}>{screen == 'Cadastro' ? 'Cadastre-se' : 'Atualizar dados'}</Text>
              </TouchableOpacity>
            
          </KeyboardAvoidingView>
        </View>
          <Snackbar
            visible={visivel}
            onDismiss={() => setVisivel(!visivel)}
          >
          {SnackBarText}
         </Snackbar>
         <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Icon icon="alert" size={35} color={color}/>
            <Dialog.Title style={{color: color, fontWeight: 'bold', textAlign: 'center'}}>Atualizar Dados</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium" style={{textAlign: 'center'}}>Tem certeza que deseja mudar: </Text>

              { usuarioInfo.email !== email &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Email</Text>
              }

              { usuarioInfo.senha !== senha &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Senha</Text>
              }

              { usuarioInfo.estado !== estado &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Estado</Text>
              }

              { usuarioInfo.cidade !== cidade &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Cidade</Text>
              }

              { usuarioInfo.peso !== peso &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Peso</Text>
              }

              { usuarioInfo.altura !== altura &&
                <Text variant="bodyMedium" style={{textAlign: 'center', marginTop: 5}}>Altura</Text>
              }
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)} textColor={color}>Não</Button>
              <Button onPress={() => atualizarUsuario()} textColor={color}>Sim</Button>
            </Dialog.Actions>
         </Dialog>
     </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: papelDeParede
    },
    headerByPerfil: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 40,
      //backgroundColor: 'black'
    },
    tela: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
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
      width: '100%',
      marginBottom: '18%'
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
    },
    tituloBotao: {
      fontWeight: 'bold',
      color: 'white',
    },
});