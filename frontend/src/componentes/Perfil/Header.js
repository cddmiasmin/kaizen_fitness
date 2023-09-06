import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserContext } from '../../contexts/UserContext';
import { ColorContext } from '../../contexts/ColorContext';

export default function Header() {

 const { usuarioInfo } = useContext(UserContext);

 const { color } = useContext(ColorContext);

 return (
    <View style={styles.container}>
        <View style={styles.inicio}>
            <View style={styles.avatar}>
                <Avatar.Image
                    size={110} 
                    source={
                        !usuarioInfo.foto 
                        ? require('../../../assets/icons/user-icon.png')
                        : {uri:(usuarioInfo.foto)}
                    }
                    style={{backgroundColor: color}}
                />
            </View>
            <Text style={styles.nomeUsuario}>{usuarioInfo.nome + ' ' + usuarioInfo.sobrenome}</Text>
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