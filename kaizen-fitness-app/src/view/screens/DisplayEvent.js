import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Chip, TextInput } from 'react-native-paper';
import { SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, View,
    TouchableOpacity,
    Image 
} from 'react-native';

import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

import { mainColor } from '../../colors/colors';

import { monthsOfTheYear } from '../../services/monthsOfTheYear';
import { onlinePlataforms } from '../../services/onlinePlataforms';
import { Linking } from 'react-native';

export default function DisplayEvent({ data }) {

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    const nowDateTime = new Date(2023, 9, 26, 18, 0);

    const [plataformIndex, setPlataformIndex] = useState(0);
    
    const event = {
        styleStatusBar: 'dark',
        wallpaper: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1978',
        topics: ["Alimentação"],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'meetup',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: user.photo
        },
        datatime: new Date(2023, 9, 25, 19, 0),
        modality: 'Online',
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
            { photo: ''}
        ]
    };
    
    useEffect(() => {
        onlinePlataforms.forEach((plataform) => {
            if (plataform.value === event.plataform) {
                setPlataformIndex(onlinePlataforms.indexOf(plataform))
            }
        }); 
    },[]);

    const canTheMeetingLinkBeReleased = () => {

        if(nowDateTime.getDate() != event.datatime.getDate()) return false;

        const datetime = new Date(nowDateTime);
        datetime.setHours(datetime.getHours() + 1);

        if(datetime.getTime() >= event.datatime.getTime()) return(true);

        return false;
    }

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar style={event.styleStatusBar}/>
                <View style={styles.header}>
                    <Image source={{ uri: event.wallpaper}} resizeMode="cover" style={{width: '100%', height: '100%'}}/>                 
                </View>
                <View style={styles.body}>
                    <View style={styles.containerTopics}>
                        <View style={styles.topics}>
                            {
                                event.topics.map((topic, key) => (        
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
                        <Text style={[styles.eventName, {color: color}]}>{event.name}</Text>
                        <View style={styles.infos}>
                            <View style={styles.modality}>
                                    <Icon 
                                        name= {event.modality === 'Presencial' ? 'account-group' : 'laptop'} 
                                        size={20} color={color} 
                                    />
                                    <Text style={{color: 'white', fontSize: 14}}>
                                        {event.modality}
                                    </Text>
                            </View>
                            <View style={styles.datetime}>
                                <Icon 
                                    name= 'calendar-range'
                                    size={18} color={color} 
                                />
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {event.datatime.getDate() 
                                        + '/' 
                                        + monthsOfTheYear[event.datatime.getMonth()]
                                        + (nowDateTime.getFullYear() !== event.datatime.getFullYear() ? '/' + event.datatime.getFullYear() : '')
                                        + ' - '
                                        + event.datatime.getHours()
                                        + 'h'
                                        + (event.datatime.getMinutes() === 0 ? '' : event.datatime.getMinutes())
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.participants}>
                        {
                            event.participants.length !== 0
                            ?
                                event.participants.map((participant, key) => (
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
                                event.participants.length === 0
                                ?
                                    'Nenhum participante'
                                :
                                event.participants.length + ' ' + (event.participants.length == 1 ? 'participante' : 'participantes')
                            } 
                        </Text>          
                    </View>
                    <View style={styles.aboutEvent}>
                        <Text style={{color: color, fontWeight: 'bold'}}>Sobre o evento</Text>
                        <Text style={{color: 'white', textAlign: 'justify'}}>
                            {event.about}
                        </Text>
                    </View>
                    <View style={styles.organizer}>
                        <Text style={{color: color, fontWeight: 'bold', fontSize: 14}}>
                            Organizador
                        </Text>
                        <View style={styles.professional}>
                            <Avatar.Image size={60} source={{ uri: event.organizer.photo }} />
                            <View style={styles.professionalData}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                                    {event.organizer.name}{event.organizer.kindOfPerson === 'PF' ? ' ' + event.organizer.familyName : ''}
                                </Text>
                                <Text style={{color: 'white', fontSize: 10}}>
                                    {event.organizer.kindOfPerson === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.location}>
                        <Text style={{color: color, fontWeight: 'bold', fontSize: 14}}>
                            Local
                        </Text>
                        <View style={styles.plataform}>
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
                        {
                            canTheMeetingLinkBeReleased() &&
                            <>
                                <TouchableOpacity
                                    onPress={() => { 
                                        Linking.openURL(event.meetingLink); 
                                    }}
                                >
                                    <TextInput
                                            mode='outlined'
                                            label="Link do evento"
                                            value={event.meetingLink}
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
                    </View>
                </View>
            </ScrollView>
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
        gap: 8
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
        width: 95,
    },
});