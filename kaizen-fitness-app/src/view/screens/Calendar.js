import { useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarStrip from 'react-native-calendar-strip';
import { ActivityIndicator } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import { grayText, mainColor } from '../../colors/colors';
import Footer from '../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';

import { _ } from 'lodash';
import EventCard from '../components/EventCard';
import { monthsOfTheYear } from '../../services/monthsOfTheYear';

export default function Calendar() {

    const { userType } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const data = [
        {
            styleStatusBar: 'light',
            wallpaper: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: "Semana da Saúde Feminina",
            datatime: new Date(2024, 0, 2, 10, 30),
            topics: ["Saúde Pública", "Saúde Feminina"],
            modality: "Presencial",
            address: "Rua Frei João, 123",
            city: "Rio GRande do Norte",
            state: "RN",
            latitude: -22.90956,
            longitude: -43.17632,
            organizer: {
              kindOfPerson: 'PJ',
              name: 'Florence',
              familyName: 'Welch',
              photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
            },
            about: "Participe da Semana da Saúde Feminina, um evento dedicado à promoção da saúde da mulher. Teremos palestras, workshops e consultas gratuitas.",
            participants: [
              { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
              { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
              { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
              { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
              { photo: 'https://i.pinimg.com/564x/f7/a6/bc/f7a6bc0999bae0e3148ff8f3d660358e.jpg'},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
              { photo: ''},
            ]
        },
        {
            styleStatusBar: 'light',
            wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            topics: ["Nutrição","Saúde pública",],
            name: 'Palestra sobre alimentação saudável' ,
            about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            plataform: 'microsoft-teams',
            meetingLink: 'https://florenceandthemachine.net/home/',
            organizer: {
                kindOfPerson: 'PF',
                name: 'Florence',
                familyName: 'Welch',
                photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
            },
            datatime: new Date(2023, 9, 25, 19, 30),
            modality: 'Online',
            participants: [
                { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
                { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
                { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
                { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
            ]
        },
        {
            styleStatusBar: 'light',
            wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            topics: ["Nutrição","Saúde pública",],
            name: 'Palestra sobre alimentação saudável' ,
            about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            plataform: 'microsoft-teams',
            meetingLink: 'https://florenceandthemachine.net/home/',
            organizer: {
                kindOfPerson: 'PF',
                name: 'Florence',
                familyName: 'Welch',
                photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
            },
            datatime: new Date(2023, 9, 25, 19, 30),
            modality: 'Online',
            participants: [
                { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
                
                { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
                { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
                { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
            ]
        },
        {
            styleStatusBar: 'light',
            wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            topics: ["Nutrição","Saúde pública",],
            name: 'Palestra sobre alimentação saudável' ,
            about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            plataform: 'microsoft-teams',
            meetingLink: 'https://florenceandthemachine.net/home/',
            organizer: {
                kindOfPerson: 'PF',
                name: 'Florence',
                familyName: 'Welch',
                photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
            },
            datatime: new Date(2023, 10, 3, 2, 58),
            modality: 'Online',
            participants: [
                { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
                
                { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
                { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
                { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
            ]
        },
    ];

    const route = useRoute();
    const navigation = useNavigation();
    const screen = 'Calendar';

    const nowDate = new Date();

    const [segmentedButtonsValue, setSegmentedButtonsValue] = useState('online');
    const [temporaryModalityData, setTemporaryModalityData] = useState([]);
    const [onlineModalityData, setOnlineModalityData] = useState([]);
    const [inPersonModalityData, setInPersonModalityData] = useState([]);

    const groupModality = () => {
        return _.groupBy(data, 'modality');
    }

    const groupEventsWithTheSameDate = ( object ) => {
        return _.groupBy(object, 'datatime')
    }

    const filterDataSameDate = () => {

        let onlineEvent = groupEventsWithTheSameDate(temporaryModalityData[0]);
        onlineEvent = Object.entries(onlineEvent).map(([data, objects]) => ({
            data: new Date(data),
            objects: objects.map(obj => obj)
        }));
        setOnlineModalityData(onlineEvent);

        let inPersonEvent = groupEventsWithTheSameDate(temporaryModalityData[1]);
        inPersonEvent = Object.entries(inPersonEvent).map(([data, objects]) => ({
            data: new Date(data),
            objects: objects.map(obj => obj)
        }));
        setInPersonModalityData(inPersonEvent);

        //console.log(inPersonEvent[0], inPersonEvent[0].objects, inPersonEvent[0].data)
    }

    const filterDataModality = () => {
        const groupedModalities = groupModality();

        let temporaryModalityDataAux = [];
        temporaryModalityDataAux.push(groupedModalities['Online']);
        temporaryModalityDataAux.push(groupedModalities['Presencial']);

        setTemporaryModalityData(temporaryModalityDataAux);

        // console.log('ONLINE', onlineModalityData, onlineModalityData.length);
        // console.log('PRESENCIAL', inPersonModalityData, inPersonModalityData.length);
    }

    useEffect(() => {
        filterDataModality();
    },[]);

    useEffect(() => {
        if(temporaryModalityData.length !== 0) filterDataSameDate();
    }, [temporaryModalityData])

    if(onlineModalityData.length === 0 && inPersonModalityData.length === 0)
        return (
            <View style={styles.loading}> 
                <StatusBar style='light'/>
                <ActivityIndicator animating={true} color={color} />
                {
                    screen === 'Calendar' && <Footer />
                }
            </View>
        )

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <View 
                style={[styles.header]}
            >
                {
                    screen !== 'Calendar' &&
                    <View style={styles.screen}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                            <Icon 
                                name={'chevron-left'} 
                                size={20} 
                                color={segmentedButtonsValue === 'online' ? 'white' : color} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.screenTitle}>{screen}</Text>
                    </View>
                }
                <CalendarStrip
                    scrollable
                    style={{height:100, width: '100%'}}
                    calendarColor={mainColor}
                    calendarHeaderStyle={{color: color }}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    iconStyle={{ overlayColor : 'white' }}
                />
                <View style={styles.segmentedButtons}>
                    <TouchableOpacity 
                        style={[styles.segmentedButton, { backgroundColor: segmentedButtonsValue === 'online' ? color : mainColor }]}
                        onPress={() => {
                            setSegmentedButtonsValue('online');
                        }}
                    >
                            <Icon 
                                name={'monitor-shimmer'} 
                                size={18} 
                                color={segmentedButtonsValue === 'online' ? 'white' : color} 
                            />
                            <Text style={{ color: segmentedButtonsValue === 'online' ? 'white' : color, fontWeight: 'bold' }}>
                                Online
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.segmentedButton, { backgroundColor: segmentedButtonsValue === 'inPerson' ? color : mainColor }]}
                        onPress={() => {
                            setSegmentedButtonsValue('inPerson');
                        }}
                    >
                            <Icon 
                                name={'account-group'} 
                                size={18} 
                                color={segmentedButtonsValue === 'inPerson' ? 'white' : color} 
                            />
                            <Text style={{ color: segmentedButtonsValue === 'inPerson' ? 'white' : color, fontWeight: 'bold' }}>
                               Presencial
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.eventCards}>
                        {
                            segmentedButtonsValue === 'online'
                            ?
                                onlineModalityData.map((event, key) => (
                                    <View
                                        key={`eventCard#${key}`} 
                                        style={styles.eventCard}
                                    >
                                        <Text style={styles.eventCardTitle}>
                                            {
                                                event.data.getDate() + ' de ' + monthsOfTheYear[event.data.getMonth()] + '. ' + (event.data.getFullYear() === nowDate.getFullYear() ? '' : event.data.getFullYear())
                                            }
                                        </Text>
                                        <View style={styles.eventCardLine} />
                                        <View style={styles.events}>
                                            {
                                                event.objects.map((event, key) => (
                                                    <EventCard key={key} data={event} orientation={'vertical'}/>
                                                ))
                                            }
                                        </View>
                                    </View>
                                ))
                            :
                                inPersonModalityData.map((event, key) => (
                                    <View
                                        key={`eventCard#${key}`} 
                                        style={styles.eventCard}
                                    >
                                        <Text style={styles.eventCardTitle}>
                                            {
                                                event.data.getDate() + ' de ' + monthsOfTheYear[event.data.getMonth()] + '. ' + (event.data.getFullYear() === nowDate.getFullYear() ? '' : event.data.getFullYear())
                                            }
                                        </Text>
                                        <View style={styles.eventCardLine} />
                                        <View style={styles.events}>
                                            {
                                                event.objects.map((event, key) => (
                                                    <EventCard key={key} data={event} orientation={'vertical'}/>
                                                ))
                                            }
                                        </View>
                                    </View>
                                ))
                        }
                    </View>
                </View>
            </ScrollView>
            {
                screen === 'Calendar' && <Footer />
            }
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
    },
    header: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 25,
    },
    screen: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '6%',
        marginBottom: 25,
    },
    screenTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 45
    },
    segmentedButtons: {
        width: "80%",
        height: 30,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1
    },
    segmentedButton: {
        width: '50%',
        height: '100%',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    body: {
        paddingLeft: '6%',
        paddingRight: '6%',
        width: '100%',
        //marginTop: 20
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
    }
});