import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal, Chip } from 'react-native-paper';

import { mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';
import { UserContext } from '../../../contexts/UserContext';


export default function ModalEventTopics({ active, changeMyStatus, changeTopics }) {

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [topicsSelected, setTopicsSelected] = useState(new Array(user.topics.length));
    const [saveTopicsSelected, setSaveTopicsSelected] = useState([]);

    const updateTopicsSelected = (key, topic) => {
        const topicsSelectedAux = [...topicsSelected];
        topicsSelectedAux[key] = topic;
        setTopicsSelected(topicsSelectedAux);
    };

    useEffect(() => {
        setSaveTopicsSelected(topicsSelected.filter(value => value !== undefined));
    }, [topicsSelected]);

    return (
        <Modal 
            visible={active} 
            onDismiss={() => changeMyStatus(false)}
            contentContainerStyle={styles.container}
        >
            <Text 
                style={[styles.message, { color: color }]}
            >
                Escolha o(s) tema(s) para o seu evento
            </Text>
            <View style={styles.containerChipTopics}>
                {
                    user.topics.map((service, key) => (
                        <Chip
                        key={`chip#${key}`}
                        mode='outlined' 
                        onPress={() => {
                            if(topicsSelected[key] === undefined) 
                            updateTopicsSelected(key, service);
                            else updateTopicsSelected(key, undefined);
                        }}
                        style={[styles.chipTopics, { backgroundColor: mainColor }]}
                        selected={topicsSelected[key] === undefined ? false : true}
                        selectedColor={topicsSelected[key] === undefined ? 'white' : color}
                        >
                          {service}
                        </Chip>
                    ))
                }
            </View>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: color}]}
                onPress={() => {
                    changeTopics(saveTopicsSelected);
                    changeMyStatus(false);
                }}
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar</Text>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor, 
        padding: 22,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        width:'100%',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: '10%',
        fontWeight: 'bold'
    },
    containerChipTopics: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 40,
        height: 40,
        borderRadius: 50
    }
});