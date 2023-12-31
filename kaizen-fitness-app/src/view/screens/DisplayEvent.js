import React, { useContext, useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, View,
    TouchableOpacity,
    Image, Linking 
} from 'react-native';
import { ActivityIndicator, Avatar, Chip, IconButton, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StatusBar } from 'expo-status-bar';

import { ColorContext } from '../../contexts/ColorContext';

import { grayText, mainColor } from '../../colors/colors';

import { monthsOfTheYear } from '../../services/monthsOfTheYear';
import { userControllerAuth } from '../../controller/UserController';
import { UserContext } from '../../contexts/UserContext';
import { eventControllerUpdate } from '../../controller/EventController';
import SnackBar from '../components/SnackBar';

export default function DisplayEvent() {

    const route = useRoute();
    // const mode = route.params.mode;
    const data = route.params.data;

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [participantOfThisEvent, setParticipantOfThisEvent] = useState(true);
    //SnackBar
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const nowDateTime = new Date();  

    const { color } = useContext(ColorContext);
    const { userCalendar, setUserCalendar, getCalendarUser } = useContext(UserContext);

    const updateEvent = async (array) => {
        const update = { participants: array };

        const response = await eventControllerUpdate(update, data.idDoc);

        setErrorSnackBar(!response.result);
        setMessageSnackbar(response.message);
        setVisibleSnackbar(true);
    
        if(response.result){
            setUserCalendar(undefined);
            getCalendarUser();
            setLoading(true);
            setParticipantOfThisEvent(null);
            data.participants = array;
        }
        
    }

    const changeUserCalendar = async () => {
        const userAuth = await userControllerAuth();

        let participants = [];

        if(participantOfThisEvent) {
            const participantsAux = data.participants.filter(participant => participant !== userAuth.uid);
            console.log('true', participantsAux)
            participants = participantsAux;
        }
        else {
            participants = data.participants;
            participants.push(userAuth.uid);
        }

        console.log('result', participants)

        updateEvent(participants);
    }

    const checkIfTheUserParticipatesInThisEvent = () => {
        if(userCalendar === null) setParticipantOfThisEvent(false);
        else {
            const filter = userCalendar.filter(event => event.idDoc === data.idDoc);

            if(filter.length !== 0) setParticipantOfThisEvent(true);
            else setParticipantOfThisEvent(false);
        }
    }

    const canTheMeetingLinkBeReleased = () => {

        if(nowDateTime.getDate() != data.datetime.getDate()) return false;

        const datetime = new Date(nowDateTime);
        datetime.setHours(datetime.getHours() + 1);

        if(datetime.getTime() >= data.datetime.getTime()) return(true);

        return false;
    }

    useEffect(() => {
        // if(mode !== 'PastEvent') {
            if(userCalendar !== undefined) checkIfTheUserParticipatesInThisEvent();
        // } else setLoading(false);
    }, []);

    useEffect(() => {
        if(participantOfThisEvent !== null) setLoading(false);
    }, [participantOfThisEvent]);

    useEffect(() => {
        // if(mode !== 'PastEvent') {
            if(userCalendar !== undefined) checkIfTheUserParticipatesInThisEvent();
        // } else setLoading(false);
    }, [userCalendar]);

    if(loading)
        return(
            <SafeAreaView  style={styles.container}>
                <StatusBar style='light'/>
                <View style={[styles.header, { backgroundColor: color }]}>
                    <ActivityIndicator animating={true} color={'white'} />
                    <View style={[styles.buttons, StyleSheet.absoluteFillObject]}>
                        <IconButton
                            mode='contained'
                            icon="chevron-left"
                            iconColor={color}
                            style={[styles.button]}
                            containerColor={'white'}
                            size={24}
                            onPress={() => navigation.goBack()}
                        />
                        <IconButton
                            mode='contained'
                            icon='calendar-plus'
                            iconColor={color}
                            style={[styles.button, { marginLeft: 270 }]}
                            containerColor={'white'}
                            disabled={true}
                            size={20}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{ height: 40}} />
                </View>
                <View 
                    style={[StyleSheet.absoluteFillObject, 
                        { flex: 1,  paddingTop: 260, justifyContent: 'center', alignItems: 'center' }
                    ]}>
                        <ActivityIndicator animating={true} color={color} />
                </View>
            </SafeAreaView>
        )

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar style={data.styleStatusBar}/>
                <View style={[styles.header, { backgroundColor: data.styleStatusBar === 'dark' ? 'white' : 'black' }]}>
                    <Image source={{ uri: data.wallpaper}} resizeMode="cover" style={{ width: '100%', height: '100%', opacity: 0.7}}/>
                    <View style={[styles.buttons, StyleSheet.absoluteFillObject]}>
                        <IconButton
                            mode='contained'
                            icon="chevron-left"
                            iconColor={color}
                            style={[styles.button,  { backgroundColor: data.styleStatusBar === 'dark' ? 'black' : 'white' }]}
                            containerColor={'white'}
                            size={24}
                            onPress={() => navigation.goBack()}
                        />
                        {
                            mode !== 'PastEvent' &&
                                <IconButton
                                    mode='contained'
                                    icon={participantOfThisEvent ? 'calendar-check' : 'calendar-plus'}
                                    iconColor={color}
                                    style={[styles.button, { marginLeft: 270, backgroundColor: data.styleStatusBar === 'dark' ? 'black' : 'white' }]}
                                    containerColor={'white'}
                                    size={20}
                                    onPress={() => changeUserCalendar()}
                                />
                        }
                    </View>                 
                </View>
                <View style={styles.body}>
                    <View style={styles.containerTopics}>
                        <View style={styles.topics}>
                            {
                                data.topics.map((topic, key) => (        
                                    <Chip
                                        key={`chip#${key}`}
                                        style={{ backgroundColor: 'rgba(57, 138, 172, 0.2)'}}
                                        selectedColor='white'
                                    >
                                        {topic}
                                    </Chip> 
                                ))  
                            }
                        </View> 
                    </View>
                    <View style={styles.information}>
                        <Text style={[styles.eventName, { color: color }]}>{data.name}</Text>
                        <View style={styles.infos}>
                            <View style={styles.modality}>
                                    <Icon 
                                        name= {data.modality === 'Presencial' ? 'account-group' : 'monitor-shimmer'} 
                                        size={20} color={color} 
                                    />
                                    <Text style={{color: grayText, fontSize: 14}}>
                                        {data.modality}
                                    </Text>
                            </View>
                            <View style={styles.datetime}>
                                <Icon 
                                    name= 'calendar-range'
                                    size={18} color={color} 
                                />
                                <Text style={{color: grayText, fontSize: 14}}>
                                    {data.datetime.getDate() 
                                        + ' ' 
                                        + monthsOfTheYear[data.datetime.getMonth()]
                                        + (nowDateTime.getFullYear() !== data.datetime.getFullYear() ? ' ' + data.datetime.getFullYear() : '')
                                        + ' - '
                                        + data.datetime.getHours()
                                        + 'h'
                                        + (data.datetime.getMinutes() === 0 ? '' : data.datetime.getMinutes())
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.participants}>
                        {
                            data.participants.length !== 0
                            ?
                                data.participants.map((participant, key) => (
                                    key < 5 
                                    ? 
                                        <View
                                            key={`viewIcon#${key}`}  
                                            style={[key !== 0 ? {marginLeft: -15} : '', { borderWidth: 2, borderRadius: 50, borderColor: mainColor}]}
                                        >
                                            <Avatar.Icon
                                                size={32} 
                                                label=""
                                                style={{ backgroundColor: color }}
                                                icon={() => (
                                                    <Icon name="account" size={20} color={mainColor} />
                                                )}
                                            />
                                        </View>
                                    : 
                                        ''
                                ))
                            : 
                                <View  
                                    style={[{borderWidth: 2, borderRadius: 50, borderColor: mainColor }]}
                                >
                                    <Avatar.Icon
                                        size={32} 
                                        label=""
                                        style={{ backgroundColor: color }}
                                        icon={() => (
                                            <Icon name="account" size={20} color={mainColor} />
                                        )}
                                    />
                                </View>
                        }
                        <Text style={{color: 'white', fontSize: 14, marginLeft: 5}}>
                            {
                                data.participants.length === 0
                                ?
                                    'Nenhum participante'
                                :
                                data.participants.length + ' ' + (data.participants.length == 1 ? 'participante' : 'participantes')
                            } 
                        </Text>          
                    </View>
                    <View style={styles.aboutEvent}>
                        <Text style={{color: color, fontWeight: 'bold'}}>Sobre o evento</Text>
                        <Text style={{color: grayText, textAlign: 'justify'}}>
                            {data.about}
                        </Text>
                    </View>
                    <View style={styles.organizer}>
                        <Text style={{color: color, fontWeight: 'bold', fontSize: 14}}>
                            Organizador
                        </Text>
                        <View style={styles.professional}>
                            <Avatar.Image size={60} source={{ uri: data.organizer.avatar?.photo }} />
                            <View style={styles.professionalData}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                                    {data.organizer.name}{data.organizer.kindOfPerson === 'PF' ? ' ' + data.organizer.familyName : ''}
                                </Text>
                                <Text style={{color: grayText, fontSize: 10}}>
                                    {data.organizer.kindOfPerson === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Text style={{color: color, fontWeight: 'bold', fontSize: 14}}>
                            Local
                        </Text>
                        { data.modality === 'Online'
                            ?
                                <>
                                    <View style={styles.plataform}>
                                        <Image 
                                            style={{width: 75, height: 75}} 
                                            source={data.plataform.icon}
                                        />
                                        <Text 
                                            style={{color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 2}}
                                        >
                                            {data.plataform.name} 
                                        </Text>
                                    </View>
                                    {
                                        canTheMeetingLinkBeReleased() &&
                                        <>
                                            <TouchableOpacity
                                                onPress={() => { 
                                                    Linking.openURL(data.meetingLink); 
                                                }}
                                            >
                                                <TextInput
                                                        mode='outlined'
                                                        label="Link do evento"
                                                        value={data.meetingLink}
                                                        outlineColor={'white'}
                                                        textColor={'white'}
                                                        style={{ backgroundColor: mainColor }}
                                                        theme={{
                                                            colors: {
                                                                onSurfaceVariant: 'white'
                                                            }
                                                        }}
                                                        editable={false}
                                                        multiline={true}
                                                />
                                            </TouchableOpacity>
                                            <Text
                                                style={{ color: color, fontWeight: 'bold', textAlign: 'center', marginTop: 10}}
                                            >
                                                Clique no link para ser redirecionado ao evento
                                            </Text>
                                        </>
                                    } 
                                </>
                            :
                                <TextInput
                                    mode='outlined'
                                    label="Endereço do evento"
                                    value={data.address}
                                    outlineColor={'white'}
                                    textColor={grayText}
                                    style={{ backgroundColor: mainColor, marginTop: 10 }}
                                    theme={{
                                        colors: {
                                            onSurfaceVariant: 'white'
                                        }
                                    }}
                                    editable={false}
                                    multiline={true}
                                />
                        } 
                    </View>
                </View>
            </ScrollView>
            <SnackBar 
                visible={visibleSnackbar} 
                setVisible={setVisibleSnackbar} 
                message={messageSnackBar} 
                error={errorSnackBar}
                width={315} 
            />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor,
        flex: 1,
    },
    header: {
        width: '100%',
        height: 260,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        backgroundColor: mainColor,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        top: -32,
        paddingLeft: 20,
        paddingRight: 20,
    },
    containerTopics: {
        marginTop: 20,
        flexDirection: 'row'
    },
    topics: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        alignItems: 'center'
    },
    information: {
        marginTop: 10,
        flexDirection: 'column',
    },
    eventName: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    infos: {
        marginTop: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 12
    },
    modality: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    datetime: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    participants: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    aboutEvent: {
        marginTop: 20,
        gap: 8,
        marginBottom: 10,
    },
    organizer: {
        flexDirection: 'column',
    },
    professional: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'flex-start'
    },
    professionalData: {
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: 'flex-start',
        width: '50%'
    },
    location: {
        marginTop: 15,
    },
    plataform: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttons: {
        flexDirection: 'row',
        paddingTop: 45,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});