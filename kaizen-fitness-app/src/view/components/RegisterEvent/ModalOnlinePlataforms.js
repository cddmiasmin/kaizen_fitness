import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native-paper';

import { mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';
import { Image } from 'react-native';

import { onlinePlataforms } from '../../../services/onlinePlataforms';

export default function ModalOnlinePlataforms({ active, changeMyStatus, choosePlatform, initialValue }) {

    const { color } = useContext(ColorContext);

    const [plataformSelected, setPlataformSelected] = useState(initialValue === '' ? 'zoom' : initialValue );

    return (
        <Modal 
            visible={active} 
            onDismiss={() => changeMyStatus(false)}
            contentContainerStyle={styles.container}
        >
            <Text 
                style={[styles.message, { color: color }]}
            >
                Escolha a plataforma que será transmitida o seu evento
            </Text>
            <ScrollView>
                <View style={styles.plataforms}>
                    {
                        onlinePlataforms.map((plataform, key) => (
                            <TouchableOpacity 
                                style={styles.plataform} 
                                key={`plataform#${key}`}
                                onPress={() => {
                                    setPlataformSelected(plataform.value);
                                }}
                            >
                                <Image 
                                    style={[
                                        {width: 75, height: 75}, 
                                        plataformSelected === plataform.value ? styles.plataformSelected : '',
                                        plataformSelected === plataform.value ? { borderColor: color } : ''
                                    ]} 
                                    source={plataform.icon}/>
                                <Text 
                                    style={{color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 2}}
                                >
                                    {plataform.name} 
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: color }]}
                    onPress={() => {
                        choosePlatform(plataformSelected);
                        changeMyStatus(false);
                    }}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor, 
        padding: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 610
    },
    message: {
        width:'100%',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    plataform: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 95
    },
    plataforms:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center'
    },
    plataformSelected: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'rgba(57, 138, 172, 0.2)'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        height: 40,
        borderRadius: 50
    }
});