import { useContext, useState } from 'react';
import { View, 
  StyleSheet, 
  Text, 
  TouchableOpacity,   
  KeyboardAvoidingView,
  TextInput as NativeTextInput
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import { grayText, mainColor  } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import SnackBar from '../components/SnackBar';

import { userControllerSignUp } from '../../controller/UserController';

export default function SignUp() {

    const [email, setEmail] = useState('ximixah651@marksia.com');
    const [password, setPassword] = useState('123456');
    const [confirmPassword, setConfirmPassword] = useState('123456');

    const [colorTextPassword, setColorTextPassword] = useState(color);
    const [secureTextEntryForPassword, setSecureTextEntryForPassword] = useState(true);
    const [colorTextConfirmPassword, setColorTextConfirmPassword] = useState(color);
    const [secureTextEntryForConfirmPassword, setSecureTextEntryForConfirmPassword] = useState(true);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');

    const [signUpResult, setSignUpResult] = useState(null);
  
    const navigation = useNavigation();
  
    const {
      color
    } = useContext(ColorContext);

    const onDismissSnackBar = async () => {

      setVisibleSnackbar(false);

      if(!signUpResult) navigation.navigate('EmailValidation');
    
    }

    const makeUserSignUp = async () => {
      const response = await userControllerSignUp(email, password);

      setSignUpResult(!response.result);
      setMessageSnackbar(response.message);
      setVisibleSnackbar(true);

    }
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cadastro</Text>
            <View style={[styles.headerLine,{ backgroundColor: color }]} />
          </View>
          <View style={styles.body}>
            <KeyboardAvoidingView style={styles.keyboardArea}>
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
                    secureTextEntry={secureTextEntryForPassword}
                    right={
                      <TextInput.Icon 
                        icon={secureTextEntryForPassword === true ? 'eye' : 'eye-off'} 
                        color={colorTextPassword}
                        onPress={() => setSecureTextEntryForPassword(!secureTextEntryForPassword)}
                      />
                    }
                  />
                </View>
                <View style={styles.textInput}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Confirmar senha</Text>
                  <TextInput
                    mode='flat'
                    label=''
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
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
                    onFocus={() => setColorTextConfirmPassword(color)}
                    onBlur={() => setColorTextConfirmPassword(grayText)}
                    secureTextEntry={secureTextEntryForConfirmPassword}
                    right={
                      <TextInput.Icon 
                        icon={secureTextEntryForConfirmPassword === true ? 'eye' : 'eye-off'} 
                        color={colorTextConfirmPassword}
                        onPress={() => setSecureTextEntryForConfirmPassword(!secureTextEntryForConfirmPassword)}
                      />
                    }
                  />
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.signUp, { backgroundColor: color }]}
                onPress={() => makeUserSignUp()}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Casdastrar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                style={styles.newUser}
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text style={{color: grayText, fontWeight: 'normal'}}>Já tem uma conta?</Text>
                <Text style={{color: color, fontWeight: 'bold'}}>Entre</Text>
            </TouchableOpacity>
          </View>
          <SnackBar
            visible={visibleSnackbar} 
            setVisible={onDismissSnackBar} 
            message={messageSnackBar} 
            error={signUpResult} 
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
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyboardArea:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerTextInput: {
      width: '100%',
      flexDirection: 'column',
      gap: 20
    },
    forgotPassword: {
      marginTop: 15,
      alignSelf: 'flex-start'
    },
    signUp: {
      width: 350,
      height: 40,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
    },
    newUser: {
      marginTop: 20,
      flexDirection: 'row',
      gap: 2.5
    },
});