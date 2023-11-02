import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ColorContext } from '../../contexts/ColorContext';
import { mainColor } from '../../colors/colors';
import { Chip } from 'react-native-paper';
import { monthsOfTheYear } from '../../services/monthsOfTheYear';
import { onlinePlataforms } from '../../services/onlinePlataforms';

export default function EventCard({ data }) {

    const { color } = useContext(ColorContext);

    const nowDate = new Date();

    const whatIsTheOnlinePlatform = (plataformValue) => {
        let plataformName = '';

        onlinePlataforms.forEach((plataform) => {
            if (plataform.value === plataformValue) {
                plataformName = plataform.name;
            }
        }); 

        return plataformName;
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.wallpaper}>
                <View style={[{ backgroundColor: data.styleStatusBar === 'dark' ? 'white' : 'black' }, , StyleSheet.absoluteFill]}>
                    <Image source={{ uri: data.wallpaper }} style={[{width: '100%', height: '100%', opacity: 0.8}]}/>
                </View>
                <View 
                    style={[styles.topics]}
                >
                    {
                        data.topics.map((topic, key) => (
                            <View
                                key={`topic#${key}`} 
                                style={[styles.topic, { backgroundColor: color, width: 'auto' }]}
                            >
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                                    {topic}
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.eventName}>
                    {data.name}
                </Text>
                <View style={styles.information}>
                    <View style={styles.info}>
                        <Icon 
                            name={ data.modality === 'Online' ? 'monitor-shimmer' : 'account-multiple'} 
                            size={18} 
                            color={color} 
                        />
                        <Text style={{ color: '#aeaeae'}}>{data.modality}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon 
                            name="timer" 
                            size={18} 
                            color={color} 
                        />
                        <Text style={{ color: '#aeaeae'}}>
                            {
                                data.datatime.getDate() + ' ' + monthsOfTheYear[data.datatime.getMonth()] + ' ' + (data.datatime.getFullYear() === nowDate.getFullYear() ? '' : data.datatime.getFullYear())
                                + ' - '
                                + data.datatime.getHours() + 'h'+ (data.datatime.getMinutes() === 0 ? '' : data.datatime.getMinutes())
                            }
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <Icon 
                            name="map-marker" 
                            size={18} 
                            color={color} 
                        />
                        <Text style={{ color: '#aeaeae'}}>
                            {
                                data.modality === 'Online'
                                    ? whatIsTheOnlinePlatform(data.plataform)
                                    : data.city + ', ' + data.state
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container : {
        width: 260,
        height: 270,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#1c1c1c',
        padding: 5
    },
    wallpaper: {
        width: '100%',
        height: '60%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    topics: {
        width: 'auto',
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    topic: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderRadius: 5
    },
    body: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventName: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 5,
        textAlign: 'center'
    },
    information: {
        paddingTop: 5,
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    info: {
        flexDirection: 'row',
        gap: 3,
    }
});