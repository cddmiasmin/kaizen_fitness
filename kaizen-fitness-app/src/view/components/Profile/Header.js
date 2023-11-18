import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { ColorContext } from '../../../contexts/ColorContext';

export default function HeaderProfessional() {

    const { user, userType } = useContext(UserContext);

    const { color } = useContext(ColorContext);

    const name = userType === 'consumer' || user.kindOfPerson === 'PF' 
                    ? user.name + ' ' + user.familyName 
                    : user.name;

    return (
        <View style={styles.container}>
            <View style={styles.started}>
                <View style={styles.avatar}>
                    {
                        user.avatar && user.avatar.photo
                        ?                        
                            <Avatar.Image
                                size={110} 
                                source={{ uri: (user.avatar.photo) }}
                            />
                        : 
                            <Avatar.Icon 
                                size={110} 
                                icon="account-circle" 
                                color={'white'}
                                style={{ backgroundColor: color }}
                            />
                    }
                </View>
                <Text style={styles.username}>{name}</Text>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 50
    },
    started: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 15,
        marginTop: 5
    },
    username: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});