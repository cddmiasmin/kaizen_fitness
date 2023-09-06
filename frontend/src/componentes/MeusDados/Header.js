import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { UserContext } from '../../contexts/UserContext';
import { papelDeParede } from '../../colors/colors';
import { ColorContext } from '../../contexts/ColorContext';

export default function MeusDados() {
 
 const { color } = useContext(ColorContext);
 const { usuarioInfo } = useContext(UserContext);

 return (
   <View style={styles.container}>
        <View style={styles.avatar}>
            <Avatar.Image
                size={110} 
                source={
                    !usuarioInfo.foto 
                    ? require('./../../../assets/icons/user-icon.png')
                    : {uri:('https://i.pinimg.com/564x/8e/07/e4/8e07e4eb005153a28db1bd25d176d2f2.jpg')}
                }
                style={{backgroundColor: color}}
            />
        </View>
        { usuarioInfo.nome &&
            <Text style={styles.nome}>{usuarioInfo.nome}</Text>
        }
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'black',
        width: '100%',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },
    info: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        flexDirection: 'row'
    },
    nome: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
        marginTop: 10
    },
    idade: {
        color: 'white',
        fontSize: 16,
    },
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        //backgroundColor: 'green'
    },
    subInfo: {
        flexDirection: 'row',
        gap: 4
    }
});