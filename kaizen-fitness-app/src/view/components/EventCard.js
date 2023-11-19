import { useContext, useMemo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ColorContext } from '../../contexts/ColorContext';

import { monthsOfTheYear } from '../../services/monthsOfTheYear';
import { onlinePlataforms } from '../../services/onlinePlataforms';
import { grayText } from '../../colors/colors';
import { UserContext } from '../../contexts/UserContext';

export default function EventCard({ data, orientation }) {

    const navigation = useNavigation();

    // navigation.setOptions({
    //     persistedState: false,
    // });

    const { userType } = useContext(UserContext);
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
        <TouchableOpacity 
            style={[styles.container, { width: orientation === 'vertical' ? '100%' : 260}]}
            onPress={() => {
                if(userType === 'consumer') navigation.navigate('DisplayEvent', { data: data })
                else navigation.navigate('UpdateEvent', { data: data })
            }}
        >
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
                    <View style={{ justifyContent: 'center', flexDirection: 'row', width: '100%', gap: 5}}>
                        <View style={styles.info}>
                            <Icon 
                                name={data.modality === 'Online' ? 'monitor-shimmer' : 'account-group'} 
                                size={18} 
                                color={color} 
                            />
                            <Text style={{ color: grayText }}>{data.modality}</Text>
                        </View>
                        <View style={styles.info}>
                            <Icon 
                                name="timer" 
                                size={18} 
                                color={color} 
                            />
                            <Text style={{ color: grayText }}>
                                {
                                    data.datetime.getDate() + ' ' + monthsOfTheYear[data.datetime.getMonth()] + ' ' + (data.datetime.getFullYear() === nowDate.getFullYear() ? '' : data.datetime.getFullYear())
                                    + ' - '
                                    + data.datetime.getHours() + 'h'+ (data.datetime.getMinutes() === 0 ? '' : data.datetime.getMinutes())
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Icon 
                            name="map-marker" 
                            size={18} 
                            color={color} 
                        />
                        <Text style={{ color: grayText}}>
                            {
                                data.modality === 'Online'
                                    ? whatIsTheOnlinePlatform(data.plataform)
                                    : data.address
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container : {

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
        flexDirection: 'column',
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