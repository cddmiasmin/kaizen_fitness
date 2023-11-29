import { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Chip, IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    StyleSheet, 
    ScrollView, 
    View, Text, 
    TouchableOpacity,
    SafeAreaView, 
    Image
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { mainColor } from '../../colors/colors';
import { participantsColors } from '../../services/participantsColors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import SnackBar from '../components/SnackBar';
import ModalEventTopics from '../components/RegisterEvent/ModalEventTopics';
import ModalEventWallpaper from '../components/RegisterEvent/ModalEventWallpaper';
import ModalOnlinePlataforms from '../components/RegisterEvent/ModalOnlinePlataforms';

import { eventControllerCreate } from '../../controller/EventController';

export default function RegisterEvent() {

    const alternativeWallpaper = 'https://firebasestorage.googleapis.com/v0/b/kaizenfitness-77033.appspot.com/o/wallpaper_reserva.jpg?alt=media&token=a70605e8-3acc-4b9e-b1ca-cb4c4358b3b4' 

    const { setUserCalendar, getCalendarUser } = useContext(UserContext);

    const route = useRoute();
    const modality = route.params.modality === undefined ? 'Presencial' : route.params.modality;
    const goBack = route.params.goBack === undefined ? 'Calendar' : route.params.goBack;

    let currentDatetime = new Date(2023,0,1,0,0,0);

    const navigation = useNavigation();

    // const inPersonData = {
    //     styleStatusBar: 'dark',
    //     wallpaper: 'https://images.unsplash.com/photo-1466979866587-05abf8ea3aec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     topics: ['Reabilitação'],
    //     name: 'Reabilitação online para AVC',
    //     about: 'Este evento fornecerá informações e dicas sobre reabilitação online para pessoas que sofreram um AVC. Os participantes aprenderão sobre os diferentes tipos de reabilitação online disponíveis, como escolher o programa certo para suas necessidades e como aproveitar ao máximo o programa de reabilitação.',
    //     datetime: new Date(2023,8,19,19,0),
    //     address: "Parque Ibirapuera, São Paulo",
    //     modality: 'online',
    //     participants: []
    // }

    // const onlineData = {
    //     styleStatusBar: 'light',
    //     wallpaper: 'https://images.unsplash.com/photo-1603102859961-64b17d43580d?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1932',
    //     name: "Treinamento de corrida para iniciantes",
    //     datetime: new Date(2023, 9, 26, 10, 0),
    //     topics: ["Atividade Física", "Esporte"],
    //     modality: 'presencial',
    //     about: "Este treinamento é ideal para quem quer começar a correr. Você aprenderá as técnicas básicas de corrida, como postura, respiração e alongamento.",
    //     participants: []
    // }

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [complete, setComplete] = useState(false);

    const [eventWallpaper, setEventWallpaper] = useState('');
    const [eventTopics, setEventTopics] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDateTime, setEventDateTime] = useState(new Date(2023,0,1,0,0,0));
    const [eventAbout, setEventAbout] = useState('');
    const [eventOnlinePlataform, setEventOnlinePlataform] = useState([]);
    const [eventLink, setEventLink] = useState('');
    const [eventAddress, setEventAddress] = useState('');

    const [styleStatusBar, setStyleStatusBar] = useState('light');
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');

    const [isDateTimePickerActive, setDateTimePicker] = useState(false);

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    const [messageSnackBar, setMessageSnackbar] = useState('');
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const minimumDate = () => {

        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setMilliseconds(0);

        return date;
    }

    const onChange = (event, datetime) => {
        setEventDateTime(datetime);
        setDateTimePicker(false);
    };

    const [isModalEventWallpaperActive, setModalEventWallpaper] = useState(false);
    const [isModalEventTopicsActive, setModalEventTopics] = useState(false);
    const [isModalOnlinePlataformsActive, setModalOnlinePlataforms] = useState(false);

    const canIRegisterOnlineEvent = () => {
        return  eventTopics.length === 0
            ||  eventName.length === 0
            ||  eventAbout.length === 0
            ||  eventOnlinePlataform.length === 0
            ||  eventLink.length === 0
            ||  eventDateTime.toDateString() === currentDatetime.toDateString()
            ||  eventDateTime.toTimeString() === currentDatetime.toTimeString();
    }

    const canIRegisterInPersonEvent = () => {
        return eventTopics.length === 0
            ||  eventName.length === 0
            ||  eventAbout.length === 0
            ||  eventAddress.length === 0
            ||  eventDateTime.toDateString() === currentDatetime.toDateString()
            ||  eventDateTime.toTimeString() === currentDatetime.toTimeString();
    }

    const canIRegisterEvent = () => {
       if(modality === 'Online') return canIRegisterOnlineEvent();
       else return canIRegisterInPersonEvent();
    }

    const onDismissSnackBar = async () => {

        setVisibleSnackbar(false);
  
        if(!errorSnackBar) 
            if(goBack === 'Calendar') navigation.navigate('Calendar', { screen: 'Calendar' });
            else navigation.navigate(goBack);
        
    }

    const completedRegistration = async () => {

        const wallpaper = eventWallpaper.length === 0 ? alternativeWallpaper : eventWallpaper;

        const data = {
            created: new Date(),
            styleStatusBar: styleStatusBar,
            wallpaper: wallpaper,
            topics: eventTopics,
            name: eventName ,
            about: eventAbout,
            datetime: new Date(eventDateTime),
            modality: modality,
            participants: []
        }

        if(modality === 'Online') {
            data.plataform = eventOnlinePlataform;
            data.meetingLink = eventLink;
        } else data.address = eventAddress;

        const professional = {
            avatar: user.avatar,
            kindOfPerson: user.kindOfPerson,
            name: user.name
        };

        if(user.kindOfPerson === 'PF') professional.familyName = user.familyName;

        const response = await eventControllerCreate(data, professional);

        if(response.result){ 
            setUserCalendar(undefined);
            getCalendarUser();
        }
        
        setErrorSnackBar(!response.result);
        setMessageSnackbar(response.message);
        setVisibleSnackbar(true);
      
    }

    useEffect(() => {
        currentDatetime = eventDateTime
    }, []);

    useEffect(() => {
        const can = canIRegisterEvent();
        console.log(can)
        setComplete(can);
    }, 
    [
        eventWallpaper, eventTopics, eventName, eventAbout,
        eventDateTime, eventOnlinePlataform, eventLink, eventAddress
    ]);

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar style={styleStatusBar}/>
                <View style={styles.header}>

                    {
                        eventWallpaper 
                        ?
                            <View style={{ width: '100%', height: '100%', backgroundColor: styleStatusBar === 'dark' ? 'white' : 'black' }}>
                                <TouchableOpacity onPress={() => setModalEventWallpaper(true)}>
                                <Image source={{ uri: eventWallpaper }} resizeMode="cover" style={{width: '100%', height: '100%', opacity: 0.7}}/>
                                <View 
                                    style={[StyleSheet.absoluteFillObject, 
                                            styles.eventWallpaperIcon, 
                                            { backgroundColor: styleStatusBar === 'dark' ? 'black' : 'white' }
                                    ]}
                                >
                                    <Icon 
                                        name="image-edit" 
                                        size={18} 
                                        color={color} 
                                    />
                                </View>
                                </TouchableOpacity>
                            </View>
                        : 
                            <TouchableOpacity style={[styles.eventWallpaperButton, { backgroundColor: color }]} onPress={() => setModalEventWallpaper(true)}>
                                <Icon name="image-plus" size={40} color="white" />
                            </TouchableOpacity>
                    }         
                    <IconButton
                        mode='contained'
                        icon="chevron-left"
                        iconColor={color}
                        style={[StyleSheet.absoluteFillObject, { marginLeft: 15, marginTop: 50}]}
                        containerColor={styleStatusBar === 'dark' ? 'black' : 'white'}
                        size={16}
                        onPress={() => {
                            if(goBack === 'Calendar') navigation.navigate('Calendar', { screen: 'Calendar' });
                            else navigation.navigate(goBack);
                        }}
                    />         
                </View>
                <View style={styles.body}>
                    <View style={styles.containerTopics}>
                        {
                            !eventTopics.length 
                            ?
                                <TouchableOpacity onPress={() => setModalEventTopics(true)}>
                                    <Chip
                                        icon={() => (
                                            <Icon name="plus-circle" size={16} color="white" />
                                        )}
                                        style={{ backgroundColor: 'rgba(57, 138, 172, 0.2)', marginTop: 5}}
                                        selectedColor='white'
                                    >
                                        Adicionar tema(s)
                                    </Chip>
                                </TouchableOpacity>
                            :
                            <>
                                <View style={styles.topics}>
                                    {
                                        eventTopics.map((topic, key) => (        
                                            <Chip
                                                key={`chip#${key}`}
                                                style={{ backgroundColor: 'rgba(57, 138, 172, 0.2)'}}
                                                selectedColor='white'
                                            >
                                                {topic}
                                            </Chip> 
                                        ))  
                                    }
                                    <IconButton
                                        icon="pencil-circle"
                                        iconColor={color}
                                        size={22}
                                        onPress={() => setModalEventTopics(true)}
                                    />
                                </View>

                            </>         
                        }
                    </View>
                    <View style={styles.information}>
                        <TextInput
                            mode='outlined'
                            label='Nome do evento'
                            value={eventName}
                            onChangeText={(text) => setEventName(text)}
                            outlineColor={'white'}
                            activeOutlineColor={color}
                            textColor={'white'}
                            style={{ backgroundColor: mainColor }}
                            theme={{
                                colors: {
                                    onSurfaceVariant: 'white'
                                }
                            }}
                        />
                        <View style={styles.infos}>
                            <View style={styles.modality}>
                                <Icon 
                                    name= {modality === 'Presencial' ? 'account-group' : 'monitor-shimmer'} 
                                    size={20} color={color} 
                                />
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {modality}
                                </Text>
                            </View>
                            <View style={styles.datetime}>

                                {
                                     <TouchableOpacity 
                                        style={styles.datetime}
                                        onPress={() => {
                                            setDateTimePickerMode('date');
                                            setDateTimePicker(true);
                                        }}
                                     >
                                        <Icon 
                                            name= 'calendar-range'
                                            size={18} color={color} 
                                        />
                                        <Text style={{color: 'white', fontSize: 14}}>
                                            {eventDateTime.toLocaleDateString('pt-BR')}
                                        </Text>
                                    </TouchableOpacity>
                                }

                                {isDateTimePickerActive && dateTimePickerMode === 'date' && (
                                    <DateTimePicker
                                        value={eventDateTime}
                                        mode={dateTimePickerMode}
                                        display={'default'}
                                        is24Hour={true}
                                        onChange={onChange}
                                        style={styles.datePicker}
                                        minimumDate={new Date(minimumDate())}
                                    />
                                )}

                                <TouchableOpacity 
                                    style={styles.datetime}
                                    onPress={() => {
                                        setDateTimePickerMode('time');
                                        setDateTimePicker(true);
                                    }}
                                >
                                    <Icon 
                                        name= 'timer'
                                        size={18} color={color} 
                                    />
                                    <Text style={{color: 'white', fontSize: 14}}>
                                        {eventDateTime.getHours() + 'h' + eventDateTime.getMinutes()}
                                    </Text>
                                </TouchableOpacity>

                                {isDateTimePickerActive && dateTimePickerMode === 'time' && (
                                    <DateTimePicker
                                    value={eventDateTime}
                                    mode={dateTimePickerMode}
                                    display={'default'}
                                    is24Hour={true}
                                    onChange={onChange}
                                    style={styles.datePicker}
                                    />
                                )}

                            </View>
                        </View>
                        <View style={styles.participants}>
                            {
                                participantsColors.map((color, key) => (
                                    <View
                                        key={`viewIcon#${key}`}  
                                        style={[key !== 0 ? {marginLeft: -15} : '', { borderWidth: 2, borderRadius: 50, borderColor: mainColor}]}
                                    >
                                        <Avatar.Icon
                                            key={`icon#${key}`} 
                                            size={32} 
                                            label=""
                                            style={{ backgroundColor: color }}
                                            icon={() => (
                                                <Icon name="account" size={20} color={mainColor} />
                                            )}
                                        />
                                    </View>
                                ))
                            }
                            <Text style={{color: 'white', fontSize: 14}}> 0 participantes</Text>
                        </View>
                    </View>
                    <View style={styles.aboutEvent}>
                        <TextInput
                            mode='outlined'
                            label='Descreva sobre o evento'
                            value={eventAbout}
                            onChangeText={(text) => setEventAbout(text)}
                            outlineColor={'white'}
                            activeOutlineColor={color}
                            textColor={'white'}
                            style={{ backgroundColor: mainColor, height: 120 }}
                            theme={{
                                colors: {
                                    onSurfaceVariant: 'white'
                                }
                            }}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.organizer}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                            Organizador
                        </Text>
                        <View style={styles.professional}>
                            <Avatar.Image size={60} source={{ uri: user?.avatar.photo }} />
                            <View style={styles.professionalData}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                                    {user.name}{user.kindOfPerson === 'PF' ? ' ' + user.familyName : ''}
                                </Text>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {user.kindOfPerson === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                                </Text>
                            </View>
                            {/* <Icon name="web" size={25} color={color}/> */}
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                            Local
                        </Text>
                        {
                            modality === 'Online' 
                            ?
                                <>
                                    {
                                        !Object.keys(eventOnlinePlataform).length 
                                        ?
                                            <TouchableOpacity onPress={() => setModalOnlinePlataforms(true)}>
                                                    <Chip
                                                        icon={() => (
                                                            <Icon name="plus-circle" size={16} color="white" />
                                                        )}
                                                        style={{ backgroundColor: 'rgba(57, 138, 172, 0.2)', marginTop: 5}}
                                                        selectedColor='white'
                                                    >
                                                        Adicionar plataforma 
                                                    </Chip>
                                            </TouchableOpacity>
                                        : 
                                            <>
                                                <View style={styles.plataform}>
                                                    <View style={styles.plataformInfo}>
                                                        <Image 
                                                            style={{width: 75, height: 75}} 
                                                            source={eventOnlinePlataform.icon}
                                                        />
                                                        <Text 
                                                            style={{color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 2}}
                                                        >
                                                            {eventOnlinePlataform.name} 
                                                        </Text>
                                                    </View>
                                                    <IconButton
                                                        icon="pencil-circle"
                                                        iconColor={color}
                                                        size={22}
                                                        style={{ marginLeft: 10}}
                                                        onPress={() => setModalOnlinePlataforms(true)}
                                                    />
                                                </View>
                                                <TextInput
                                                    mode='outlined'
                                                    label='Link do evento'
                                                    value={eventLink}
                                                    onChangeText={(text) => setEventLink(text)}
                                                    outlineColor={'white'}
                                                    activeOutlineColor={color}
                                                    textColor={'white'}
                                                    style={{ backgroundColor: mainColor, marginBottom: 8 }}
                                                    theme={{
                                                        colors: {
                                                            onSurfaceVariant: 'white'
                                                        }
                                                    }}
                                                />
                                                <Text
                                                    style={{ color: color, fontWeight: 'bold', textAlign: 'center'}}
                                                >
                                                    O link será liberado para os participantes 1h antes do evento
                                                </Text>
                                            </>           
                                    }
                                </>
                            : 
                                <TextInput
                                    mode='outlined'
                                    label='Endereço do evento'
                                    value={eventAddress}
                                    onChangeText={(text) => setEventAddress(text)}
                                    outlineColor={'white'}
                                    activeOutlineColor={color}
                                    textColor={'white'}
                                    style={{ backgroundColor: mainColor, marginBottom: 8, marginTop: 10 }}
                                    theme={{
                                        colors: {
                                            onSurfaceVariant: 'white'
                                        }
                                    }}
                                />
                        }
                    </View>
                    <TouchableOpacity 
                        style={[styles.register, { backgroundColor: complete ? '#a6a6a6' : color }]}
                        disabled={complete}
                        onPress={() => completedRegistration()}
                    >
                        <Text style={{ color: complete ? '#666666': 'white', fontWeight: 'bold'}}>Cadastrar evento</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalEventWallpaper active={isModalEventWallpaperActive} changeMyStatus={setModalEventWallpaper} chooseWallpaper={setEventWallpaper} colorStatusBar={setStyleStatusBar}/>
            <ModalEventTopics active={isModalEventTopicsActive} changeMyStatus={setModalEventTopics} changeTopics={setEventTopics}/>
            <ModalOnlinePlataforms active={isModalOnlinePlataformsActive} changeMyStatus={setModalOnlinePlataforms} choosePlatform={setEventOnlinePlataform} initialValue={eventOnlinePlataform}/>
            <SnackBar 
                visible={visibleSnackbar} 
                setVisible={onDismissSnackBar} 
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
    eventWallpaperButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventWallpaperIcon: {
        marginLeft: 335,
        marginTop: 175,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2
    },
    body: {
        backgroundColor: mainColor,
        width: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        top: -32,
        paddingLeft: 20,
        paddingRight: 20
    },
    containerTopics: {
        marginTop: 15,
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
        alignItems: 'center'
    },
    aboutEvent: {
        marginTop: 20
    },
    organizer: {
        marginTop: 15,
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
    },
    plataformInfo:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 20
    }
});