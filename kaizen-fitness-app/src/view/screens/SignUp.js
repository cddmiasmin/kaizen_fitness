import { useContext, useState } from 'react';
import { View, 
    StyleSheet, 
    Text, 
    TouchableOpacity,   
    KeyboardAvoidingView,
    Image,
} from 'react-native';
import { TextInput, Snackbar, IconButton, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import { error, grayText, mainColor, success } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import UserController from '../../controller/UserController';

export default function SignUp() {

    const [name, setName] = useState('Florence');
    const [familyName, setFamilyName] = useState('Welch');
    const [email, setEmail] = useState('florence.welch@hotmail.com');
    const [password, setPassword] = useState('123456');
    const [confirmPassword, setConfirmPassword] = useState('123456');

    const [colorTextPassword, setColorTextPassword] = useState(color);
    const [secureTextEntryForPassword, setSecureTextEntryForPassword] = useState(true);
    const [colorTextConfirmPassword, setColorTextConfirmPassword] = useState(color);
    const [secureTextEntryForConfirmPassword, setSecureTextEntryForConfirmPassword] = useState(true);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('iasmin');

    const [signUpResult, setSignUpResult] = useState(true);
  
    const navigation = useNavigation();

    const userController = new UserController();
  
    const {
      color
    } = useContext(ColorContext);

    const makeUserSignUp = async () => {
      // const response = await userController.signIn(email, password);

      // setSignUpResult(response.result);
      // setMessageSnackbar(response.message);
      // setVisibleSnackbar(true)

      // if(signUpResult) navigation.navigate('Home');

    }
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cadastro</Text>
            <View style={[styles.headerLine,{ backgroundColor: color }]} />
          </View>
          <View style={styles.body}>
          <View style={styles.containerPhoto}>
              <View style={styles.avatar}>                    
                  <IconButton
                      icon="image-plus"
                      iconColor={'white'}
                      style={[{backgroundColor: color}, styles.icon]}
                      size={15}
                      onPress={() => console.log('Pressed')}
                  />
                  <Avatar.Image
                      size={80} 
                      source={{uri: 'https://i.pinimg.com/564x/25/fe/9f/25fe9f36701bdd3b29e4e1ed4dabe032.jpg'}}
                      style={{zIndex: 1}}
                  />
              </View>
            </View>
            <KeyboardAvoidingView style={styles.keyboardArea}>
              <View style={styles.containerTextInput}>
                <View style={styles.textInput}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Nome</Text>
                  <TextInput
                    mode='flat'
                    label=''
                    value={name}
                    onChangeText={(text) => setName(text)}
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
                  />
                </View>
                <View style={styles.textInput}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Sobrenome</Text>
                  <TextInput
                    mode='flat'
                    label=''
                    value={familyName}
                    onChangeText={(text) => setFamilyName(text)}
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
                  />
                </View>
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
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={{color: grayText, fontWeight: 'normal'}}>Já tem uma conta?</Text>
                <Text style={{color: color, fontWeight: 'bold'}}>Entre</Text>
            </TouchableOpacity>
            <View style={styles.continue}>
              <Text style={{color: grayText, fontWeight: 'normal'}}>Ou continue com</Text>
              <TouchableOpacity 
                style={styles.google}
                // onPress={() => setVisibleSnackbar(true)}
              >
                <Image
                  style={{ width: 30, height: 30}} 
                  source={require('../../assets/SignIn/icon_google-logo.png') }
                />
              </TouchableOpacity>
            </View>
          </View>
          <Snackbar
            visible={visibleSnackbar}
            onDismiss={() => setVisibleSnackbar(false)}
            duration={3000}
            action={{
              label: 'Ok',
              textColor: signUpResult === true ? 'white' : 'black',
              onPress: () => {
                setVisibleSnackbar(false);
              },
            }}
            style={[styles.snackbar, signUpResult === true ? styles.snackbarSucess : styles.snackbarError]}
          >
            <Text style={{ color: signUpResult === true ? 'white' : 'black'}}>
              {messageSnackBar}
            </Text>
          </Snackbar>
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
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerPhoto: {
      width: '100%',
      alignItems: 'center',
    },
    icon: {
      position: 'absolute', 
      top: '55%', 
      left: '15%', 
      zIndex: 2
    },
    avatar: {
      zIndex: 1
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
    continue: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      flexDirection: 'column',
      gap: 15
    },
    google: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      height: 45,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5
    },
    snackbar: {
      width: 350,
      alignSelf: 'center',
    },
    snackbarSucess: {
      backgroundColor: success,
    },
    snackbarError: {
      backgroundColor: error,
    }
});