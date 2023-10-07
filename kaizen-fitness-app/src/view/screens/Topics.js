import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';

import { mainColor } from '../../colors/colors';

import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import { availableServices } from '../../services/availableServices';

import _ from 'lodash';

export default function Topics() {

    const [topicsSelected, setTopicsSelected] = useState(new Array(availableServices.length));
    const [saveTopicsSelected, setSaveTopicsSelected] = useState([]);

    const { user, userType } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const topic = userType === 'consumer' ? 'Interesses' : 'Serviços';
    const message = userType === 'consumer' ? 'interesses' : 'serviços';

    const alignSelectedTopics = () => {
        
        var topicsSelectedAux = topicsSelected;

        for (let count = 0; count < user.topics.length; count++) {
            const index = availableServices.findIndex((topic) => topic === user.topics[count]);
            topicsSelectedAux[index] = user.topics[count];
        }

        setTopicsSelected(topicsSelectedAux);
    }

    const updateTopicsSelected = (key, topic) => {
        const topicsSelectedAux = [...topicsSelected];
        topicsSelectedAux[key] = topic;
        setTopicsSelected(topicsSelectedAux);
    };

    useEffect(() => alignSelectedTopics(), []);

    useEffect(() => {
        setSaveTopicsSelected(topicsSelected.filter(value => value !== undefined));
    }, [topicsSelected]);

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                    <AntDesign name="left" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.screen}>Meus {topic}</Text>
            </View>
            <Text 
                style={[styles.message, {color: color}]}
            >
               Esta tela permite que você selecione os {message} que deseja alterar.
            </Text>
            <View style={styles.containerChipTopics}>
                {
                    availableServices.map((service, key) => (
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
            {
                !_.isEqual(user.topics, saveTopicsSelected) &&
                <TouchableOpacity style={[styles.saveChangesButton, { backgroundColor: color}]}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar alterações</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '8%',
        paddingRight: '8%',
    },
    header: {
        marginTop: 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30,
    },
    screen: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 45
    },
    containerChipTopics: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chipTopics: {
        width: 'auto'
    },  
    message: {
        width:'100%',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: '10%',
        fontWeight: 'bold'
    },
    saveChangesButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginTop: 40,
        height: 40,
        borderRadius: 50
    }
});