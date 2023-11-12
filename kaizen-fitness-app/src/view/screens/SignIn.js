import { useContext, useState } from 'react';
import { View, 
  StyleSheet, 
  Text, 
  TouchableOpacity,   
  KeyboardAvoidingView,
  Image, TextInput as NativeTextInput
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import { grayText, mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import SnackBar from '../components/SnackBar';

import { userControllerSignIn } from '../../controller/UserController';

export default function SignIn() {

    const [email, setEmail] = useState('florence.welch@hotmail.com');
    const [password, setPassword] = useState('123456');

    const [colorTextPassword, setColorTextPassword] = useState(color);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');

    const [signInResult, setSignInResult] = useState(true);
  
    const navigation = useNavigation();

  
    const {
      color
    } = useContext(ColorContext);

    const makeUserSignIn = async () => {
      const response = await userControllerSignIn(email, password);

      setSignInResult(!response.result);
      setMessageSnackbar(response.message);
      setVisibleSnackbar(true);

      //if(signInResult) navigation.navigate('Home');

    }
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Login</Text>
            <View style={[styles.headerLine,{ backgroundColor: color }]} />
          </View>
          <View style={styles.body}>
            <KeyboardAvoidingView style={styles.keyboardArea}>
              <TouchableOpacity 
                style={styles.google}
                // onPress={() => setVisibleSnackbar(true)}
              >
                <Image
                  style={{ width: 20, height: 20}} 
                  source={require('../../assets/SignIn/icon_google-logo.png') }
                />
                <Text style={{ color: 'white', fontWeight: 'bold'}}>Continue com o Google</Text>
              </TouchableOpacity>
              <View style={styles.divider}>
                <View style={[styles.line, { backgroundColor: color }]}/>
                <Text style={{ color: color }}>ou</Text>
                <View style={[styles.line, { backgroundColor: color }]}/>
              </View>
              <View style={styles.containerTextInput}>
                <View style={styles.textInput}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Email</Text>
                  <TextInput
                    mode='flat'
                    label=''
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    underlineColor={'white'}
                    activeUnderlineColor={color}
                    textColor={grayText}
                    editable={true}
                    style={
                      { backgroundColor: mainColor , width: 350, height: 35}
                    }
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    render={(props) => <NativeTextInput inputMode={'email'} keyboardType={'email-address'} {...props} />}
                  />
                </View>
                <View style={styles.textInput}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Senha</Text>
                  <TextInput
                    mode='flat'
                    label=''
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    underlineColor={'white'}
                    activeUnderlineColor={color}
                    textColor={grayText}
                    editable={true}
                    style={
                      { backgroundColor: mainColor , width: 350, height: 35}
                    }
                    theme={{
                      colors: {
                          onSurfaceVariant: 'white'
                      }
                    }}
                    onFocus={() => setColorTextPassword(color)}
                    onBlur={() => setColorTextPassword(grayText)}
                    secureTextEntry={secureTextEntry}
                    right={
                      <TextInput.Icon 
                        icon={secureTextEntry === true ? 'eye' : 'eye-off'} 
                        color={colorTextPassword}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                      />
                    }
                  />
                </View>
              </View>
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={{color: color, fontWeight: 'bold'}}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.signIn, { backgroundColor: color }]}
                onPress={() => makeUserSignIn()}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Entrar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                style={styles.newUser}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={{color: grayText, fontWeight: 'normal'}}>Novo usuário?</Text>
                <Text style={{color: color, fontWeight: 'bold'}}>Inscreva-se</Text>
            </TouchableOpacity>

          </View>
          <SnackBar
            visible={visibleSnackbar} 
            setVisible={setVisibleSnackbar} 
            message={messageSnackBar} 
            error={signInResult} 
            width={350}
          />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '5%',
      justifyContent: 'star',
      alignItems: 'center',
    },
    header: {
      marginTop: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 15
    },
    headerLine: {
      width: 400,
      height: 5
    },
    body: {
      marginTop: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyboardArea:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    containerTextInput: {
      width: '100%',
      flexDirection: 'column',
      gap: 20
    },
    forgotPassword: {
      marginTop: 15,
      marginBottom: 40,
      alignSelf: 'flex-start'
    },
    signIn: {
      width: 350,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
    },
    newUser: {
      marginTop: 30,
      flexDirection: 'row',
      gap: 2.5
    }, 
    continue: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 15,
      width: '100%'
    },
    google: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      height: 45,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
      gap: 10
    },
    divider: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
      marginBottom: 20,
      width: 350
    }, 
    line: {
      backgroundColor: grayText,
      width: 155,
      height: 1
    }
});