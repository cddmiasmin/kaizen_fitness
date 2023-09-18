import { useContext, useState } from 'react';
import { View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TextInput,  
    KeyboardAvoidingView, 
    ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

import { mainColor } from '../colors/colors';
import { ColorContext } from '../contexts/ColorContext';
import { UserContext } from '../contexts/UserContext';


export default function SignIn() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const navigation = useNavigation();
  
    const {
      color
    } = useContext(ColorContext);
  
    const {
      usuarioInfo,
      setUsuarioInfo
    } = useContext(UserContext);
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
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
          <TouchableOpacity onPress={() => console.log('iasmin')} style={[styles.login, { backgroundColor: color }]}>
            <Text style={styles.tituloBotao}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserType')} style={styles.cadastrar}>
            <Text style={{ color: 'white'}}> Não possui uma conta? </Text>
            <Text style={{ color: 'white'}}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
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
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
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
      marginTop: '65%',
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
      width: '100%',
      flexDirection: 'row',
      gap: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginTop: 15,
    },
    tituloBotao: {
      fontWeight: 'bold',
      color: 'white',
    },
  });