import React, { useContext, useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, View,
    TouchableOpacity,
    Image, Linking 
} from 'react-native';
import { Avatar, Chip, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StatusBar } from 'expo-status-bar';

import { ColorContext } from '../../contexts/ColorContext';

import { grayText, mainColor } from '../../colors/colors';

import { monthsOfTheYear } from '../../services/monthsOfTheYear';
import { onlinePlataforms } from '../../services/onlinePlataforms';

export default function DisplayEvent() {

    const route = useRoute();
    const data = route.params.data;

    const navigation = useNavigation();

    const { color } = useContext(ColorContext);

    const nowDateTime = new Date();

    const [plataformIndex, setPlataformIndex] = useState(0);
    
    useEffect(() => {
        onlinePlataforms.forEach((plataform) => {
            if (plataform.value === data.plataform) {
                setPlataformIndex(onlinePlataforms.indexOf(plataform))
            }
        }); 
    },[]);

    const canTheMeetingLinkBeReleased = () => {

        if(nowDateTime.getDate() != data.datetime.getDate()) return false;

        const datetime = new Date(nowDateTime);
        datetime.setHours(datetime.getHours() + 1);

        if(datetime.getTime() >= data.datetime.getTime()) return(true);

        return false;
    }

    return (
        <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar style={data.styleStatusBar}/>
                <View style={[styles.header, { backgroundColor: data.styleStatusBar === 'dark' ? 'white' : 'black' }]}>
                    <Image source={{ uri: data.wallpaper}} resizeMode="cover" style={{ width: '100%', height: '100%', opacity: 0.7}}/>
                    <View style={[styles.buttons, StyleSheet.absoluteFillObject]}>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: data.styleStatusBar === 'dark' ? 'black' : 'white' }]}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Icon name= {'chevron-left'} size={20} color={color} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: data.styleStatusBar === 'dark' ? 'black' : 'white' }]}
                            onPress={() => console.log('amém')}
                        >
                            <Icon name= {'calendar-plus'} size={18} color={color} />
                        </TouchableOpacity>
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
                            <Avatar.Image size={60} source={{ uri: data.organizer.photo }} />
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
        gap: 290
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});