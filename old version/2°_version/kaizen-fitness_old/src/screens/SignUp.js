import { useContext, useState } from 'react';

import { View, 
    StyleSheet, 
    StatusBar, 
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


export default function SignUp() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const {
      color
    } = useContext(ColorContext);
  
    const {
      usuarioInfo,
      setUsuarioInfo,
    } = useContext(UserContext);
  
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={mainColor} barStyle="light-content" />
        <View style={styles.caixaTextos}>
          <Text style={styles.titulo}>Cadastro</Text>
          <Text style={styles.subtitulo}>Crie uma conta</Text>
        </View>
        <TouchableOpacity  style={[styles.google, { backgroundColor: color }]}>
          <AntDesign name="google" size={20} color="white" />
        </TouchableOpacity >
        <Text style={styles.info}>ou cadastre-se com e-mail </Text>
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
          <TouchableOpacity 
              onPress={() => {
                setUsuarioInfo({
                  ...usuarioInfo,
                  "email": email,
                  "senha": senha,
                });
                navigation.navigate('MeusDados', { screen: 'Cadastro' });
              }} 
              style={[styles.cadastrar, { backgroundColor: color }]}
          >
            <Text style={styles.tituloBotao}>Continuar cadastro</Text>
          </TouchableOpacity>
          <Text style={styles.termos}>
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
     marginTop: '60%',
     justifyContent: 'center',
     alignItems: 'center',
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
      marginTop: 20,
      fontSize: 10
    }
});