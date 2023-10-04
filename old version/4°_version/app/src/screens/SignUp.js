import { useContext, useState } from 'react';

import { View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TextInput,  
    KeyboardAvoidingView, 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { mainColor } from '../colors/colors';

import { ColorContext } from '../contexts/ColorContext';
import { UserContext } from '../contexts/UserContext';
import { StatusBar } from 'expo-status-bar';


export default function SignUp() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const {
      color
    } = useContext(ColorContext);
  
    const {
      user,
      setUser,
      onGoogleButtonPress
    } = useContext(UserContext);
  
    return (
      <View style={styles.container}>
        <StatusBar style='light' />
        <View style={styles.constainerTexts}>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Crie uma conta</Text>
        </View>
        <TouchableOpacity
          onPress={() => onGoogleButtonPress()}
          style={[styles.google, { backgroundColor: color }]}>
          <AntDesign name="google" size={20} color="white" />
        </TouchableOpacity >
        <Text style={styles.info}>ou cadastre-se com e-mail </Text>
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
                onChangeText={(text) => setSenha(text)}
                value={senha}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableOpacity 
              onPress={() => {
                setUser({
                  ...user,
                  "email": email,
                  "senha": senha,
                });
                navigation.navigate('Register', { screen: 'Cadastro' });
              }} 
              style={[styles.register, { backgroundColor: color }]}
          >
            <Text style={styles.titleButton}>Cadastrar</Text>
          </TouchableOpacity>
          <Text style={styles.terms}>
            Ao continuar, confirme que você concorda com nossos termos e condições
          </Text>
        </View>
      </View>
  );
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
    constainerTexts: {
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
     marginTop: '60%',
     justifyContent: 'center',
     alignItems: 'center',
     width: '100%'
    },
    register: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15
    },
    titleButton: {
      fontWeight: 'bold',
      color: 'white',
    },
    terms: {
      color: 'white',
      textAlign: 'center',
      marginTop: 20,
      fontSize: 10
    }
});