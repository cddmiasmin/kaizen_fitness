import { useContext, useState } from 'react';
import { View, 
    StyleSheet, 
    Text, 
    TouchableOpacity,   
    KeyboardAvoidingView,
    Image,
    Button,
} from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StatusBar } from 'expo-status-bar';

import { error, grayText, mainColor, success } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import UserController from '../../controller/UserController';

export default function ForgotPassword() {

    const [email, setEmail] = useState('');

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('iasmin');

    const [forgotPasswordResult, setForgotPasswordResult] = useState(true);
  
    const navigation = useNavigation();

    const userController = new UserController();
  
    const {
      color
    } = useContext(ColorContext);

    const makeUserSignIn = async () => {
    //   const response = await userController.signIn(email, password);

    //   setSignInResult(response.result);
    //   setMessageSnackbar(response.message);
    //   setVisibleSnackbar(true)

    //   if(signInResult) navigation.navigate('Home');

    }
   
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
          <View style={styles.header}>
            <View style={styles.containerArrowTitle}>
                <TouchableOpacity 
                    style={[styles.headerArrow, StyleSheet.absoluteFillObject]}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Icon 
                        name={'chevron-left'} 
                        size={24} 
                        color={'white'} 
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Esqueci minha senha</Text>
            </View>
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
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.forgotPassword, { backgroundColor: email.length === 0 ? '#a6a6a6' : color }]}
                // onPress={() => makeUserSignIn()}
                activeOpacity={email.length === 0 ? 1 : 0.2}
              >
                <Text style={{color: email.length === 0 ?'#666666' : 'white', fontWeight: 'bold'}}>
                    Redefinir senha
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <Snackbar
            visible={visibleSnackbar}
            onDismiss={() => setVisibleSnackbar(false)}
            duration={3000}
            action={{
              label: 'Ok',
              textColor: forgotPasswordResult === true ? 'white' : 'black',
              onPress: () => {
                setVisibleSnackbar(false);
              },
            }}
            style={[styles.snackbar, forgotPasswordResult === true ? styles.snackbarSucess : styles.snackbarError]}
          >
            <Text style={{ color: forgotPasswordResult === true ? 'white' : 'black'}}>
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
    containerArrowTitle:{
        flexDirection: 'row',
        width: '100%'
    },
    headerArrow: {
        marginLeft: -100
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
    },
    forgotPassword: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30
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