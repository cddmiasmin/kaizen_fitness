import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import { consumerUserColor, mainColor } from '../../colors/colors';

import { StatusBar } from 'expo-status-bar';

import { ColorContext } from '../../contexts/ColorContext';

import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function CreateProfile() {

    const navigation = useNavigation();

    const { color } = useContext(ColorContext);

    const ilustrationImg = color === consumerUserColor
                                    ? require('./../../assets/CreateProfile/welcome_color-consumer.png') 
                                    : require('./../../assets/CreateProfile/welcome_color-professional.png');

    return (
        <View style={styles.container}> 
            <StatusBar style='light'/>
            <View style={styles.contain}>
                <Text 
                    style={{ color: color, fontWeight: 'bold', fontSize: 24, textAlign: 'center', width: 200}}
                >
                    Seja bem-vindo ao Kaizen Fitness
                </Text>
                <Image resizeMode='stretch' source={ilustrationImg} style={{ width: 340, height: 240, marginTop: 20}}/>
                <Text 
                    style={{ color: 'white', fontSize: 14, textAlign: 'center', marginTop: 5, width: 320}}
                >
                    Para começar, precisamos criar o seu perfil. 
                    Por favor, escolha se você é um consumidor em busca de ótimas experiências 
                    ou um profissional pronto para oferecer serviços incríveis. 
                    Vamos lá, personalize a sua jornada!
                </Text>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: color}]}
                    onPress={() => navigation.navigate('UserType')}
                >
                    <Text style={[styles.buttonTitle, { color: 'white'}]}>Criar perfil</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    contain: {
        marginTop: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 260,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
    },
    buttonTitle: {
        fontWeight: 'bold',
    }
});