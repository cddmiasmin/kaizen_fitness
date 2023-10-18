import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ColorContext } from '../../contexts/ColorContext';
import { mainColor } from '../../colors/colors';
import { Chip } from 'react-native-paper';
import { monthsOfTheYear } from '../../services/monthsOfTheYear';

export default function EventCard({ data }) {

    const { color } = useContext(ColorContext);

    const event = {
        styleStatusBar: 'dark',
        wallpaper: 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTYzMTZ8MHwxfHNlYXJjaHw4fHx5b2dhfGVufDB8MHx8fDE2OTc1Njg1Mzh8MA&ixlib=rb-4.0.3&q=85',
        topics: ["Alimentação", 'comida'],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'meetup',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: 'user.photo'
        },
        datatime: new Date(2023, 9, 25, 19, 30),
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

    return (
        <View style={styles.container}>
            <>
                <View style={styles.wallpaper}>
                    <Image source={{uri: event.wallpaper}} style={{width: '100%', height: '100%'}}/>
                </View>
                <View style={styles.information}>
                    <Text style={[styles.eventName, {color: color}]}>{event.name}</Text>
                    <View style={styles.info}>
                        <View style={styles.topics}>
                            <Chip
                                style={{ backgroundColor: 'rgba(57, 138, 172, 0.2)'}}
                                selectedColor='white'
                            >
                                {event.topics[0]}
                            </Chip>
                            {
                                event.topics.length > 1 
                                ?  <Text style={[{color: 'white'}]}>+</Text> 
                                : ''
                            } 
                        </View>
                        <View style={[styles.icon, { backgroundColor: color}]}>
                            <Icon 
                                name= {event.modality === 'Presencial' ? 'account-group' : 'laptop'} 
                                size={20} color={'white'} 
                                />
                        </View>
                    </View>
                </View>
            </>
            <View style={[styles.datetime, StyleSheet.absoluteFillObject]}> 
                <View style={styles.date}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                        {event.datatime.getDate() + ' ' + monthsOfTheYear[event.datatime.getMonth()]}
                    </Text>
                </View>

                <View style={styles.time}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                        {
                            event.datatime.getHours()
                            + 'h'
                            + (event.datatime.getMinutes() === 0 ? '' : event.datatime.getMinutes())
                        }
                    </Text>
                   
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        width: 290,
        height: 270,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'white'
    },
    wallpaper: {
        width: '100%',
        height: '60%'
    },
    information: {
        width: '100%',
        height: '40%',
        backgroundColor: mainColor,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
    icon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    info: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'red',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: -20
    },
    eventName: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    },
    topics: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datetime: {
        marginLeft: '5%',
        marginTop: '35%',
        width: 80,
        height: 5,
        backgroundColor: mainColor,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        flexDirection: 'column',
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});