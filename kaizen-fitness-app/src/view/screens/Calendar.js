import { useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarStrip from 'react-native-calendar-strip';

import { StatusBar } from 'expo-status-bar';

import { grayText, mainColor } from '../../colors/colors';
import { monthsOfTheYear } from '../../services/monthsOfTheYear';

import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

import { ColorContext } from '../../contexts/ColorContext';
import { UserContext } from '../../contexts/UserContext';

import { _ } from 'lodash';

const ItemSeparator = () => <View style={styles.separator} />;

export default function Calendar() {

    const arrowLeft = { uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/Calendar_CalendarStrip%2Farrow-left.png?alt=media&token=a40a2f45-cd70-4d05-9127-3a237c4dac94'};
    const arrowRight = { uri: 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/Calendar_CalendarStrip%2Farrow-right.png?alt=media&token=1af4b23d-9408-4177-aad2-3bf07b019be0'};
    
    const dataAux = [
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
            datetime: new Date(2023, 9, 25, 19, 30),
            modality: 'Online',
            participants: [
                { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
                
                { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
                { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
                { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
            ]
        },
        // {
        //     styleStatusBar: 'light',
        //     wallpaper: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     name: "Semana da Saúde Feminina",
        //     datetime: new Date(2024, 0, 2, 10, 30),
        //     topics: ["Saúde Pública", "Saúde Feminina"],
        //     modality: "Presencial",
        //     address: "Rua Frei João, 123",
        //     city: "Rio GRande do Norte",
        //     state: "RN",
        //     latitude: -22.90956,
        //     longitude: -43.17632,
        //     organizer: {
        //       kindOfPerson: 'PJ',
        //       name: 'Florence',
        //       familyName: 'Welch',
        //       photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        //     },
        //     about: "Participe da Semana da Saúde Feminina, um evento dedicado à promoção da saúde da mulher. Teremos palestras, workshops e consultas gratuitas.",
        //     participants: [
        //       { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
        //       { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
        //       { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
        //       { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        //       { photo: 'https://i.pinimg.com/564x/f7/a6/bc/f7a6bc0999bae0e3148ff8f3d660358e.jpg'},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //       { photo: ''},
        //     ]
        // },
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
            datetime: new Date(2023, 9, 25, 19, 0),
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
            datetime: new Date(2023, 10, 3, 2, 58),
            modality: 'Online',
            participants: [
                { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
                
                { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
                { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
                { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
            ]
        },
    ];

    const { userType, userCalendar } = useContext(UserContext);
    const { color } = useContext(ColorContext);
 
    const route = useRoute();
    const navigation = useNavigation();
    const screen = route.params.screen === undefined ? 'Calendar' : route.params.screen;
    const data = route.params.data === undefined ? dataAux : route.params.data;

    const nowDate = new Date();

    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [segmentedButtonsValue, setSegmentedButtonsValue] = useState('online');
    const [temporaryModalityData, setTemporaryModalityData] = useState([]);
    const [onlineModalityData, setOnlineModalityData] = useState(null);
    const [inPersonModalityData, setInPersonModalityData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const groupModality = () => {
        return _.groupBy(eventData, 'modality');
    }

    const orderDates = ( object ) => {
        return _.orderBy(object ,  [ 'datetime' ] ,  [ 'asc' ]);
    }

    const groupEventsWithTheSameDate = ( object ) => {
        return _.groupBy(object, (obj) => obj.datetime.toDateString());
    }

    const filterDataSameDate = () => {

        if(temporaryModalityData.online !== undefined){
            let onlineEvent = orderDates(temporaryModalityData.online);
            onlineEvent = groupEventsWithTheSameDate(onlineEvent);
            onlineEvent = Object.entries(onlineEvent).map(([date, objects]) => ({
                date: new Date(date),
                objects: objects.map(obj => obj)
            }));
            setOnlineModalityData(onlineEvent);
        } else setOnlineModalityData([]);

        if(temporaryModalityData.presencial !== undefined){
            let inPersonEvent = orderDates(temporaryModalityData.presencial);
            inPersonEvent = groupEventsWithTheSameDate(inPersonEvent);
            inPersonEvent = Object.entries(inPersonEvent).map(([date, objects]) => ({
                date: new Date(date),
                objects: objects.map(obj => obj)
            }));
            setInPersonModalityData(inPersonEvent);
        } else setInPersonModalityData([]);

    }

    const filterDataModality = () => {
        const groupedModalities = groupModality();

        let temporaryModalityDataAux = { online: [], presencial: [] };
        temporaryModalityDataAux.online = groupedModalities['Online'];
        temporaryModalityDataAux.presencial = groupedModalities['Presencial'];

        setTemporaryModalityData(temporaryModalityDataAux);
    }

    const periodOfEvents = () => {
        
        const data = segmentedButtonsValue === 'online' ? onlineModalityData : inPersonModalityData;
        let datesWhitelist = [];
        let date = new Date();

        if(data.length !== 0) {
            datesWhitelist = [{
                start: data[0].date,
                end: data[data.length - 1].date,
            }];
        } else {
            datesWhitelist = [{
                start: date,
                end: date,
            }];
        }

        return datesWhitelist;

    }

    const datesWithNoEvent = () => {

        const data = segmentedButtonsValue === 'online' ? onlineModalityData : inPersonModalityData;
        let datesWithNoEvent = [];

        if(data.length === 0 ) return datesWithNoEvent;

        const date = new Date(data[0].date);
    
        for(let obj = 0; obj < data.length; obj++)
        {
            while(date < data[obj].date){
                datesWithNoEvent.push(new Date(date));
                date.setDate( date.getDate() + 1);
            }
            date.setDate( date.getDate() + 1);
        }
    
        return datesWithNoEvent;

    }

    const datesWithEvents = () => {
       
        const data = segmentedButtonsValue === 'online' ? onlineModalityData : inPersonModalityData;
        let markedDatesArray = [];

        if(data.length === 0 ) return markedDatesArray;

        data.forEach((event) => {
            markedDatesArray.push({
                date: event.date,
                dots: [
                  {
                    color: 'white',
                    selectedColor: 'white',
                  },
                ],
            })
        })

        return markedDatesArray;
    }

    useEffect(() => {
        if(screen === 'Calendar') setEventData(userCalendar); 
        else setEventData(data);
    }, []);

    useEffect(() => {
        if(screen === 'Calendar') {
            if(userCalendar !== null && userCalendar !== undefined) setEventData(userCalendar);
            else setLoading(true);
        }
    }, [userCalendar]);

    useEffect(() => {
        if(eventData !== null && eventData !== undefined) filterDataModality();
    }, [eventData]);

    useEffect(() => {
        if(temporaryModalityData.length !== 0) filterDataSameDate();
    }, [temporaryModalityData]);

    useEffect(() => {
        if(onlineModalityData !== null && inPersonModalityData !== null) {
            setLoading(false);

            if(onlineModalityData.length === 0) setSelectedDate(new Date());
            else setSelectedDate(new Date(onlineModalityData[0].date));
        }
    }, [onlineModalityData, inPersonModalityData]);

    if(eventData === null && screen === 'Calendar')
        return (
            <View style={styles.container}> 
                <StatusBar style='light'/>
                <View style={styles.alertMessage}>
                    <View style={styles.containerAlert}>
                        <Text style={styles.alert}>
                            Você não possui eventos 
                        </Text>
                        <Text style={styles.alert}>
                            na sua agenda
                        </Text>
                    </View>
                    {
                        userType === 'professional'
                            ?
                                <TouchableOpacity
                                    style={[styles.buttonAlertMessage, { backgroundColor: color }]}
                                    onPress={() => navigation.navigate('KindOfEvent')}
                                >
                                    <Text style={styles.textButtonAlertMessage}>
                                        Criar um evento
                                    </Text>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity
                                    style={[styles.buttonAlertMessage, { backgroundColor: color }]}
                                    onPress={() => navigation.navigate('HomeConsumer')}
                                >
                                    <Text style={styles.textButtonAlertMessage}>
                                        Procurar eventos
                                    </Text>
                                </TouchableOpacity>
                    }
                </View>
                <Footer />
            </View>
        )


    if(loading)
        return (
            <View style={styles.loading}> 
                <StatusBar style='light'/>
                <ActivityIndicator animating={true} color={color} />
                {
                    screen === 'Calendar' && <Footer />
                }
            </View>
        )
    else {

        const datesWhitelist = periodOfEvents();
        const datesBlacklist = datesWithNoEvent();
        const markedDates = datesWithEvents();
    
        return (
            <View style={styles.container}>
                <StatusBar style='light'/>
                <View 
                    style={[styles.header]}
                >
                    {
                        screen !== 'Calendar' &&
                            <View style={styles.screen}>
                                <TouchableOpacity onPress={() => navigation.navigate('HomeConsumer')} >
                                    <Icon 
                                        name={'chevron-left'} 
                                        size={20} 
                                        color={segmentedButtonsValue === 'online' ? 'white' : color } 
                                    />
                                </TouchableOpacity>
                                <Text style={styles.screenTitle}>{screen}</Text>
                            </View>
                    }
                    <CalendarStrip
                        scrollable
                        style={{ height:100, width: '100%' }}
                        calendarColor={mainColor}
                        highlightDateNumberStyle={{color: color}}
                        highlightDateNameStyle={{color: color}}
                        calendarHeaderStyle={{color: color }}
                        dateNumberStyle={{color: 'white'}}
                        dateNameStyle={{color: 'white'}}
                        disabledDateNameStyle={{color: grayText}}
                        disabledDateNumberStyle={{color: grayText}}
                        iconContainer={{flex: 0.1}}
                        datesWhitelist={datesWhitelist}
                        datesBlacklist={datesBlacklist}
                        onDateSelected={(date) => {
                            setSelectedDate(new Date(date));
                        }}
                        markedDates={markedDates}
                        selectedDate={selectedDate}
                        iconLeft={arrowLeft}
                        iconRight={arrowRight}
                    />
                    <View style={styles.segmentedButtons}>
                        <TouchableOpacity 
                            style={[styles.segmentedButton, { backgroundColor: segmentedButtonsValue === 'online' ? color : mainColor }]}
                            onPress={() => {

                                if(onlineModalityData.length === 0) setSelectedDate(new Date());
                                else setSelectedDate(new Date(onlineModalityData[0].date));
                                
                                setSegmentedButtonsValue('online');
                            }}
                        >
                                <Icon 
                                    name={'monitor-shimmer'} 
                                    size={18} 
                                    color={segmentedButtonsValue === 'online' ? 'white' : color } 
                                />
                                <Text style={{ color: segmentedButtonsValue === 'online' ? 'white' : color, fontWeight: 'bold' }}>
                                    Online
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.segmentedButton, { backgroundColor: segmentedButtonsValue === 'inPerson' ? color : mainColor }]}
                            onPress={() => {

                                if(inPersonModalityData.length === 0) setSelectedDate(new Date());
                                else setSelectedDate(new Date(inPersonModalityData[0].date));

                                setSegmentedButtonsValue('inPerson');
                            }}
                        >
                                <Icon 
                                    name={'account-group'} 
                                    size={18} 
                                    color={segmentedButtonsValue === 'inPerson' ? 'white' : color } 
                                />
                                <Text style={{ color: segmentedButtonsValue === 'inPerson' ? 'white' : color, fontWeight: 'bold' }}>
                                   Presencial
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.eventCards}>
                        {
                            (segmentedButtonsValue === 'online' && onlineModalityData.length === 0)  
                                || (segmentedButtonsValue === 'inPerson' && inPersonModalityData.length === 0) 
                                    ?
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 15}}>
                                            <Text style={{ color: 'white', fontWeight: 'bold'}}>
                                                {
                                                    screen === 'Calendar'
                                                    ? 
                                                        `Você não possui eventos ${ segmentedButtonsValue === 'online' ? 'online' : 'presenciais'}`
                                                    : 
                                                        `Essa lista não tem eventos ${ segmentedButtonsValue === 'online' ? 'online' : 'presenciais'}`
                                                }
                                            </Text>
                                            {
                                                userType === 'consumer' && screen === 'Calendar' &&
                                                    <TouchableOpacity
                                                        style={[styles.buttonAlertMessage, { backgroundColor: color }]}
                                                        onPress={() => navigation.navigate('HomeConsumer')}
                                                    >
                                                        <Text style={styles.textButtonAlertMessage}>
                                                            Procurar eventos
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                    :
                                        <FlatList
                                            style={{ marginBottom: 210 }}
                                            data={segmentedButtonsValue === 'online' ? onlineModalityData : inPersonModalityData}
                                            ItemSeparatorComponent={ItemSeparator}
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
                </View>
                <View>
                </View>
                {
                    screen === 'Calendar' && <Footer />
                }
                {
                    screen === 'Calendar' &&
                        <View style={styles.registerEvent}>
                            {
                                userType === 'consumer' &&
                                    <IconButton
                                        icon="calendar-plus"
                                        iconColor={'white'}
                                        mode='contained'
                                        containerColor={color}
                                        size={24}
                                        onPress={() => navigation.navigate('KindOfEvent', { goBack: 'HomeProfessional' })}
                                    />
                            } 
                            {/* <IconButton
                                icon="calendar-clock"
                                iconColor={'white'}
                                mode='contained'
                                containerColor={color}
                                size={24}
                                onPress={() => navigation.navigate('KindOfEvent', { goBack: 'HomeProfessional' })}
                            /> */}
                        </View>
                }
            </View>
        );
    }
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
    },
    separator: {
        marginBottom: 20
    },
    registerEvent: {
        position: 'absolute',
        bottom: 75,
        left: 340,
        gap: 5
    },
    alertMessage: {
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%',
        height: '100%',
        paddingBottom: 60,
        flexDirection: 'column',
        gap: 20
    },
    alert: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
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