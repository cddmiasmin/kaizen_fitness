import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mainColor } from '../colors/colors';
import { UserContext } from '../contexts/UserContext';
import { ColorContext } from '../contexts/ColorContext';

export default function Register() {

 const { userType } = useContext(UserContext);
 const { color } = useContext(ColorContext);

 const ilustrationImg = userType === 'consumer' 
                                        ? require('./../assets/EmailValidation/consumerEmail.png') 
                                        : require('./../assets/EmailValidation/professionalEmail.png');

 return (
   <SafeAreaView style={styles.container}>
    <StatusBar style='light'/>
    <Image source={ilustrationImg} style={styles.ilustration}/>
    <Text style={[styles.title, { color: color}]}>Valide seu e-mail</Text>
    <Text style={styles.description}>Para começar a usar sua conta Kaizen Fitness, você precisa confirmar seu endereço de e-mail.</Text>
    <TouchableOpacity style={[styles.resend, { backgroundColor: color}]}>
        <Text style={[styles.resendTitle, { color: mainColor}]}>Reenviar e-mail</Text>
    </TouchableOpacity>
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
    resend: {
        position: 'absolute',
        bottom: 30,
        width: 260,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    resendTitle: {
        fontWeight: 'bold',
    }
});