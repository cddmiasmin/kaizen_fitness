import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { mainColor } from '../../colors/colors';
import { StatusBar } from 'expo-status-bar';
import Footer from '../components/Footer';
import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';
import { Avatar } from 'react-native-paper';

export default function HeaderProfessional() {

    const { user } = useContext(UserContext);
    const { color } = useContext(ColorContext);

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <View style={styles.containerTextos}>
                    <Text style={styles.textBemVindo}>Olá, {user.name}</Text>
                    <Text style={styles.textMotivacional}>Vamos transformar a vida das pessoas!</Text>
                </View>
                <View style={styles.avatar}>
                    <Avatar.Image
                        size={60} 
                        source={
                        !user 
                        ? {uri: ('https://i.pinimg.com/564x/6a/27/ab/6a27ab62c11c4bb972fedb8307bc8a25.jpg')}
                        : {uri: (user.photo)}
                    } 
                    />
                </View>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        paddingLeft: '6%',
        paddingRight: '6%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 50
    },
    containerTextos: {
        width: '80%',
        gap: 5
    },
    textBemVindo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textMotivacional:{
        color: 'white',
        fontSize: 12,
    }, 
    avatar: {
        width: '20%',
        alignItems: 'flex-end',
    }
});