import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { ColorContext } from '../../../contexts/ColorContext';

export default function Header() {

 const { user, userType } = useContext(UserContext);

 const { color } = useContext(ColorContext);

 const name = userType === 'consumer' || user.kindOfPerson === 'PF' 
                ? user.name + ' ' + user.familyName 
                : user.name;

 const photo = user 
                ? {uri:(user.photo)} 
                : {uri:('https://i.pinimg.com/564x/6a/27/ab/6a27ab62c11c4bb972fedb8307bc8a25.jpg')};

 return (
    <View style={styles.container}>
        <View style={styles.started}>
            <View style={styles.avatar}>
                <Avatar.Image
                    size={110} 
                    source={photo}
                    style={{backgroundColor: color}}
                />
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