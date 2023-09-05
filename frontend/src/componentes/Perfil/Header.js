import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function Header() {

 return (
    <View style={styles.container}>
        <View style={styles.inicio}>
            <View style={styles.avatar}>
                <Avatar.Image
                    size={110} 
                    source={{uri : 'https://i.pinimg.com/564x/8e/07/e4/8e07e4eb005153a28db1bd25d176d2f2.jpg'}}
                />
            </View>
            <Text style={styles.nomeUsuario}>Florence Welch</Text>
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
        marginTop: 40
    },
    nomeUsuario: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});