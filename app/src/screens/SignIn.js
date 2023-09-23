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
import auth from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

import { mainColor } from '../colors/colors';
import { ColorContext } from '../contexts/ColorContext';
import { UserContext } from '../contexts/UserContext';


export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigation = useNavigation();
  
    const {
      color
    } = useContext(ColorContext);
  
    const {
      user,
      setUser,
      onGoogleButtonPress
    } = useContext(UserContext);

    const signInWithFirebase = () => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          console.log('User account created & signed in!', success);
        })
        .catch(error => {

          if (error.code === 'auth/invalid-login') console.log('Endereço de e-mail ou senha incorretos');
          else console.log(error.code, error)
  
        });
    }
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.containerTexts}>
          <Text style={styles.title}>Bem Vindo!</Text>
          <Text style={styles.subtitle}>Acesse sua conta</Text>
        </View>
        <TouchableOpacity onPress={() => onGoogleButtonPress()} style={[styles.google, { backgroundColor: color }]}>
          <AntDesign name="google" size={20} color="white" />
        </TouchableOpacity >
        <Text style={styles.info}>ou acesse através de seu e-mail</Text>
        <KeyboardAvoidingView style={styles.containerInput}>
          <Text style={[styles.span, { color: color }]}>Email</Text>
          <View style={styles.inputComponent}>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
          </View>
          <Text style={[styles.span, { color: color, marginTop: 20 }]}>Senha</Text>
          <View style={styles.inputComponent}>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => signInWithFirebase()} style={[styles.login, { backgroundColor: color }]}>
            <Text style={styles.titleBotao}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserType')} style={styles.register}>
            <Text style={{ color: 'white'}}>Não possui uma conta? </Text>
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
    containerTexts: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 4,
      marginTop: '10%',
    },
    title: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold'
    },
    subtitle: {
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
    containerInput: {
      width: '100%'
    },
    inputComponent: {
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
    register: {
      width: '100%',
      flexDirection: 'row',
      gap: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginTop: 15,
    },
    titleButton: {
      fontWeight: 'bold',
      color: 'white',
    },
  });