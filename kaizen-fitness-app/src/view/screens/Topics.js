import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Chip, IconButton } from 'react-native-paper';

import _ from 'lodash';

import { mainColor } from '../../colors/colors';

import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import { availableTopics } from '../../services/availableServices';

import { consumerControllerUpdateProfile } from '../../controller/ConsumerController';
import { professionalControllerUpdateProfile } from '../../controller/ProfessionalController';

import SnackBar from '../components/SnackBar';

export default function Topics() {

    const navigation = useNavigation();

    const [topicsSelected, setTopicsSelected] = useState(new Array(availableTopics.length));
    const [saveTopicsSelected, setSaveTopicsSelected] = useState([]);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const { 
        user, setUser,
        userType, getProfile,
        setUserCalendar, getCalendarUser
    } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const topic = userType === 'consumer' ? 'Interesses' : 'Serviços';
    const message = userType === 'consumer' ? 'interesses' : 'serviços';

    const saveChangesToTopics = async () => {
        const data = { topics: saveTopicsSelected }
        console.log(data);

        let response = {};

        if(userType === 'consumer') response = await consumerControllerUpdateProfile(data);
        else response = await professionalControllerUpdateProfile(data);

        console.log(response, response.length);

        if(Object.keys(response).length !== 0) {
            setErrorSnackBar(!response.result);
            setMessageSnackbar(response.message);
            setVisibleSnackbar(true);

            if(response.result){
                setUser([]);
                getProfile();
            }

            if(response.result && userType === 'consumer'){
                setUserCalendar(undefined);
                getCalendarUser();
            }
        }
    }

    const alignSelectedTopics = () => {
        
        var topicsSelectedAux = topicsSelected;

        for (let count = 0; count < user.topics.length; count++) {
            const index = availableTopics.findIndex((topic) => topic === user.topics[count]);
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
        if(user.length !== 0) alignSelectedTopics();
    }, [user]);

    useEffect(() => {
        setSaveTopicsSelected(topicsSelected.filter(value => value !== undefined));
    }, [topicsSelected]);

    if(user.length === 0)
        return (
            <View style={styles.loading}> 
                <StatusBar style='light'/>
                <ActivityIndicator animating={true} color={color} />
            </View>
        )

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <AntDesign name="left" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.screen}>Meus {topic}</Text>
                </View>
                <View style={styles.headerRight}>
                    <IconButton
                        icon="check-bold"
                        iconColor={color}
                        style={styles.button}
                        containerColor={mainColor}
                        size={18}
                        disabled={_.isEqual(user.topics, saveTopicsSelected)}
                        onPress={() => saveChangesToTopics()}
                    />
                </View>
            </View>
            <Text 
                style={[styles.message, {color: color}]}
            >
               Esta tela permite que você selecione os {message} que deseja alterar.
            </Text>
            <View style={styles.containerChipTopics}>
                {
                    availableTopics.map((service, key) => (
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
            <SnackBar 
                visible={visibleSnackbar} 
                setVisible={setVisibleSnackbar} 
                message={messageSnackBar} 
                error={errorSnackBar}
                width={315} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '8%',
        paddingRight: '8%',
        alignItems: 'center',
    },
    header: {
        marginTop: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        flexDirection: 'row',
        width: '100%',
    },
    headerLeft:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerRight:{
        alignItems: 'flex-end',
        alignItems: 'center',
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