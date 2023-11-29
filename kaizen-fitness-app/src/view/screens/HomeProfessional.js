import { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import Footer from '../components/Footer';

import _ from 'lodash';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';

export default function HeaderProfessional() {

    const navigation = useNavigation();

    const { user, userCalendar } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [refreshing, setRefreshing] = useState(false);
    const [nextEventData, setNextEventData] = useState(undefined);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        if(nextEventData === undefined){
            if(userCalendar === null) setNextEventData(null);
            else if (userCalendar !== undefined) nextEvent();

            setRefreshing(false);

        } else setRefreshing(false);

    }, []);

    const sortEventsByDate = (object) => {
        return _.orderBy(object ,  [ 'datetime' ] ,  [ 'asc' ]);
    }

    const nextEvent = () => {
        const events = sortEventsByDate(userCalendar);
        setNextEventData(events[0]);
    }

    useEffect(() => {
        if(userCalendar === null) setNextEventData(null);
        else if (userCalendar !== undefined) nextEvent();
    }, []);

    useEffect(() => {
        if(userCalendar === null) setNextEventData(null);
        else if (userCalendar !== undefined) nextEvent();
    }, [userCalendar]);

    // useEffect(() => {
    //    console.log('next', nextEventData);
    // }, [nextEventData]);

    if(nextEventData === undefined || !user)
        return (
            <SafeAreaView style={styles.loading}>
                <StatusBar style='light'/>
                <RefreshControl 
                    refreshing={refreshing} onRefresh={onRefresh} 
                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                >
                    <ActivityIndicator animating={true} color={color} style={[StyleSheet.absoluteFillObject]}/>
                    <Footer />
                </RefreshControl>
            </SafeAreaView>  
        )

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <View style={styles.containerTextos}>
                    <Text style={styles.textBemVindo}>Olá, {user.name}</Text>
                    <Text style={styles.textMotivacional}>Vamos transformar a vida das pessoas!</Text>
                </View>
                <View style={styles.avatar}>
                    {
                        user.avatar && user.avatar.photo
                        ?                        
                            <Avatar.Image
                                size={60} 
                                source={{ uri: (user.avatar.photo) }}
                            />
                        : 
                            <Avatar.Icon 
                                size={60} 
                                icon="account-circle" 
                                color={'white'}
                                style={{ backgroundColor: color }}
                            />
                    }
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.nextEvent}>
                    <Text style={{ color: color, fontWeight: 'bold', fontSize: 16 }}>
                        {nextEventData === null ? 'Você não possui eventos' : 'Próximos eventos'}
                    </Text>
                    <View style={[styles.line, { backgroundColor: color }]}/>
                    {
                        nextEventData === null 
                        ?
                            <TouchableOpacity
                                style={[styles.buttonAlertMessage, { backgroundColor: color }]}
                                onPress={() => navigation.navigate('KindOfEvent', { goBack: 'HomeProfessional' })}
                            >
                                <Text style={styles.textButtonAlertMessage}>
                                    Criar um evento
                                </Text>
                            </TouchableOpacity>
                        : 
                            <EventCard data={nextEventData} orientation={'vertical'}/>
                    }
                </View>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: mainColor,
    },
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 60
    },
    containerTextos: {
        width: '80%',
        gap: 5
    },
    textBemVindo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textMotivacional:{
        color: 'white',
        fontSize: 12,
    }, 
    avatar: {
        width: '20%',
        alignItems: 'flex-end',
    },
    body: {
        marginTop: 30
    },
    nextEvent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    line : {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        height: 1.5,
        borderRadius: 50
    },
    buttonAlertMessage: {
        width: 190,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5 
    },
    textButtonAlertMessage: {
        color: 'white',
        fontWeight: 'bold',
    }
});