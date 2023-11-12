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

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';


import ModalEventTopics from '../components/RegisterEvent/ModalEventTopics';
import ModalOnlinePlataforms from '../components/RegisterEvent/ModalOnlinePlataforms';
import ModalEventWallpaper from '../components/RegisterEvent/ModalEventWallpaper';
import { onlinePlataforms } from '../../services/onlinePlataforms';

import _ from 'lodash';
import DialogAlert from '../components/DialogAlert';

export default function UpdateEvent() {

    const route = useRoute();
    const navigation = useNavigation()
    // const data = route.params.data;
    const data = {
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
    };

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [eventWallpaper, setEventWallpaper] = useState(data.wallpaper);
    const [eventTopics, setEventTopics] = useState(data.topics);
    const [eventName, setEventName] = useState(data.name);
    const [eventDateTime, setEventDateTime] = useState(new Date(data.datatime));
    const [eventAbout, setEventAbout] = useState(data.about || '');
    const [eventOnlinePlataform, setEventOnlinePlataform] = useState(data.plataform || '');
    const [eventLink, setEventLink] = useState(data.meetingLink || '');
    const [eventAddress, setEventAddress] = useState(data.address || '');
    const [styleStatusBar, setStyleStatusBar] = useState(data.styleStatusBar);

    const [plataformIndex, setPlataformIndex] = useState(0);
    
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');
    const [isDateTimePickerActive, setDateTimePicker] = useState(false);

    const [visible, setVisible] = useState(false);
    const [whoCalledTheDialog, setWhoCalledTheDialog] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');

    const [changes, setChanges] = useState(true);
    const [changesNames, setChangesNames] = useState([]);
    const [changesData, setChangesData] = useState([]);

    const onChange = (event, datetime) => {
        setEventDateTime(datetime);
        setDateTimePicker(false);
    };

    const [isModalEventWallpaperActive, setModalEventWallpaper] = useState(false);
    const [isModalEventTopicsActive, setModalEventTopics] = useState(false);
    const [isModalOnlinePlataformsActive, setModalOnlinePlataforms] = useState(false);

    const executeDialogUserChoice = () => {
        if(whoCalledTheDialog === 'chevron-left') navigation.navigate('Calendar', { screen: 'Calendar' });
        else if(whoCalledTheDialog === 'delete') console.log('delete');
        else console.log('check');
    }

    const buildContentDialog = (alert) => {

        const message = (
            <View>
                <Text style={{textAlign: 'center', color: 'white', marginBottom: 10}}>
                    {alert}
                </Text>
                {
                    changesNames.map((change, key) => (
                        <Text key={key} style={{textAlign: 'center', color: 'white', marginBottom: 2}}>{change}</Text>
                    ))
                }
            </View>
        );

        setDialogContent(message);

    }

    const thereWereChangesInTheDataForTheOnlineEvent = () => {
        return eventName                === data.name
            && eventWallpaper               === data.wallpaper 
            && eventDateTime.toISOString()  === data.datatime.toISOString()
            && eventAbout                   === data.about
            && eventLink                    === data.meetingLink
            && eventOnlinePlataform         === data.plataform
            && _.isEqual(data.topics, eventTopics);
    }

    const thereWereChangesInTheDataForTheInPerson = () => {
        return eventName                === data.name
            && eventWallpaper               === data.wallpaper 
            && eventDateTime.toISOString()  === data.datatime.toISOString()
            && eventAbout                   === data.about
            && eventAddress                 === data.address
            && _.isEqual(data.topics, eventTopics);
    }

    const thereWasAChange = () => {

        if(data.modality === 'Online')
            return thereWereChangesInTheDataForTheOnlineEvent();
        else 
            return thereWereChangesInTheDataForTheInPerson();

    }

    const whatOnlineEventDataHasChanged = () => {
        let changesNames = [];
        let changesData = {};

        if(eventWallpaper !== data.wallpaper){
            changesNames.push("Papel de parede");
            changesData.wallpaper = eventWallpaper;
        }

        if(eventName !== data.name){
            changesNames.push("Nome");
            changesData.name = eventName;
        }

        if(eventAbout !== data.about){
            changesNames.push("Sobre");
            changesData.about = eventAbout;
        }

        if(eventDateTime.toISOString() !== data.datatime.toISOString()){
            changesData.datatime = eventDateTime;

            if(eventDateTime.toDateString() !== data.datatime.toDateString())
                changesNames.push("Data");
            
            if(eventDateTime.toTimeString() !== data.datatime.toTimeString())
                changesNames.push("Hora");

        }

        if(!_.isEqual(data.topics, eventTopics)){
            changesNames.push("Tópicos");
            changesData.topics = eventTopics;
        }

        if(eventOnlinePlataform !== data.plataform){
            changesNames.push("Plataforma");
            changesData.plataform = eventOnlinePlataform;
        }
        
        if(eventLink !== data.meetingLink){
            changesNames.push("Link");
            changesData.meetingLink = eventLink;
        }

        return {names: changesNames, data: changesData };

    }

    const whatInPersonEventDataHasChanged = () => {
        let changesNames = [];
        let changesData = {};

        if(eventWallpaper !== data.wallpaper){
            changesNames.push("Papel de parede");
            changesData.wallpaper = eventWallpaper;
        }

        if(eventName !== data.name){
            changesNames.push("Nome");
            changesData.name = eventName;
        }

        if(eventAbout !== data.about){
            changesNames.push("Sobre");
            changesData.about = eventAbout;
        }

        if(eventDateTime.toISOString() !== data.datatime.toISOString()){
            changesData.datatime = eventDateTime;

            if(eventDateTime.toDateString() !== data.datatime.toDateString())
                changesNames.push("Data");
            
            if(eventDateTime.toTimeString() !== data.datatime.toTimeString())
                changesNames.push("Hora");

        }

        if(!_.isEqual(data.topics, eventTopics)){
            changesNames.push("Tópicos");
            changesData.topics = eventTopics;
        }

        if(eventAddress !== data.address){
            changesNames.push("Endereço");
            changesData.address = eventAddress;
        }

        return {names: changesNames, data: changesData };

    }

    const whatDataHasChanged = () => {
        let changes = {};

        if(data.modality === 'Online') changes = whatOnlineEventDataHasChanged();
        else changes = whatInPersonEventDataHasChanged();

        //console.log(changes);

        setChangesNames(changes.names);
        setChangesData(changes.data);
    }

    useEffect(() => {

        if(changesData.length !== 0 && changesNames.length !== 0){

            if(whoCalledTheDialog === 'chevron-left') {
                buildContentDialog('Deseja descartar as alterações de: ');
                setDialogTitle('Voltar a agenda');
                setVisible(true);
            }
            
            if(whoCalledTheDialog === 'check-bold') {
                buildContentDialog('Deseja salvar as alterações de: ');
                setDialogTitle('Salvar alterações');
                setVisible(true);
            }

        }

    }, [changesData, changesNames])

    useEffect(() => {
        const change = thereWasAChange();
        setChanges(change);
    }, [
        eventWallpaper, eventName, eventTopics, eventAbout, eventDateTime,
        eventLink, eventOnlinePlataform, eventAddress,  eventTopics
    ]);

    // useEffect(() => console.log('CHANGES', changes), [changes])

    useEffect(() => {
        onlinePlataforms.forEach((plataform) => {
            if (plataform.value === eventOnlinePlataform) {
                setPlataformIndex(onlinePlataforms.indexOf(plataform))
            }
        }); 
    },[eventOnlinePlataform]);

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar style={styleStatusBar}/>
                <View style={styles.header}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: styleStatusBar === 'dark' ? 'white' : 'black'}}>
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
                    <View style={[styles.buttons, StyleSheet.absoluteFillObject]}>
                        <IconButton
                            mode='contained'
                            icon="chevron-left"
                            iconColor={color}
                            style={[styles.button, { marginRight: 245 }]}
                            containerColor={styleStatusBar === 'dark' ? 'black' : 'white'}
                            size={24}
                            onPress={() => {
                                if(!changes){
                                    setWhoCalledTheDialog('chevron-left');
                                    whatDataHasChanged();
                                }
                                else navigation.navigate('Calendar', { screen: 'Calendar' });
                            }}
                        />
                        <IconButton
                            mode='contained'
                            icon="delete"
                            iconColor={color}
                            style={[styles.button, { marginRight: 5 }]}
                            containerColor={styleStatusBar === 'dark' ? 'black' : 'white'}
                            size={20}
                            onPress={() => {
                                setWhoCalledTheDialog('delete');
                                setDialogTitle('Excluir evento');
                                setDialogContent('Tem certeza que deseja excluir este evento?'); 
                                setVisible(true);
                            }}
                        />
                        <IconButton
                            icon="check-bold"
                            iconColor={color}
                            style={styles.button}
                            containerColor={styleStatusBar === 'dark' ? 'black' : 'white'}
                            size={18}
                            disabled={changes}
                            onPress={() => {
                                setWhoCalledTheDialog('check-bold');
                                whatDataHasChanged();
                            }}
                        />
                    </View>                    
                </View>
                <View style={styles.body}>
                    <View style={styles.containerTopics}>
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
                                    name= {data.modality === 'Presencial' ? 'account-group' : 'monitor-shimmer'} 
                                    size={20} color={color} 
                                />
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {data.modality}
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
                                        display={'spinner'}
                                        is24Hour={true}
                                        onChange={onChange}
                                        style={styles.datePicker}
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
                                data.participants.length !== 0
                                ?
                                    data.participants.map((participant, key) => (
                                        key < 5 
                                        ? 
                                            <View
                                                key={`viewIcon#${key}`}  
                                                style={[key !== 0 ? {marginLeft: -15} : '', { borderWidth: 2, borderRadius: 50, borderColor: mainColor}]}
                                            >
                                                <Avatar.Image
                                                    key={`icon#${key}`} 
                                                    size={32} 
                                                    style={{ backgroundColor: color }}
                                                    source={{ uri: participant.photo}}
                                                />
                                            </View>
                                        : 
                                            ''
                                    ))
                                : 
                                    <View  
                                        style={[{borderWidth: 2, borderRadius: 50, borderColor: mainColor}]}
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
                            <Avatar.Image size={60} source={{ uri: user.photo }} />
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
                            data.modality === 'Online' 
                            ?
                                <>
                                    <View style={styles.plataform}>
                                        <View style={styles.plataformInfo}>
                                            <Image 
                                                style={{width: 75, height: 75}} 
                                                source={onlinePlataforms[plataformIndex].icon}
                                            />
                                            <Text 
                                                style={{color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 2}}
                                            >
                                                {onlinePlataforms[plataformIndex].name} 
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
                </View>
            </ScrollView>
            <ModalEventWallpaper active={isModalEventWallpaperActive} changeMyStatus={setModalEventWallpaper} chooseWallpaper={setEventWallpaper} colorStatusBar={setStyleStatusBar}/>
            <ModalEventTopics active={isModalEventTopicsActive} changeMyStatus={setModalEventTopics} changeTopics={setEventTopics}/>
            <ModalOnlinePlataforms active={isModalOnlinePlataformsActive} changeMyStatus={setModalOnlinePlataforms} choosePlatform={setEventOnlinePlataform} initialValue={eventOnlinePlataform}/>
            <DialogAlert
                visible={visible} 
                setVisible={setVisible} 
                title={dialogTitle} 
                message={dialogContent} 
                response={() => executeDialogUserChoice()}
            />           
        </SafeAreaView>
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
        marginLeft: 340,
        marginTop: 175,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
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
        width: '100',
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
    },
    buttons: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingLeft: 10
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
       
    }
});