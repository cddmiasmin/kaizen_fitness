import { StatusBar } from 'expo-status-bar';

import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { consumerUserColor, mainColor } from '../../colors/colors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';
import { View } from 'react-native';

export default function Register() {

 const { color } = useContext(ColorContext);

 const ilustrationImg = color === consumerUserColor
                                        ? require('./../../assets/EmailValidation/consumerEmail.png') 
                                        : require('./../../assets/EmailValidation/professionalEmail.png');

 return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='light'/>
        <Image source={ilustrationImg} style={styles.ilustration}/>
        <Text style={[styles.title, { color: color}]}>Valide seu e-mail</Text>
        <Text style={styles.description}>Para começar a usar sua conta Kaizen Fitness, você precisa confirmar seu endereço de e-mail.</Text>
        <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, { backgroundColor: color}]}>
                <Text style={[styles.buttonTitle, { color: 'white'}]}>Já validei</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: color}]}>
                <Text style={[styles.buttonTitle, { color: 'white'}]}>Reenviar validação</Text>
            </TouchableOpacity>
        </View>
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