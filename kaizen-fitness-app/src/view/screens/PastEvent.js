import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import _ from 'lodash';
import EventCard from '../components/EventCard';
import { monthsOfTheYear } from '../../services/monthsOfTheYear';

const ItemSeparator = () => <View style={styles.separator} />;

export default function PastEvent() {

    const dataAux = [
        {
            "about": "Um evento intensivo de treinamento físico para todos os níveis, focado em promover um estilo de vida saudável.",
            "address": "Av. do Condicionamento Físico, 10, Cidade Saúde", 
            "created": "[Object]", 
            "datetime": new Date("2022-12-02T11:00:00.293Z"), 
            "idDoc": "TtlJOvKYaBwvjdC8LUBh", 
            "modality": "Presencial", 
            "name": "Treino total", 
            "organizer": 
                {
                    "avatar": {   
                        value: 'jeqMdgieOa', 
                        photo: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/avatarsForProfilePicture%2FjeqMdgieOa.jpg?alt=media&token=acf4a940-41ba-4d2a-9857-018b3c9c044f' 
                    }, 
                    "familyName": "Thomas Peters", 
                    "idUser": "Ryqa8zTxtiee6LcMfMSecKoLaat1", 
                    "kindOfPerson": "PF", 
                    "name": "Evan"
                }, 
            "participants": [], 
            "styleStatusBar": "light", 
            "topics": ["Academia"], 
            "wallpaper": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTYzMTZ8MHwxfHNlYXJjaHw1fHxneW18ZW58MHwwfHx8MTcwMDQzNDMxMXww&ixlib=rb-4.0.3&q=85"
        },
        {
            "about": "Blah blah blah ", 
            "datetime": new Date("2021-12-20T10:00:00.000Z"), 
            "idDoc": "8QiHyzYO30OTDKeRmBxu", 
            "meetingLink": "www.link.com.br", 
            "modality": "Online", 
            "name": "Alimentação para crianças ", 
            "organizer": {"avatar": {   
                value: 'jeqMdgieOa', 
                photo: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/avatarsForProfilePicture%2FjeqMdgieOa.jpg?alt=media&token=acf4a940-41ba-4d2a-9857-018b3c9c044f' 
            }, 
            "familyName": "Dias", "idUser": "omTYIMcUQ0XVH7992VR4xtxfdJt2", "kindOfPerson": "PF", "name": "Iasmin "
            }, 
            "participants": ["OPlh5LL4uFd9mU32uLjCkuQ7jrf1"], 
            "plataform": {"icon": [{ uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/plataforms%2Fmicrosoft-teams.png?alt=media&token=6e474928-3f51-4728-ab57-5e82992159a2' }], "name": "Microsoft Teams", "value": "microsoft-teams"}, 
            "styleStatusBar": "dark", 
            "topics": ["Nutrição infantil"], 
            "wallpaper": "https://images.unsplash.com/photo-1699953352666-9304af5a76c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTYzMTZ8MHwxfGFsbHwyfHx8fHx8Mnx8MTcwMDUxMzU1N3w&ixlib=rb-4.0.3&q=85"
        },
        {
            "about": "Blah blah blah ", 
            "datetime": new Date("2023-6-20T19:00:00.000Z"), 
            "idDoc": "8QiHyzYO30OTDKeRmBxu", 
            "meetingLink": "www.link.com.br", 
            "modality": "Online", 
            "name": "Alimentação para crianças ", 
            "organizer": {"avatar": {   
                value: 'jeqMdgieOa', 
                photo: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/avatarsForProfilePicture%2FjeqMdgieOa.jpg?alt=media&token=acf4a940-41ba-4d2a-9857-018b3c9c044f' 
            }, 
            "familyName": "Dias", "idUser": "omTYIMcUQ0XVH7992VR4xtxfdJt2", "kindOfPerson": "PF", "name": "Iasmin "
            }, 
            "participants": ["OPlh5LL4uFd9mU32uLjCkuQ7jrf1"], 
            "plataform": {"icon": [{ uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/plataforms%2Fmicrosoft-teams.png?alt=media&token=6e474928-3f51-4728-ab57-5e82992159a2' }], "name": "Microsoft Teams", "value": "microsoft-teams"}, 
            "styleStatusBar": "dark", 
            "topics": ["Nutrição infantil"], 
            "wallpaper": "https://images.unsplash.com/photo-1699953352666-9304af5a76c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTYzMTZ8MHwxfGFsbHwyfHx8fHx8Mnx8MTcwMDUxMzU1N3w&ixlib=rb-4.0.3&q=85"
        }, 
    ];

    
    const { color } = useContext(ColorContext);
    const { userType, userCalendar } = useContext(UserContext);

    const navigation = useNavigation();
    const nowDate = new Date();
    const noEventData = userType === 'consumer' 
                                ? { uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/PastEvent_noEventData%2Fconsumer.png?alt=media&token=1f38d208-1bdb-4031-8116-cd3d9e185dda'}
                                : { uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/PastEvent_noEventData%2Fprofessional.png?alt=media&token=5b10ba99-7923-4a5c-9a70-c07c97266925'};

    const [eventData, setEventData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const orderDates = (object, order) => {
        return _.orderBy(object ,  ['datetime'] ,  [order]);
    }

    const groupEventsWithTheSameDate = ( object ) => {
        return _.groupBy(object, (obj) => obj.datetime.toDateString());
    }

    const filterData = () => {
        let pastEvent = orderDates(dataAux, 'desc');
        pastEvent = groupEventsWithTheSameDate(pastEvent);
        pastEvent = Object.entries(pastEvent).map(([date, objects]) => ({
            date: new Date(date),
            objects: orderDates(objects, 'asc')
        }));
        setEventData(pastEvent);
    }

    useEffect(() => {
        // if(userCalendar !== null && userCalendar !== undefined) setEventData(userCalendar);
        // else setLoading(true);

        filterData(); 
    }, []);

    // useEffect(() => {
    //     if(userCalendar !== null && userCalendar !== undefined) setEventData(userCalendar);
    //     else setLoading(true);
    // }, [userCalendar]);

    useEffect(() => {
        if(eventData !== undefined) setLoading(false);
    }, [eventData]);

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'Calendar' })} >
                    <Icon 
                        name={'chevron-left'} 
                        size={20} 
                        color={'white'} 
                    />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Eventos passados</Text>
            </View>
            {
                loading
                    ?
                        <View style={styles.loading}> 
                            <StatusBar style='light'/>
                            <ActivityIndicator animating={true} color={color} />
                        </View>
                    : 
                        <View style={styles.body}>
                            {
                                eventData === null
                                    ?
                                        <View style={styles.noEventData}>
                                            <Image source={noEventData} style={{ width: 250, height: 250 }}/> 
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>
                                                Sem eventos passados
                                            </Text>
                                        </View> 
                                    :
                                        <FlatList
                                            style={{ height: '100%' }}
                                            data={eventData}
                                            ItemSeparatorComponent={ItemSeparator}
                                            contentContainerStyle={{ paddingBottom: 30 }}
                                            ListFooterComponent={<View />}
                                            ListFooterComponentStyle={{ height: 100 }}
                                            renderItem={({ item: event }) => 
                                                <View
                                                    style={styles.eventCard}
                                                >
                                                    <Text style={styles.eventCardTitle}>
                                                        {
                                                            event.date.getDate() 
                                                            + ' de ' 
                                                            + monthsOfTheYear[event.date.getMonth()] 
                                                            + '. ' 
                                                            + (event.date.getFullYear() === nowDate.getFullYear() ? '' : event.date.getFullYear())
                                                        }
                                                    </Text>
                                                    <View style={styles.eventCardLine} />
                                                    <View style={styles.events}>
                                                        {
                                                            event.objects?.map((event, key) => (
                                                                <EventCard key={key} data={event} orientation={'vertical'}/>
                                                            ))
                                                        }
                                                    </View>
                                                </View>
                                            }
                                        />  
                            }
                        </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingTop: 50,
    },
    loading: {
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    header: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '6%',
        marginBottom: 15,
    },
    screenTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 45
    },
    body: {
        width: '100%',
        alignItems: 'center',
        //backgroundColor: 'red'
    },
    noEventData: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        gap: 10
    },
    eventCards:{
        flexDirection: 'column',
        gap: 25,
        marginBottom: 80
    },
    eventCard: {
        justifyContent: 'center',
        alignItems: 'center', 
    },
    eventCardTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    eventCardLine: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 1.5,
        backgroundColor: 'white',
        borderRadius: 50
    },
    events: {
        width: '100%',
        flexDirection: 'column',
        gap: 5
    },
    separator: {
        marginBottom: 20
    },
});