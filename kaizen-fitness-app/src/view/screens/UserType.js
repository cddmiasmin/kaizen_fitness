import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { consumerUserColor, mainColor, professionalUserColor } from '../../colors/colors';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../contexts/UserContext';
import { DataContext } from '../../contexts/DataContext';

export default function UserType() {

    const [color, setColor] = useState(consumerUserColor);   
    const [buttonSelected, setButtonSelected] = useState('consumer');

    const navigation = useNavigation();
    const { setUserType } = useContext(UserContext);
    const { setStepNum } = useContext(DataContext);

    const consumerImage = require('./../../assets/UserType/consumer.jpg');
    const professionalImage = require('./../../assets/UserType/professional.jpg');
    
    useEffect(() => {
        setColor(buttonSelected === 'consumer' ? consumerUserColor : professionalUserColor);
    }, [buttonSelected]);

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                    <AntDesign name="left" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.screen}>Tipo de Perfil</Text>
            </View>
            <Text style={styles.description}>
                Selecione seu tipo de perfil de acordo com seus interesses 
            </Text>
            <View style={styles.options}>
                <TouchableOpacity 
                    style={[styles.option, buttonSelected !== 'consumer' ? styles.optionOutOfFocus : '']} 
                    onPress={() => {
                        if(buttonSelected === 'consumer') return;
                        else setButtonSelected('consumer');
                    }}
                >
                    { buttonSelected === 'consumer' &&
                        <>
                            <ImageBackground source={consumerImage} style={[StyleSheet.absoluteFillObject]}/>
                            <LinearGradient
                                colors={['transparent', consumerUserColor]}
                                style={[StyleSheet.absoluteFillObject]}
                            />
                        </>
                    }
                    <Text style={styles.title}>Consumidor</Text>
                    <View style={styles.details}>
                        <Text style={styles.detail}>Sell Goods</Text>
                        <Text style={styles.detail}>Followers</Text>
                        <Text style={styles.detail}>Feature</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.option, buttonSelected !== 'professional' ? styles.optionOutOfFocus : '', styles.professionalOption]} 
                    onPress={() => {
                        if(buttonSelected === 'professional') return;
                        else setButtonSelected('professional');
                    }}
                >
                        { buttonSelected === 'professional' &&
                            <>
                                <ImageBackground source={professionalImage} style={[StyleSheet.absoluteFillObject]}/>
                                <LinearGradient
                                    colors={['transparent', professionalUserColor]}
                                    style={[StyleSheet.absoluteFillObject]}
                                />
                            </>
                        }
                    <Text style={styles.title}>Profissional</Text>
                    <View style={styles.details}>
                        <Text style={styles.detail}>Sell Goods</Text>
                        <Text style={styles.detail}>Followers</Text>
                        <Text style={styles.detail}>Feature</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={() => {
                    setStepNum(1);
                    setUserType(buttonSelected);
                    navigation.navigate('Register');
                }} 
                style={[styles.buttonContinue, { backgroundColor: color }]}
            >
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
        backgroundColor: mainColor
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
        fontSize: 16
    },
    details: {
        marginLeft: 25,
        marginBottom: 30,
        marginTop: 10,
        gap: 2
    },
    detail: {
        color: 'white',
        fontSize: 12
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