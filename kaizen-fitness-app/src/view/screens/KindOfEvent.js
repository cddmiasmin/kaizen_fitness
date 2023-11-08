import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { mainColor } from '../../colors/colors';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ColorContext } from '../../contexts/ColorContext';

export default function KindOfEvent() {

 const { color } = useContext(ColorContext);
      
 const [buttonSelected, setButtonSelected] = useState('online');

 const navigation = useNavigation();

 const onlineEventImage = require('./../../assets/KindOfEvent/onlineEvent.jpg');
 const inPersonEventImage = require('./../../assets/KindOfEvent/inPersonEvent.jpg'); 

 return (
   <View style={styles.container}>
        <StatusBar style='light'/>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'Calendar'})} >
                <AntDesign name="left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.screen}>Modalidade do Evento</Text>
        </View>
        <Text style={styles.description}>
            Selecione a modalidade do seu novo evento
        </Text>
        <View style={styles.options}>
            <TouchableOpacity 
                style={[styles.option, buttonSelected !== 'online' ? styles.optionOutOfFocus : '']} 
                onPress={() => {
                    if(buttonSelected === 'online') return;
                    else setButtonSelected('online')
                }}
            >
                { buttonSelected === 'online' &&
                    <>
                        <ImageBackground source={onlineEventImage} style={[StyleSheet.absoluteFillObject]}/>
                        <LinearGradient
                            colors={['transparent', color]}
                            style={[StyleSheet.absoluteFillObject]}
                        />
                    </>
                }
                <Text style={styles.title}>Online</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.option, buttonSelected !== 'inPerson' ? styles.optionOutOfFocus : '', styles.professionalOption]} 
                onPress={() => {
                    if(buttonSelected === 'inPerson') return;
                    else setButtonSelected('inPerson')
                }}
            >
                    { buttonSelected === 'inPerson' &&
                        <>
                            <ImageBackground source={inPersonEventImage} style={[StyleSheet.absoluteFillObject]}/>
                            <LinearGradient
                                colors={['transparent', color]}
                                style={[StyleSheet.absoluteFillObject]}
                            />
                        </>
                    }
                <Text style={styles.title}>Presencial</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterEvent', { modality: buttonSelected})} style={[styles.buttonContinue, { backgroundColor: color }]}>
            <Text style={{ color: 'white', fontWeight: 'bold'}}> Prosseguir </Text>
        </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    header: {
        marginTop: 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
    },
    screen: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 45
    },
    description: {
        color: 'white',
        alignSelf: 'center'
    },
    options: {
        marginTop: 45,
        width: '100%',
        height: 400,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    option: {
        height: '90%',
        width: '48%',
        borderRadius: 20,
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        overflow: 'hidden',
        backgroundColor: mainColor,
    },
    optionOutOfFocus: {
        borderColor: 'white', 
        borderWidth: 2, 
        borderStyle: 'dotted',
    },
    professionalOption: {
        marginTop: 40, 
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 25,
        fontSize: 16,
        marginBottom: 20
    },
    buttonContinue: {
        position: 'absolute',
        bottom: 40,
        marginLeft: '5%',
        marginRight: '5%',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});