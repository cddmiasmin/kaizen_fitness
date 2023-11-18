import { StatusBar } from 'expo-status-bar';

import { useContext, useState } from 'react';
import { 
    Image, SafeAreaView, 
    StyleSheet, Text, 
    TouchableOpacity, View 
} from 'react-native';

import { consumerUserColor, mainColor } from '../../colors/colors';

import { ColorContext } from '../../contexts/ColorContext';

import SnackBar from '../components/SnackBar';

import { 
    userControllerAuth, userControllerEmailValidation 
} from '../../controller/UserController';

export default function Register() {

    const { color } = useContext(ColorContext);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');
    const [errorSnackBar, setErrorSnackBar] = useState(null);
    const [validated, setValidated] = useState(false);

    const ilustrationImg = color === consumerUserColor
                                            ? require('./../../assets/EmailValidation/consumerEmail.png') 
                                            : require('./../../assets/EmailValidation/professionalEmail.png');

    const onDismissSnackBar = async () => {

        setVisibleSnackbar(false);

        if(validated) {
            navigation.navigate('SignIn');
        }

    }

    const isTheUserAlreadyValidated = async () => {
        const user = await userControllerAuth();

        if(user.emailVerified === false) {
            setErrorSnackBar(true);
            setMessageSnackbar('Seu e-mail ainda não foi verificado. Por favor, verique sua caixa de e-mail ou reevie a validação');
        } else {
            setErrorSnackBar(false);
            setMessageSnackbar('Seu e-mail está validado no nosso sistema. Obrigado por fazer parte do Kaizen Fitness!');
            setValidated(true);
        }
        
        setVisibleSnackbar(true);
    }
    
    const sendEmailVerification = async () => {
        const verification = await userControllerEmailValidation();

        if(verification.result) setErrorSnackBar(!verification.result);
        else setErrorSnackBar(!verification.result);
        
        setMessageSnackbar(verification.message);
        setVisibleSnackbar(true);
    } 

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='light'/>
        <Image source={ilustrationImg} style={styles.ilustration}/>
        <Text style={[styles.title, { color: color}]}>Valide seu e-mail</Text>
        <Text style={styles.description}>Para começar a usar sua conta Kaizen Fitness, você precisa confirmar seu endereço de e-mail.</Text>
        <View style={styles.buttons}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => isTheUserAlreadyValidated()}
            >
                <Text style={[styles.buttonTitle, { color: 'white'}]}>Já validei</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => sendEmailVerification()}
            >
                <Text style={[styles.buttonTitle, { color: 'white'}]}>Reenviar validação</Text>
            </TouchableOpacity>
        </View>
        <SnackBar 
            visible={visibleSnackbar} 
            setVisible={onDismissSnackBar} 
            message={messageSnackBar} 
            error={errorSnackBar}
            width={350} 
        />
    </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ilustration: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15
    },
    description: {
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center',
        color: 'white'
    },
    buttons: {
        position: 'absolute',
        bottom: 30,
        gap: 10
    },
    button: {
        width: 260,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonTitle: {
        fontWeight: 'bold',
    }
});