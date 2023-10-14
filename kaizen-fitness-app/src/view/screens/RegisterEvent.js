import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View } from 'react-native';

import { mainColor } from '../../colors/colors';

import { StatusBar } from 'expo-status-bar';

import { FastAverageColor } from 'fast-average-color';
import { Text } from 'react-native';

export default function RegisterEvent() {

    const [eventWallpaper, setEventWallpaper] = useState('https://i.pinimg.com/564x/70/b8/b5/70b8b51636d371a31c19f5d196468795.jpg');
    const [styleStatusBar, setStyleStatusBar] = useState('light');

    const isEventWallpaperIsDark = () => {
    }

    //useEffect(() => isEventWallpaperIsDark, []);

    return (
        <ScrollView style={styles.container}>
            <StatusBar style={styleStatusBar}/>
            <View style={styles.header}>
                <ImageBackground source={{uri: eventWallpaper}} resizeMode="cover" style={{flex: 1}}/>
            </View>
            <View style={[styles.body]}>
                <Text>iasmin</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainColor,
        flex: 1
    },
    header: {
        backgroundColor: 'red',
        width: '100%',
        height: 260
    },
    body: {
        backgroundColor: mainColor,
        width: '100%',
        height: 520,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        top: -25
    }
});