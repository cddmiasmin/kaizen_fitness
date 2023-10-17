import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Chip, IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageBackground, 
    StyleSheet, 
    ScrollView, 
    View, Text, 
    TouchableOpacity,
    SafeAreaView, 
    Image
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { participantsColors } from '../../services/participantsColors';
import { mainColor } from '../../colors/colors';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import ModalEventTopics from '../components/RegisterEvent/ModalEventTopics';
import ModalOnlinePlataforms from '../components/RegisterEvent/ModalOnlinePlataforms';

import DateTimePicker from '@react-native-community/datetimepicker';
import ModalEventWallpaper from '../components/RegisterEvent/ModalEventWallpaper';

export default function RegisterEvent() {

    const modality = 'inPerson';

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const [eventWallpaper, setEventWallpaper] = useState('');
    const [eventTopics, setEventTopics] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDateTime, setEventDateTime] = useState(new Date(Date.now()));
    const [eventAbout, setEventAbout] = useState('');
    const [eventOnlinePlataform, setEventOnlinePlataform] = useState({});
    const [eventLink, setEventLink] = useState('');

    const [styleStatusBar, setStyleStatusBar] = useState('light');
    const [dateTimePickerMode, setDateTimePickerMode] = useState('date');

    const [isDateTimePickerActive, setDateTimePicker] = useState(false);

    const onChange = (event, datetime) => {
        setEventDateTime(datetime);
        setDateTimePicker(false);
    };

    const [isModalEventWallpaperActive, setModalEventWallpaper] = useState(true);
    const [isModalEventTopicsActive, setModalEventTopics] = useState(false);
    const [isModalOnlinePlataformsActive, setModalOnlinePlataforms] = useState(false);

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar style={styleStatusBar}/>
                <View style={[styles.header, { backgroundColor: color}]}>
                    {
                        eventWallpaper 
                        ? 
                            <ImageBackground source={{uri: eventWallpaper}} resizeMode="cover" style={{flex: 1}}/>
                        : 
                            <TouchableOpacity onPress={() => setModalEventWallpaper(true)}>
                                <Icon name="image-plus" size={40} color="white" />
                            </TouchableOpacity>
                    }
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
                                    name= {modality === 'inPerson' ? 'account-group' : 'laptop'} 
                                    size={20} color={color} 
                                />
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {modality === 'inPerson' ? 'Presencial' : 'Online'}
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
                            style={{ backgroundColor: mainColor, height: 180 }}
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
                            <Icon name="web" size={25} color={color}/>
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                            Local
                        </Text>
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
                    </View>
                </View>
            </ScrollView>
            <ModalEventWallpaper active={isModalEventWallpaperActive} changeMyStatus={setModalEventWallpaper} chooseWallpaper={setEventWallpaper}/>
            <ModalEventTopics active={isModalEventTopicsActive} changeMyStatus={setModalEventTopics} changeTopics={setEventTopics}/>
            <ModalOnlinePlataforms active={isModalOnlinePlataformsActive} changeMyStatus={setModalOnlinePlataforms} choosePlatform={setEventOnlinePlataform}/>
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
        justifyContent: 'space-between'
    },
    professionalData: {
        flexDirection: 'column',
        marginLeft: -50,
        justifyContent: 'flex-start',
        width: '50%'
    },
    location: {
        marginTop: 15,
    },
    plataform: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 95,
    },
});