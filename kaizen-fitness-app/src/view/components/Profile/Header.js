import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

import { UserContext } from '../../../contexts/UserContext';
import { ColorContext } from '../../../contexts/ColorContext';

export default function Header() {

 const { user, userType } = useContext(UserContext);

 const { color } = useContext(ColorContext);

 const nome = userType === 'consumer' || user.kindOfPerson === 'PF' ? user.name + ' ' + user.familyName : user.name;

 return (
    <View style={styles.container}>
        <View style={styles.inicio}>
            <View style={styles.avatar}>
                <Avatar.Image
                    size={110} 
                    source={
                        !user
                        ? {uri:('https://i.pinimg.com/564x/6a/27/ab/6a27ab62c11c4bb972fedb8307bc8a25.jpg')}
                        : {uri:(user.photo)}
                    }
                    style={{backgroundColor: color}}
                />
            </View>
            <Text style={styles.nomeUsuario}>{nome}</Text>
        </View>    
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    inicio: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 15,
        marginTop: 5
    },
    nomeUsuario: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});